import React, { useState, useEffect } from 'react';
import type { Salesperson } from '../types';
import { salespersonsApi } from '../services/api';
import { formatDateForInput, formatDateForBackend } from '../utils/dateUtils';
import './ModalForm.css'

interface SalespersonsModalFormProps {
  salesperson: Salesperson | null;
  isOpen: boolean;
  onClose: () => void;
  onSalespersonUpdated: () => void;
}

const SalespersonsModalForm: React.FC<SalespersonsModalFormProps> = ({
  salesperson,
  isOpen,
  onClose,
  onSalespersonUpdated,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    startDate: '',
    terminationDate: '',
    manager: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine edit or add
  const isEditing = salesperson !== null;

  // Set form data on edit or add
  useEffect(() => {
    if (salesperson) {
      setFormData({
        firstName: salesperson.firstName,
        lastName: salesperson.lastName,
        address: salesperson.address,
        phone: salesperson.phone,
        startDate: formatDateForInput(salesperson.startDate), // Convert to YYYY-MM-DD format
        terminationDate: salesperson.terminationDate ? formatDateForInput(salesperson.terminationDate) : '',
        manager: salesperson.manager,
      });
    } else if (isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        startDate: '',
        terminationDate: '',
        manager: '',
      });
    }
  }, [salesperson, isOpen]);

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
        const updatedSalesperson: Salesperson = {
          ...salesperson,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          phone: formData.phone,
          startDate: formatDateForBackend(formData.startDate),
          terminationDate: formatDateForBackend(formData.terminationDate),
          manager: formData.manager,
        };
        await salespersonsApi.update(salesperson.id, updatedSalesperson);
      } else {
        const newSalesperson = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          phone: formData.phone,
          startDate: formatDateForBackend(formData.startDate),
          terminationDate: formatDateForBackend(formData.terminationDate),
          manager: formData.manager,
        };
        await salespersonsApi.create(newSalesperson);
      }

      onSalespersonUpdated();
      onClose();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} salesperson:`, error);
      alert(`Failed to ${isEditing ? 'update' : 'create'} salesperson. Please try again.`);
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
          <h2>{isEditing ? 'Edit Salesperson' : 'Add New Salesperson'}</h2>
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

            <div className="form-row">
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

              <div className="form-group">
                <label htmlFor="terminationDate">Termination Date</label>
                <input
                  type="date"
                  id="terminationDate"
                  name="terminationDate"
                  value={formData.terminationDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="manager">Manager</label>
              <input
                type="text"
                id="manager"
                name="manager"
                value={formData.manager}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn-gray">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="btn-green">
                {isSubmitting
                  ? (isEditing ? 'Updating...' : 'Creating...')
                  : (isEditing ? 'Update Salesperson' : 'Create Salesperson')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalespersonsModalForm; 