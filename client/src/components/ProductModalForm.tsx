import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { productsApi } from '../services/api';
import './ModalForm.css'

interface ProductModalFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: () => void;
}

const ProductModalForm: React.FC<ProductModalFormProps> = ({
  product,
  isOpen,
  onClose,
  onProductUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    style: '',
    purchasePrice: '',
    salePrice: '',
    qtyOnHand: '',
    commissionPercentage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine edit or add
  const isEditing = product !== null;

  // Set form data on edit or add
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        manufacturer: product.manufacturer,
        style: product.style,
        purchasePrice: product.purchasePrice.toString(),
        salePrice: product.salePrice.toString(),
        qtyOnHand: product.qtyOnHand.toString(),
        commissionPercentage: product.commissionPercentage.toString(),
      });
    } else if (isOpen) {
      setFormData({
        name: '',
        manufacturer: '',
        style: '',
        purchasePrice: '',
        salePrice: '',
        qtyOnHand: '',
        commissionPercentage: '',
      });
    }
  }, [product, isOpen]);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      if (isEditing) {
        // Update existing product
        const updatedProduct: Product = {
          ...product,
          name: formData.name,
          manufacturer: formData.manufacturer,
          style: formData.style,
          purchasePrice: parseFloat(formData.purchasePrice),
          salePrice: parseFloat(formData.salePrice),
          qtyOnHand: parseInt(formData.qtyOnHand),
          commissionPercentage: parseFloat(formData.commissionPercentage),
        };
        await productsApi.update(product.id, updatedProduct);
      } else {
        // Create new product
        const newProduct = {
          name: formData.name,
          manufacturer: formData.manufacturer,
          style: formData.style,
          purchasePrice: parseFloat(formData.purchasePrice),
          salePrice: parseFloat(formData.salePrice),
          qtyOnHand: parseInt(formData.qtyOnHand),
          commissionPercentage: parseFloat(formData.commissionPercentage),
        };
        await productsApi.create(newProduct);
      }

      onProductUpdated();
      onClose();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} product:`, error);
      alert(`Failed to ${isEditing ? 'update' : 'create'} product. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Render
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalClick}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="manufacturer">Manufacturer</label>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="style">Style</label>
              <select
                id="style"
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                required
                className="form-select"
              >
                <option value="">Select Style</option>
                <option value="Mountain">Mountain</option>
                <option value="Trick">Trick</option>
                <option value="Toddler">Toddler</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="purchasePrice">Purchase Price</label>
                <input
                  type="number"
                  id="purchasePrice"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="salePrice">Sale Price</label>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="qtyOnHand">Quantity on Hand</label>
                <input
                  type="number"
                  id="qtyOnHand"
                  name="qtyOnHand"
                  value={formData.qtyOnHand}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="commissionPercentage">Commission %</label>
                <input
                  type="number"
                  id="commissionPercentage"
                  name="commissionPercentage"
                  value={formData.commissionPercentage}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={onClose}
                className="btn-gray"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-green"
              >
                {isSubmitting 
                  ? (isEditing ? 'Updating...' : 'Creating...') 
                  : (isEditing ? 'Update Product' : 'Create Product')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModalForm; 