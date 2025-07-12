import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product, Customer, Salesperson, Discount } from '../types';
import { productsApi, customersApi, salespersonsApi, salesApi, discountsApi } from '../services/api';
import { formatDateForInput, formatDateForBackend } from '../utils/dateUtils';
import './SalesForm.css';

const SalesForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [activeDiscounts, setActiveDiscounts] = useState<Discount[]>([]);

  const [formData, setFormData] = useState({
    productId: 0,
    customerId: 0,
    salesPersonId: 0,
    date: formatDateForInput(new Date().toISOString()),
    quantity: 1,
    totalPrice: 0
  });

  const [priceCalculation, setPriceCalculation] = useState({
    basePrice: 0,
    discountPercentage: 0,
    discountAmount: 0,
    finalPrice: 0
  });

  useEffect(() => {
    loadFormData();
  }, []);

  // Recalculate price when products, discounts, or form data changes
  useEffect(() => {
    if (formData.productId > 0 && products.length > 0) {
      const calculatedPrice = calculatePrice(formData.productId, formData.quantity, formData.date);
      if (calculatedPrice !== formData.totalPrice) {
        setFormData(prev => ({ ...prev, totalPrice: calculatedPrice }));
      }
    }
  }, [products, activeDiscounts, formData.productId, formData.quantity, formData.date]);

  const loadFormData = async () => {
    try {
      setLoading(true);
      const [productsData, customersData, salespersonsData, discountsData] = await Promise.all([
        productsApi.getAll(),
        customersApi.getAll(),
        salespersonsApi.getAll(),
        discountsApi.getActive()
      ]);

      setProducts(productsData);
      setCustomers(customersData);
      setSalespersons(salespersonsData);
      setActiveDiscounts(discountsData);
    } catch (err) {
      setError('Failed to load form data');
      console.error('Error loading form data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.productId || !formData.customerId || !formData.salesPersonId || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }

    // Check inventory before creating sale
    const selectedProduct = products.find(p => p.id === formData.productId);
    if (!selectedProduct || selectedProduct.qtyOnHand <= 0) {
      setError('Selected product is out of stock');
      return;
    }

    if (formData.quantity > selectedProduct.qtyOnHand) {
      setError(`Only ${selectedProduct.qtyOnHand} units available in stock`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Only send the fields that match the Sale type
      const saleData = {
        productId: formData.productId,
        salesPersonId: formData.salesPersonId,
        customerId: formData.customerId,
        date: formatDateForBackend(formData.date)
      };

      console.log('Submitting sale data:', saleData);
      const result = await salesApi.create(saleData);
      console.log('Sale created successfully:', result);

      // Refresh product data to get updated inventory
      await loadFormData();

      navigate('/sales');
    } catch (err) {
      if (err instanceof Error && err.message) {
        setError(err.message);
      } else {
        setError('Failed to create sale');
      }
      console.error('Error creating sale:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate price with discount
  const calculatePrice = (productId: number, quantity: number, saleDate: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) {
      setPriceCalculation({ basePrice: 0, discountPercentage: 0, discountAmount: 0, finalPrice: 0 });
      return 0;
    }

    const basePrice = product.salePrice * quantity;

    // Find applicable discount for this product and date
    const applicableDiscount = activeDiscounts.find(discount =>
      discount.productId === productId &&
      saleDate >= formatDateForInput(discount.beginDate) &&
      saleDate <= formatDateForInput(discount.endDate)
    );

    if (applicableDiscount) {
      const discountAmount = (basePrice * applicableDiscount.percentage) / 100;
      const finalPrice = basePrice - discountAmount;

      setPriceCalculation({
        basePrice,
        discountPercentage: applicableDiscount.percentage,
        discountAmount,
        finalPrice
      });

      return finalPrice;
    } else {
      setPriceCalculation({
        basePrice,
        discountPercentage: 0,
        discountAmount: 0,
        finalPrice: basePrice
      });

      return basePrice;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: name === 'quantity' ? parseFloat(value) || 1 :
        name === 'productId' || name === 'customerId' || name === 'salesPersonId' ? parseInt(value) || 0 : value
    };

    // Auto-calculate price when product, quantity, or date changes
    if (name === 'productId' || name === 'quantity' || name === 'date') {
      const calculatedPrice = calculatePrice(
        name === 'productId' ? parseInt(value) || 0 : newFormData.productId,
        name === 'quantity' ? parseFloat(value) || 1 : newFormData.quantity,
        name === 'date' ? value : newFormData.date
      );
      newFormData.totalPrice = calculatedPrice;
    }

    setFormData(newFormData);
  };

  // Render
  if (loading) return <div className="loading">Loading form data...</div>;

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Create New Sale</h2>
      </div>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="productId">Product</label>
          <select
            id="productId"
            name="productId"
            value={formData.productId || ''}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select a product</option>
            {products.map((product) => {
              const hasActiveDiscount = activeDiscounts.some(discount =>
                discount.productId === product.id &&
                formData.date >= formatDateForInput(discount.beginDate) &&
                formData.date <= formatDateForInput(discount.endDate)
              );
              const discount = activeDiscounts.find(discount =>
                discount.productId === product.id &&
                formData.date >= formatDateForInput(discount.beginDate) &&
                formData.date <= formatDateForInput(discount.endDate)
              );

              const isOutOfStock = product.qtyOnHand <= 0;
              const stockStatus = isOutOfStock ? ' OUT OF STOCK' : ` (${product.qtyOnHand} in stock)`;

              return (
                <option key={product.id} value={product.id} disabled={isOutOfStock}>
                  {product.name} - ${product.salePrice}{stockStatus}
                  {hasActiveDiscount && !isOutOfStock ? ` 🏷️ ${discount?.percentage}% OFF!` : ''}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="customerId">Customer</label>
          <select
            id="customerId"
            name="customerId"
            value={formData.customerId || ''}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="salesPersonId">Salesperson</label>
          <select
            id="salesPersonId"
            name="salesPersonId"
            value={formData.salesPersonId || ''}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select a salesperson</option>
            {salespersons.map((salesperson) => (
              <option key={salesperson.id} value={salesperson.id}>
                {salesperson.firstName} {salesperson.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Sale Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              max={(() => {
                const selectedProduct = products.find(p => p.id === formData.productId);
                return selectedProduct ? selectedProduct.qtyOnHand : undefined;
              })()}
              required
              className="form-input"
            />
            {(() => {
              const selectedProduct = products.find(p => p.id === formData.productId);
              if (selectedProduct && formData.quantity > selectedProduct.qtyOnHand) {
                return (
                  <small className="sales-form-stock-message sales-form-stock-message--error">
                    Only {selectedProduct.qtyOnHand} units available in stock
                  </small>
                );
              }
              if (selectedProduct && selectedProduct.qtyOnHand > 0) {
                return (
                  <small className="sales-form-stock-message sales-form-stock-message--info">
                    Max available: {selectedProduct.qtyOnHand} units
                  </small>
                );
              }
              return null;
            })()}
          </div>

          <div className="form-group">
            <label htmlFor="totalPrice">Total Price</label>
            <input
              type="number"
              id="totalPrice"
              name="totalPrice"
              value={formData.totalPrice.toFixed(2)}
              readOnly
              className="form-input sales-form-total-price-input"
            />
            <small className="sales-form-helper-text">
              Auto-calculated based on product and discounts
            </small>
          </div>
        </div>

        {/* Price Breakdown */}
        {formData.productId > 0 && priceCalculation.basePrice > 0 && (
          <div className="sales-form-price-breakdown">
            <h4 className="sales-form-price-breakdown-title">
              Price Breakdown
            </h4>
            <div className="sales-form-price-breakdown-item">
              <span>Base Price ({formData.quantity} × ${(priceCalculation.basePrice / formData.quantity).toFixed(2)}):</span>
              <span>${priceCalculation.basePrice.toFixed(2)}</span>
            </div>
            {priceCalculation.discountPercentage > 0 && (
              <>
                <div className="sales-form-price-breakdown-item sales-form-price-breakdown-item--discount">
                  <span>Discount ({priceCalculation.discountPercentage}% off):</span>
                  <span>-${priceCalculation.discountAmount.toFixed(2)}</span>
                </div>
                <hr className="sales-form-price-breakdown-separator" />
              </>
            )}
            <div className="sales-form-price-breakdown-final">
              <span>Final Price:</span>
              <span>${priceCalculation.finalPrice.toFixed(2)}</span>
            </div>
            {priceCalculation.discountPercentage > 0 && (
              <div className="sales-form-price-breakdown-savings">
                You're saving ${priceCalculation.discountAmount.toFixed(2)} with an active discount!
              </div>
            )}
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/sales')} className="btn-gray">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-green">
            {loading ? 'Creating...' : 'Create Sale'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesForm; 