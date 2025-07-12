import { useState, useEffect } from 'react';
import type { DetailedCommissionReport, Salesperson } from '../types';
import { reportsApi, salespersonsApi } from '../services/api';
import { formatDateForDisplay } from '../utils/dateUtils';
import './CommissionReport.css';

const CommissionReport = () => {
  const [reports, setReports] = useState<DetailedCommissionReport[]>([]);
  const [salespersons, setSalespersons] = useState<Salesperson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quarter, setQuarter] = useState(2);
  const [year, setYear] = useState(2025);
  const [selectedSalesperson, setSelectedSalesperson] = useState<number | undefined>(undefined);

  // Fetch Salespersons
  const loadSalespersons = async () => {
    try {
      const data = await salespersonsApi.getAll();
      setSalespersons(data);
    } catch (err) {
      console.error('Error loading salespersons:', err);
    }
  };

  // Fetch Report
  const loadReport = async () => {
    try {
      setLoading(true);
      const data = await reportsApi.getDetailedCommission(quarter, year, selectedSalesperson);
      setReports(data);
      setError(null);
    } catch (err) {
      setError('Failed to load commission report');
      console.error('Error loading commission report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSalespersons();
  }, []);

  useEffect(() => {
    loadReport();
  }, [quarter, year, selectedSalesperson]);

  // Calculate Totals
  const totalCommission = reports.reduce((sum, report) => sum + report.commission, 0);
  const totalSales = reports.reduce((sum, report) => sum + report.finalPrice, 0);

  // Get Selected Salesperson Name for Display
  const selectedSalespersonName = selectedSalesperson
    ? salespersons.find(s => s.id === selectedSalesperson)?.firstName + ' ' +
    salespersons.find(s => s.id === selectedSalesperson)?.lastName
    : 'All Salespersons';

  return (
    <div className="commission-report">
      <div className="page-header">
        <h2>Quarterly Commission Report (Q{quarter} {year}) - {selectedSalespersonName}</h2>
      </div>

      {/* Summary Cards */}
      {!loading && !error && reports.length > 0 && (
        <div className="commission-summary-cards">
          <div className="commission-summary-card">
            <div className="commission-summary-card-label">Total Sales</div>
            <div className="commission-summary-card-value commission-summary-card-value--sales">
              ${totalSales.toFixed(2)}
            </div>
          </div>
          <div className="commission-summary-card">
            <div className="commission-summary-card-label">Total Commission</div>
            <div className="commission-summary-card-value commission-summary-card-value--commission">
              ${totalCommission.toFixed(2)}
            </div>
          </div>
          <div className="commission-summary-card">
            <div className="commission-summary-card-label">Total Records</div>
            <div className="commission-summary-card-value commission-summary-card-value--records">
              {reports.length}
            </div>
          </div>
        </div>
      )}

      {/* Filter Section */}
      <div className="commission-filter-section">
        <div className="commission-filter-label">
          Filters:
        </div>
        <select
          value={quarter}
          onChange={(e) => setQuarter(parseInt(e.target.value))}
          className="form-select commission-filter-select"
        >
          <option value={1}>Q1</option>
          <option value={2}>Q2</option>
          <option value={3}>Q3</option>
          <option value={4}>Q4</option>
        </select>
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="form-select commission-filter-select"
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>
        <select
          value={selectedSalesperson || ''}
          onChange={(e) => setSelectedSalesperson(e.target.value ? parseInt(e.target.value) : undefined)}
          className="form-select commission-filter-select commission-filter-select--wide"
        >
          <option value="">All Salespersons</option>
          {salespersons.map((salesperson) => (
            <option key={salesperson.id} value={salesperson.id}>
              {salesperson.firstName} {salesperson.lastName}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="loading">Loading report...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && reports.length === 0 && (
        <div className="commission-no-data">
          No sales data found for {selectedSalespersonName} in Q{quarter} {year}
        </div>
      )}

      {!loading && !error && reports.length > 0 && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Sales ID</th>
                <th>Salesperson</th>
                <th>Date</th>
                <th>Product</th>
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
              {reports.map((report) => (
                <tr key={report.saleId}>
                  <td>#{report.saleId}</td>
                  <td>{report.salespersonName}</td>
                  <td>{formatDateForDisplay(report.date)}</td>
                  <td>{report.productName}</td>
                  <td>
                    {report.discountStatus === 'Discounted' ? 'Discounted' : 'Regular'}
                  </td>
                  <td>
                    {report.discountRate > 0 ? `${report.discountRate}%` : '-'}
                  </td>
                  <td>
                    <span className={report.discountRate > 0 ? 'commission-table-original-price--discounted' : ''}>
                      ${report.originalPrice.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    ${(report.originalPrice - (report.originalPrice * report.discountRate / 100)).toFixed(2)}
                  </td>
                  <td>{report.quantity}</td>
                  <td className="commission-table-final-price">
                    ${report.finalPrice.toFixed(2)}
                  </td>
                  <td>
                    {((report.commission / report.finalPrice) * 100).toFixed(2)}%
                  </td>
                  <td className="commission-table-commission">
                    ${report.commission.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommissionReport; 