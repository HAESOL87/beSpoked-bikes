import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

// Import icons
import Home from '../assets/Home';
import BoxClosed from '../assets/Box';
import SalesPerson from '../assets/SalesPerson';
import User from '../assets/Users';
import Dollar from '../assets/Dollar';
import BarChart from '../assets/BarChart';

const Navigation = () => {
    const location = useLocation();
    
    // Helper function
    const isActive = (path: string) => {
      if (path === '/') {
        return location.pathname === '/';
      }
      
      if (path === '/sales') {
        return location.pathname === '/sales';
      }
      
      return location.pathname === path || location.pathname.startsWith(path + '/');
    };
  
    return (
      <nav className="app-nav">
        <Link
          to="/"
          className={`app-nav-list ${isActive('/') ? 'active' : ''}`}
        >
          <Home />
          Home
        </Link>
        <Link
          to="/products"
          className={`app-nav-list ${isActive('/products') ? 'active' : ''}`}
        >
          <BoxClosed />
          Products
        </Link>
        <Link
          to="/salespersons"
          className={`app-nav-list ${isActive('/salespersons') ? 'active' : ''}`}
        >
          <SalesPerson />
          Salesperson
        </Link>
        <Link
          to="/customers"
          className={`app-nav-list ${isActive('/customers') ? 'active' : ''}`}
        >
          <User />
          Customers
        </Link>
        <Link
          to="/sales"
          className={`app-nav-list ${isActive('/sales') || isActive('/sales/new') ? 'active' : ''}`}
        >
          <Dollar />
          Sales
        </Link>
        <Link
          to="/report"
          className={`app-nav-list ${isActive('/report') ? 'active' : ''}`}
        >
          <BarChart />
          Report
        </Link>
      </nav>
    );
  };
  
  export default Navigation;