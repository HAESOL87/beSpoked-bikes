import React, { useState, useEffect } from 'react';
import type { Salesperson } from '../types';
import { salespersonsApi } from '../services/api';
import { formatDateForDisplay } from '../utils/dateUtils';
import SalespersonsModalForm from './SalespersonsModalForm';
import './SalespersonsList.css';

// Import Icons
import Edit from '../assets/Edit';
import Checkmark from '../assets/Checkmark';
import OutOfStock from '../assets/OutOfStock';

const SalespersonsList: React.FC = () => {
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSalesperson, setEditingSalesperson] = useState<Salesperson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSalespersons();
  }, []);

  // Fetch salespersons
  const fetchSalespersons = async () => {
    try {
      setLoading(true);
      const data = await salespersonsApi.getAll();
      setSalespersons(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch salespersons');
      console.error('Error fetching salespersons:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleEdit = (salesperson: Salesperson) => {
    setEditingSalesperson(salesperson);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSalesperson(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSalesperson(null);
  };

  const handleSalespersonUpdated = () => {
    fetchSalespersons();
  };

  // Helper functions
  const isActive = (terminationDate: string) => {
    if (!terminationDate || terminationDate.trim() === '') {
      return true; // No termination date means active
    }

    const termDate = new Date(terminationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only

    return termDate > today; // Future termination date means still active
  };

  // Render
  if (loading) return <div className="loading">Loading salespersons...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="salespersons-list">
      <div className="page-header">
        <h2>Salespersons</h2>
      </div>
      <div className="action-container">
        <button onClick={handleAdd} className="btn-green">
          Add Salesperson
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Start Date</th>
              <th>Termination Date</th>
              <th>Manager</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salespersons.map((salesperson) => {
              const active = isActive(salesperson.terminationDate);

              return (
                <tr key={salesperson.id}>
                  <td>{salesperson.id}</td>
                  <td>{salesperson.firstName} {salesperson.lastName}</td>
                  <td>{salesperson.phone}</td>
                  <td>{salesperson.address}</td>
                  <td>{formatDateForDisplay(salesperson.startDate)}</td>
                  <td>{formatDateForDisplay(salesperson.terminationDate) || '-'}</td>
                  <td>{salesperson.manager}</td>
                  <td>
                    <span className={active ? 'salespersons-list-status--active' : 'salespersons-list-status--inactive'}>
                      {active ? 'Active' : 'Inactive'}
                      {active ? <Checkmark /> : <OutOfStock />}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      onClick={() => handleEdit(salesperson)}
                      className="btn-edit-icon"
                    >
                      <Edit />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <SalespersonsModalForm
        salesperson={editingSalesperson}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSalespersonUpdated={handleSalespersonUpdated}
      />
    </div>
  );
};

export default SalespersonsList; 