import { Product, Salesperson, Customer, Sale, Discount, SaleWithDetails, DetailedCommissionReport } from '../types';
import { products, salespersons, customers, sales, discounts } from '../data/sampleData';

class DataService {
    // Products
    getAllProducts(): Product[] {
        return products;
    }

    getProductById(id: number): Product | undefined {
        return products.find(p => p.id === id);
    }

    createProduct(product: Omit<Product, 'id'>): Product {
        // Check for duplicate product
        const existingProduct = products.find(p =>
            p.name === product.name &&
            p.manufacturer === product.manufacturer
        );

        if (existingProduct) {
            throw new Error('Product with this name and manufacturer already exists');
        }

        const newProduct: Product = {
            ...product,
            id: products.length + 1
        };

        products.push(newProduct);
        return newProduct;
    }

    updateProduct(id: number, updates: Partial<Product>): Product | null {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;

        // Check for duplicate if name or manufacturer is being updated
        if (updates.name || updates.manufacturer) {
            const existingProduct = products.find(p =>
                p.id !== id &&
                p.name === (updates.name || products[index].name) &&
                p.manufacturer === (updates.manufacturer || products[index].manufacturer)
            );

            if (existingProduct) {
                throw new Error('Product with this name and manufacturer already exists');
            }
        }

        products[index] = { ...products[index], ...updates };
        return products[index];
    }

    // Salespersons
    getAllSalespersons(): Salesperson[] {
        return salespersons;
    }

    getSalespersonById(id: number): Salesperson | undefined {
        return salespersons.find(s => s.id === id);
    }

    createSalesperson(salesperson: Omit<Salesperson, 'id'>): Salesperson {
        // Check for duplicate salesperson
        const existingSalesperson = salespersons.find(s =>
            s.firstName === salesperson.firstName &&
            s.lastName === salesperson.lastName &&
            s.phone === salesperson.phone
        );

        if (existingSalesperson) {
            throw new Error('Salesperson with this name and phone already exists');
        }

        const newSalesperson: Salesperson = {
            ...salesperson,
            id: salespersons.length + 1
        };

        salespersons.push(newSalesperson);
        return newSalesperson;
    }

    updateSalesperson(id: number, updates: Partial<Salesperson>): Salesperson | null {
        const index = salespersons.findIndex(s => s.id === id);
        if (index === -1) return null;

        // Check for duplicate if name or phone is being updated
        if (updates.firstName || updates.lastName || updates.phone) {
            const existingSalesperson = salespersons.find(s =>
                s.id !== id &&
                s.firstName === (updates.firstName || salespersons[index].firstName) &&
                s.lastName === (updates.lastName || salespersons[index].lastName) &&
                s.phone === (updates.phone || salespersons[index].phone)
            );

            if (existingSalesperson) {
                throw new Error('Salesperson with this name and phone already exists');
            }
        }

        salespersons[index] = { ...salespersons[index], ...updates };
        return salespersons[index];
    }

    // Customers
    getAllCustomers(): Customer[] {
        return customers;
    }

    getCustomerById(id: number): Customer | undefined {
        return customers.find(c => c.id === id);
    }

    createCustomer(customer: Omit<Customer, 'id'>): Customer {
        // Check for duplicate customer
        const existingCustomer = customers.find(s =>
            s.firstName === customer.firstName &&
            s.lastName === customer.lastName &&
            s.phone === customer.phone
        );

        if (existingCustomer) {
            throw new Error('Salesperson with this name and phone already exists');
        }

        const newCustomer: Customer = {
            ...customer,
            id: customers.length + 1
        };

        customers.push(newCustomer);
        return newCustomer;
    }

    updateCustomer(id: number, updates: Partial<Customer>): Customer | null {
        const index = customers.findIndex(s => s.id === id);
        if (index === -1) return null;

        // Check for duplicate if name or phone is being updated
        if (updates.firstName || updates.lastName || updates.phone) {
            const existingCustomer = customers.find(s =>
                s.id !== id &&
                s.firstName === (updates.firstName || customers[index].firstName) &&
                s.lastName === (updates.lastName || customers[index].lastName) &&
                s.phone === (updates.phone || customers[index].phone)
            );

            if (existingCustomer) {
                throw new Error('Customer with this name and phone already exists');
            }
        }

        customers[index] = { ...customers[index], ...updates };
        return customers[index];
    }

    // Sales
    getAllSales(): Sale[] {
        return sales.map(sale => ({
            id: sale.id,
            productId: sale.productId,
            salesPersonId: sale.salesPersonId,
            customerId: sale.customerId,
            date: sale.date
        }));
    }

    getAllSalesWithDetails(): SaleWithDetails[] {
        return sales;
    }

    getSalesByDateRange(startDate: string, endDate: string): SaleWithDetails[] {
        return sales.filter(sale =>
            sale.date >= startDate && sale.date <= endDate
        );
    }

    getSaleById(id: number): Sale | undefined {
        const sale = sales.find(s => s.id === id);
        if (!sale) return undefined;

        return {
            id: sale.id,
            productId: sale.productId,
            salesPersonId: sale.salesPersonId,
            customerId: sale.customerId,
            date: sale.date
        };
    }

    createSale(saleData: Omit<Sale, 'id'>): Sale {
        const product = this.getProductById(saleData.productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Check inventory availability
        if (product.qtyOnHand <= 0) {
            throw new Error(`Product "${product.name}" is out of stock`);
        }

        const newSale: Sale = {
            ...saleData,
            id: Math.max(...sales.map(s => s.id)) + 1
        };

        const newSaleWithDetails = {
            ...newSale,
            product: product,
            salesPerson: this.getSalespersonById(saleData.salesPersonId)!,
            customer: this.getCustomerById(saleData.customerId)!
        };

        sales.push(newSaleWithDetails);

        // Reduce inventory by 1
        this.reduceProductInventory(saleData.productId, 1);

        return newSale;
    }

    private reduceProductInventory(productId: number, quantity: number): void {
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            products[productIndex].qtyOnHand = Math.max(0, products[productIndex].qtyOnHand - quantity);

            // Update the product reference in the sample data sales array
            sales.forEach(sale => {
                if (sale.product && sale.product.id === productId) {
                    sale.product.qtyOnHand = products[productIndex].qtyOnHand;
                }
            });
        }
    }

    // Check if product is available
    isProductAvailable(productId: number): boolean {
        const product = this.getProductById(productId);
        return product ? product.qtyOnHand > 0 : false;
    }

    // Commission Reports
    getDetailedCommissionReport(quarter: number, year: number, salesPersonId?: number): DetailedCommissionReport[] {
        const startMonth = (quarter - 1) * 3 + 1;
        const endMonth = quarter * 3;

        const startDate = `${year}-${startMonth.toString().padStart(2, '0')}-01`;
        const endDate = `${year}-${endMonth.toString().padStart(2, '0')}-31`;

        let quarterlySales = sales.filter(sale =>
            sale.date >= startDate && sale.date <= endDate
        );

        // Filter by salesperson
        if (salesPersonId) {
            quarterlySales = quarterlySales.filter(sale =>
                sale.salesPersonId === salesPersonId
            );
        }

        return quarterlySales.map(sale => {
            const product = this.getProductById(sale.productId)!;
            const salesperson = this.getSalespersonById(sale.salesPersonId)!;

            // Handle quantity - default to 1 if not present
            const quantity = (sale as any).quantity || 1;

            // Calculate discount information
            const originalPrice = product.salePrice * quantity;

            // Find applicable discount for this sale
            const saleDate = sale.date.split('T')[0]; 
            const applicableDiscount = discounts.find(discount =>
                discount.productId === sale.productId &&
                saleDate >= discount.beginDate.split('T')[0] &&
                saleDate <= discount.endDate.split('T')[0]
            );

            let finalPrice = originalPrice;
            let discountAmount = 0;
            let discountRate = 0;
            let discountStatus = 'No Discount';

            if (applicableDiscount) {
                discountRate = applicableDiscount.percentage;
                discountAmount = (originalPrice * discountRate) / 100;
                finalPrice = originalPrice - discountAmount;
                discountStatus = 'Discounted';
            }

            // Calculate commission on the final (discounted) price
            const commission = (finalPrice * product.commissionPercentage) / 100;

            return {
                saleId: sale.id,
                salespersonName: `${salesperson.firstName} ${salesperson.lastName}`,
                date: sale.date,
                productName: product.name,
                quantity,
                discountStatus,
                discountRate,
                originalPrice,
                finalPrice,
                commission,
                quarter: `Q${quarter}`,
                year
            };
        });
    }

    // Discounts
    getAllDiscounts(): Discount[] {
        return discounts;
    }

    getActiveDiscounts(): Discount[] {
        const now = new Date().toISOString().split('T')[0];
        return discounts.filter(discount =>
            discount.beginDate <= now && discount.endDate >= now
        );
    }
}

export const dataService = new DataService(); 