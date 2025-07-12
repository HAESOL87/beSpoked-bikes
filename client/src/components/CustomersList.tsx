import React, { useState, useEffect } from 'react';
import type { Customer } from '../types';
import { customersApi } from '../services/api';
import { formatDateForDisplay } from '../utils/dateUtils';
import CustomerModalForm from './CustomerModalForm';

// Import Icons
import Edit from '../assets/Edit';

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch Customers
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customersApi.getAll();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch customers');
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleCustomerUpdated = () => {
    fetchCustomers();
  };

  // Render
  if (loading) return <div className="loading">Loading customers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="customers-list">
      <div className="page-header">
        <h2>Customers</h2>
      </div>
      
      <div className="action-container">
        <button onClick={handleAdd} className="btn-green">
          Add Customer
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>{formatDateForDisplay(customer.startDate)}</td>
                <td className="actions-cell">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="btn-edit-icon"
                  >
                    <Edit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomerModalForm
        customer={editingCustomer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCustomerUpdated={handleCustomerUpdated}
      />
    </div>
  );
};

export default CustomersList; 