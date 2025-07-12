import { Router } from 'express';
import { externalApiService } from '../services/externalApiService';

const router = Router();

// External API products routes
router.get('/external/products', async (req, res) => {
  try {
    const products = await externalApiService.getAllProducts();
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch products from external API' });
    }
  }
});

router.get('/external/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const product = await externalApiService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch product from external API' });
    }
  }
});

router.post('/external/products', async (req, res) => {
  try {
    const newProduct = await externalApiService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create product in external API' });
    }
  }
});

router.put('/external/products/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    const updatedProduct = await externalApiService.updateProduct(productId, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update product in external API' });
    }
  }
});

// External API salespersons routes
router.get('/external/salespersons', async (req, res) => {
  try {
    const salespersons = await externalApiService.getAllSalespersons();
    res.json(salespersons);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch salespersons from external API' });
    }
  }
});

router.get('/external/salespersons/:id', async (req, res) => {
  try {
    const salesPersonId = parseInt(req.params.id);
    if (isNaN(salesPersonId)) {
      return res.status(400).json({ error: 'Invalid salesperson ID' });
    }
    const salesperson = await externalApiService.getSalespersonById(salesPersonId);
    if (!salesperson) {
      return res.status(404).json({ error: 'Salesperson not found' });
    }
    res.json(salesperson);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch salesperson from external API' });
    }
  }
});

router.post('/external/salespersons', async (req, res) => {
  try {
    const newSalesperson = await externalApiService.createSalesperson(req.body);
    res.status(201).json(newSalesperson);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create salesperson in external API' });
    }
  }
});

router.put('/external/salespersons/:id', async (req, res) => {
  try {
    const salesPersonId = parseInt(req.params.id);
    if (isNaN(salesPersonId)) {
      return res.status(400).json({ error: 'Invalid salesperson ID' });
    }
    const updatedSalesperson = await externalApiService.updateSalesperson(salesPersonId, req.body);
    if (!updatedSalesperson) {
      return res.status(404).json({ error: 'Salesperson not found' });
    }
    res.json(updatedSalesperson);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update salesperson in external API' });
    }
  }
});

// External API customers routes
router.get('/external/customers', async (req, res) => {
  try {
    const customers = await externalApiService.getAllCustomers();
    res.json(customers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch customers from external API' });
    }
  }
});

router.get('/external/customers/:id', async (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    if (isNaN(customerId)) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }
    const customer = await externalApiService.getCustomerById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch customer from external API' });
    }
  }
});

router.post('/external/customers', async (req, res) => {
  try {
    const newCustomer = await externalApiService.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create customer in external API' });
    }
  }
});

router.put('/external/customers/:id', async (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    if (isNaN(customerId)) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }
    const updatedCustomer = await externalApiService.updateCustomer(customerId, req.body);
    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update customer in external API' });
    }
  }
});

// External API sales routes
router.get('/external/sales', async (req, res) => {
  try {
    const sales = await externalApiService.getAllSales();
    res.json(sales);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch sales from external API' });
    }
  }
});

router.get('/external/sales/:id', async (req, res) => {
  try {
    const saleId = parseInt(req.params.id);
    if (isNaN(saleId)) {
      return res.status(400).json({ error: 'Invalid sale ID' });
    }
    const sale = await externalApiService.getSaleById(saleId);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch sale from external API' });
    }
  }
});

router.post('/external/sales', async (req, res) => {
  try {
    const newSale = await externalApiService.createSale(req.body);
    res.status(201).json(newSale);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create sale in external API' });
    }
  }
});

// External API discounts routes
router.get('/external/discounts', async (req, res) => {
  try {
    const discounts = await externalApiService.getAllDiscounts();
    res.json(discounts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch discounts from external API' });
    }
  }
});

export default router; 