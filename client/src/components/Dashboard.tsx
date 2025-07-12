import { Link } from 'react-router-dom';
import './Dashboard.css';

// Import icons
import BoxClosed from '../assets/Box';
import SalesPerson from '../assets/SalesPerson';
import User from '../assets/Users';
import Dollar from '../assets/Dollar';
import BarChart from '../assets/BarChart';

const Dashboard = () => {
  
 return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome to BeSpoked Bikes Sales Tracker</h2>
        <p className="dashboard-subtitle">Manage your bike sales business with ease</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/products" className="dashboard-card">
          <div className="dashboard-card-icon">
            <BoxClosed />
          </div>
          <div className="dashboard-card-content">
            <h3>Products</h3>
            <p>Manage your bike inventory, prices, and stock levels</p>
          </div>
        </Link>

        <Link to="/salespersons" className="dashboard-card">
          <div className="dashboard-card-icon">
            <SalesPerson />
          </div>
          <div className="dashboard-card-content">
            <h3>Salespersons</h3>
            <p>Manage your sales team</p>
          </div>
        </Link>

        <Link to="/customers" className="dashboard-card">
          <div className="dashboard-card-icon">
            <User />
          </div>
          <div className="dashboard-card-content">
            <h3>Customers</h3>
            <p>Track customer information</p>
          </div>
        </Link>

        <Link to="/sales" className="dashboard-card">
          <div className="dashboard-card-icon">
            <Dollar />
          </div>
          <div className="dashboard-card-content">
            <h3>Sales</h3>
            <p>Record new sales and view transaction history</p>
          </div>
        </Link>

        <Link to="/report" className="dashboard-card">
          <div className="dashboard-card-icon">
            <BarChart />
          </div>
          <div className="dashboard-card-content">
            <h3>Commission Report</h3>
            <p>View detailed commission reports and analytics</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 