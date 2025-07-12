import React, { useState, useEffect } from 'react';
import type { Customer } from '../types';
import { customersApi } from '../services/api';
import { formatDateForInput, formatDateForBackend } from '../utils/dateUtils';
import './ModalForm.css'

interface CustomerModalFormProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onCustomerUpdated: () => void;
}

const CustomerModalForm: React.FC<CustomerModalFormProps> = ({
  customer,
  isOpen,
  onClose,
  onCustomerUpdated,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    startDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine Edit or Add
  const isEditing = customer !== null;

  // Set Form Data on Edit or Add
  useEffect(() => {
    if (customer) {
      setFormData({
        firstName: customer.firstName,
        lastName: customer.lastName,
        address: customer.address,
        phone: customer.phone,
        startDate: formatDateForInput(customer.startDate),
      });
    } else if (isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        startDate: '',
      });
    }
  }, [customer, isOpen]);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        // Update existing customer
        const updatedCustomer: Customer = {
          ...customer,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          phone: formData.phone,
          startDate: formatDateForBackend(formData.startDate),
        };
        await customersApi.update(customer.id, updatedCustomer);
      } else {
        // Create new customer
        const newCustomer = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          phone: formData.phone,
          startDate: formatDateForBackend(formData.startDate),
        };
        await customersApi.create(newCustomer);
      }

      onCustomerUpdated();
      onClose();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} customer:`, error);
      alert(`Failed to ${isEditing ? 'update' : 'create'} customer. Please try again.`);
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
          <h2>{isEditing ? 'Edit Customer' : 'Add New Customer'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn-gray">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-green">
                {isSubmitting
                  ? (isEditing ? 'Updating...' : 'Creating...')
                  : (isEditing ? 'Update Customer' : 'Create Customer')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerModalForm; 