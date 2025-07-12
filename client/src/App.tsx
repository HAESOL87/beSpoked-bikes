import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import icons
import Bike from './assets/Bike';

// Import components
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ProductsList from './components/ProductsList';
import SalespersonsList from './components/SalespersonsList';
import CustomersList from './components/CustomersList';
import SalesList from './components/SalesList';
import SalesForm from './components/SalesForm';
import CommissionReport from './components/CommissionReport';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <div className="app">
        <header className='app-header'>
          <div className="app-header-left">
            <Bike/><h1>BeSpoked Bikes</h1>
          </div>
          <div className="app-header-right">
            <UserProfile />
          </div>
        </header>

        <div className="app-content">
          <aside className="app-sidebar">
            <Navigation />
          </aside>
          
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductsList />} />
              <Route path="/salespersons" element={<SalespersonsList />} />
              <Route path="/customers" element={<CustomersList />} />
              <Route path="/sales" element={<SalesList />} />
              <Route path="/sales/new" element={<SalesForm />} />
              <Route path="/report" element={<CommissionReport />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
