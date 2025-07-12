import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { SaleWithDetails, Discount } from '../types';
import { salesApi, discountsApi } from '../services/api';
import { formatDateForDisplay } from '../utils/dateUtils';
import './SalesList.css';

const SalesList = () => {
  const [allSales, setAllSales] = useState<SaleWithDetails[]>([]);
  const [filteredSales, setFilteredSales] = useState<SaleWithDetails[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  // Apply date filter when sales data or filter changes
  useEffect(() => {
    applyDateFilter();
  }, [allSales, dateFilter]);

  // Load sales and discounts data
  const loadData = async () => {
    try {
      setLoading(true);
      const [salesData, discountsData] = await Promise.all([
        salesApi.getAll(),
        discountsApi.getAll()
      ]);
      setAllSales(salesData);
      setDiscounts(discountsData);
      setError(null);
    } catch (err) {
      setError('Failed to load sales');
      console.error('Error loading sales:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply date filter to sales
  const applyDateFilter = () => {
    if (!dateFilter.startDate && !dateFilter.endDate) {
      setFilteredSales(allSales);
      return;
    }

    const filtered = allSales.filter(sale => {
      const saleDate = sale.date.split('T')[0]; 

      if (dateFilter.startDate && saleDate < dateFilter.startDate) {
        return false;
      }

      if (dateFilter.endDate && saleDate > dateFilter.endDate) {
        return false;
      }

      return true;
    });

    setFilteredSales(filtered);
  };

  // Handle date filter change
  const handleDateFilterChange = (field: 'startDate' | 'endDate', value: string) => {
    setDateFilter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearDateFilter = () => {
    setDateFilter({
      startDate: '',
      endDate: ''
    });
  };

  // Calculate actual price and discount for a sale
  const calculateSalePrice = (sale: SaleWithDetails) => {
    if (!sale.product) {
      return {
        basePrice: 0,
        actualPrice: 0,
        discountPercentage: 0,
        discountAmount: 0,
        commission: 0
      };
    }

    const basePrice = sale.product.salePrice;

    // Find applicable discount for this sale
    const applicableDiscount = discounts.find(discount =>
      discount.productId === sale.productId &&
      sale.date >= discount.beginDate.split('T')[0] &&
      sale.date <= discount.endDate.split('T')[0]
    );

    if (applicableDiscount) {
      const discountAmount = (basePrice * applicableDiscount.percentage) / 100;
      const actualPrice = basePrice - discountAmount;
      const commission = (actualPrice * sale.product.commissionPercentage) / 100;

      return {
        basePrice,
        actualPrice,
        discountPercentage: applicableDiscount.percentage,
        discountAmount,
        commission
      };
    } else {
      const commission = (basePrice * sale.product.commissionPercentage) / 100;
      return {
        basePrice,
        actualPrice: basePrice,
        discountPercentage: 0,
        discountAmount: 0,
        commission
      };
    }
  };

  // Render
  if (loading) return <div className="loading">Loading sales...</div>;
  if (error) return <div className="error">{error}</div>;

  // Determine if filter is applied
  const isFiltered = dateFilter.startDate || dateFilter.endDate;

  return (
    <div className="sales-list">
      <div className="page-header">
        <h2>Sales</h2>
      </div>
      
      <div className="action-container">
        <Link to="/sales/new" className="btn-green">Create New Sale</Link>
      </div>

      {/* Date Filter Section */}
      <div className="sales-list-filter-section">
        <div className="sales-list-filter-label">
          Filter by Date Range:
        </div>

        <div className="sales-list-filter-group">
          <label htmlFor="startDate" className="sales-list-filter-input-label">From:</label>
          <input
            type="date"
            id="startDate"
            value={dateFilter.startDate}
            onChange={(e) => handleDateFilterChange('startDate', e.target.value)}
            className="sales-list-filter-input"
          />
        </div>

        <div className="sales-list-filter-group">
          <label htmlFor="endDate" className="sales-list-filter-input-label">To:</label>
          <input
            type="date"
            id="endDate"
            value={dateFilter.endDate}
            onChange={(e) => handleDateFilterChange('endDate', e.target.value)}
            className="sales-list-filter-input"
          />
        </div>

        {isFiltered && (
          <>
            <button
              onClick={clearDateFilter}
              className="btn-gray"
            >
              Clear Filter
            </button>

            <div className="sales-list-filter-result">
              Showing {filteredSales.length} of {allSales.length} sales
            </div>
          </>
        )}
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Salesperson</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Discount Status</th>
              <th>Discount %</th>
              <th>Original Price</th>
              <th>Discounted Price</th>
              <th>Quantity</th>
              <th>Final Price</th>
              <th>Commission %</th>
              <th>Commission</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => {
              const priceInfo = calculateSalePrice(sale);

              return (
                <tr key={sale.id}>
                  <td>#{sale.id}</td>
                  <td>{formatDateForDisplay(sale.date)}</td>
                  <td>{sale.salesPerson ? `${sale.salesPerson.firstName} ${sale.salesPerson.lastName}` : 'N/A'}</td>
                  <td>{sale.product?.name || 'N/A'}</td>
                  <td>{sale.customer ? `${sale.customer.firstName} ${sale.customer.lastName}` : 'N/A'}</td>
                  <td>
                    {priceInfo.discountPercentage > 0 ? (
                      <span>
                        Discounted
                      </span>
                    ) : (
                      <span>
                        Regular
                      </span>
                    )}
                  </td>
                  <td>
                    {priceInfo.discountPercentage > 0 ? (
                      <span>
                        {priceInfo.discountPercentage}%
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td>
                    <span className={priceInfo.discountPercentage > 0 ? 'sales-list-original-price--discounted' : ''}>
                      ${priceInfo.basePrice.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    ${priceInfo.actualPrice.toFixed(2)}
                  </td>
                  <td>1</td>
                  <td>
                    <span className="sales-list-final-price">
                      ${priceInfo.actualPrice.toFixed(2)}
                    </span>
                  </td>
                  <td>{sale.product?.commissionPercentage}%</td>
                  <td className="sales-list-commission">
                    ${priceInfo.commission.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredSales.length === 0 && allSales.length > 0 && (
        <div className="sales-list-no-results">
          No sales found in the selected date range.
          <br />
          <button
            onClick={clearDateFilter}
            className="btn-green sales-list-no-results-button"
          >
            Show All Sales
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesList; 