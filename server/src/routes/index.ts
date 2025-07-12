import { Router } from 'express';
import { dataService } from '../services/dataService';

const router = Router();

// Products routes
router.get('/products', (req, res) => {
  try {
    const products = dataService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const product = dataService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/products', (req, res) => {
  try {
    const newProduct = dataService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create product' });
    }
  }
});

router.put('/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const updatedProduct = dataService.updateProduct(productId, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
});

// Salespersons routes
router.get('/salespersons', (req, res) => {
  try {
    const salespersons = dataService.getAllSalespersons();
    res.json(salespersons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch salespersons' });
  }
});

router.get('/salespersons/:id', (req, res) => {
  try {
    const salesPersonId = parseInt(req.params.id);
    if (isNaN(salesPersonId)) {
      return res.status(400).json({ error: 'Invalid salesperson ID' });
    }
    const salesperson = dataService.getSalespersonById(salesPersonId);
    if (!salesperson) {
      return res.status(404).json({ error: 'Salesperson not found' });
    }
    res.json(salesperson);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch salesperson' });
  }
});

router.post('/salespersons', (req, res) => {
  try {
    const newSalesperson = dataService.createSalesperson(req.body);
    res.status(201).json(newSalesperson);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create salesperson' });
    }
  }
});

router.put('/salespersons/:id', (req, res) => {
  try {
    const salesPersonId = parseInt(req.params.id);
    if (isNaN(salesPersonId)) {
      return res.status(400).json({ error: 'Invalid salesperson ID' });
    }
    const updatedSalesperson = dataService.updateSalesperson(salesPersonId, req.body);
    if (!updatedSalesperson) {
      return res.status(404).json({ error: 'Salesperson not found' });
    }
    res.json(updatedSalesperson);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update salesperson' });
    }
  }
});

// Customers routes
router.get('/customers', (req, res) => {
  try {
    const customers = dataService.getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.get('/customers/:id', (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    if (isNaN(customerId)) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }
    const customer = dataService.getCustomerById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

router.post('/customers', (req, res) => {
  try {
    const newCustomer = dataService.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create customer' });
    }
  }
});

router.put('/customers/:id', (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    if (isNaN(customerId)) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }
    const updatedCustomer = dataService.updateCustomer(customerId, req.body);
    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update customer' });
    }
  }
});

// Sales routes
router.get('/sales', (req, res) => {
  try {
    const { startDate, endDate, details } = req.query;
    
    if (startDate && endDate) {
      const sales = dataService.getSalesByDateRange(startDate as string, endDate as string);
      res.json(sales);
    } else if (details === 'true') {
      const sales = dataService.getAllSalesWithDetails();
      res.json(sales);
    } else {
      const sales = dataService.getAllSales();
      res.json(sales);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});

router.get('/sales/:id', (req, res) => {
  try {
    const saleId = parseInt(req.params.id);
    if (isNaN(saleId)) {
      return res.status(400).json({ error: 'Invalid sale ID' });
    }
    const sale = dataService.getSaleById(saleId);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sale' });
  }
});

// Custom endpoint that returns sales data in a custom format
router.get('/sales-formatted', (req, res) => {
  try {
    const salesWithDetails = dataService.getAllSalesWithDetails();
    const formattedSales = salesWithDetails.map(sale => ({
      id: sale.id,
      productId: sale.productId,
      salesPersonId: sale.salesPersonId,
      customerId: sale.customerId,
      date: sale.date,
      product: sale.product,
      salesPerson: sale.salesPerson,
      customer: sale.customer
    }));
    res.json(formattedSales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});

router.post('/sales', (req, res) => {
  try {
    const newSale = dataService.createSale(req.body);
    res.status(201).json(newSale);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create sale' });
    }
  }
});

// Discounts routes
router.get('/discounts', (req, res) => {
  try {
    const { active } = req.query;
    
    if (active === 'true') {
      const discounts = dataService.getActiveDiscounts();
      res.json(discounts);
    } else {
      const discounts = dataService.getAllDiscounts();
      res.json(discounts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
});

// Commission reports routes
router.get('/reports/commission-detailed', (req, res) => {
  try {
    const { quarter, year, salesPersonId } = req.query;
    const quarterNum = parseInt(quarter as string);
    const yearNum = parseInt(year as string);
    const salesPersonIdNum = salesPersonId ? parseInt(salesPersonId as string) : undefined;
    
    if (!quarterNum || !yearNum || quarterNum < 1 || quarterNum > 4) {
      return res.status(400).json({ error: 'Invalid quarter or year parameters' });
    }
    
    if (salesPersonId && isNaN(salesPersonIdNum!)) {
      return res.status(400).json({ error: 'Invalid salesperson ID parameter' });
    }
    
    const report = dataService.getDetailedCommissionReport(quarterNum, yearNum, salesPersonIdNum);
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate detailed commission report' });
  }
});

export default router;