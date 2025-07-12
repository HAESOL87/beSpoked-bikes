import axios from 'axios';
import { Product, Salesperson, Customer, Sale, Discount } from '../types';

const API_BASE_URL = 'https://profiseebespokedbikesapi.azurewebsites.net/api';

export class ExternalApiService {
    private async handleRequest<T>(request: () => Promise<T>): Promise<T> {
        try {
            return await request();
        } catch (error: any) {
            if (error.response) {
                throw new Error(`External API Error: ${error.response.data?.message || error.message}`);
            } else if (error.message) {
                throw new Error(`External API Error: ${error.message}`);
            }
            throw error;
        }
    }

    // Products
    async getAllProducts(): Promise<Product[]> {
        return this.handleRequest(async () => {
            const response = await axios.get(`${API_BASE_URL}/Products`);
            return response.data as Product[];
        });
    }

    async getProductById(id: number): Promise<Product | null> {
        return this.handleRequest(async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Products/${id}`);
                return response.data as Product;
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        });
    }

    async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
        return this.handleRequest(async () => {
            const response = await axios.post(`${API_BASE_URL}/Products`, product);
            return response.data as Product;
        });
    }

    async updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
        return this.handleRequest(async () => {
            try {
                const response = await axios.put(`${API_BASE_URL}/Products/${id}`, updates);
                return response.data as Product;
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        });
    }

    // Salespersons
    async getAllSalespersons(): Promise<Salesperson[]> {
        return this.handleRequest(async () => {
            const response = await axios.get(`${API_BASE_URL}/SalesPersons`);
            return response.data as Salesperson[];
        });
    }

    async getSalespersonById(id: number): Promise<Salesperson | null> {
        return this.handleRequest(async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/SalesPersons/${id}`);
                return response.data as Salesperson;
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        });
    }

    async createSalesperson(salesperson: Omit<Salesperson, 'id'>): Promise<Salesperson> {
        return this.handleRequest(async () => {
            const response = await axios.post(`${API_BASE_URL}/SalesPersons`, salesperson);
            return response.data as Salesperson;
        });
    }

    async updateSalesperson(id: number, updates: Partial<Salesperson>): Promise<Salesperson | null> {
        return this.handleRequest(async () => {
            try {
                const response = await axios.put(`${API_BASE_URL}/SalesPersons/${id}`, updates);
                return response.data as Salesperson;
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        });
    }

    // Customers
    async getAllCustomers(): Promise<Customer[]> {
        return this.handleRequest(async () => {
            const response = await axios.get(`${API_BASE_URL}/Customers`);
            return response.data as Customer[];
        });
    }

    async getCustomerById(id: number): Promise<Customer | null> {
        return this.handleRequest(async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Customers/${id}`);
                return response.data as Customer;
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        });
    }

    async createCustomer(customer: Omit<Customer, 'id'>): Promise<Customer> {
        return this.handleRequest(async () => {
            const response = await axios.post(`${API_BASE_URL}/Customers`, customer);
            return response.data as Customer;
        });
    }

    async updateCustomer(id: number, updates: Partial<Customer>): Promise<Customer | null> {
        return this.handleRequest(async () => {
            try {
                const response = await axios.put(`${API_BASE_URL}/Customers/${id}`, updates);
                return response.data as Customer;
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        });
    }

    // Sales
    async getAllSales(): Promise<Sale[]> {
        return this.handleRequest(async () => {
            const response = await axios.get(`${API_BASE_URL}/Sales`);
            return response.data as Sale[];
        });
    }

    async getSaleById(id: number): Promise<Sale | null> {
        return this.handleRequest(async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Sales/${id}`);
                return response.data as Sale;
            } catch (error: any) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        });
    }

    async createSale(sale: Omit<Sale, 'id'>): Promise<Sale> {
        return this.handleRequest(async () => {
            const response = await axios.post(`${API_BASE_URL}/Sales`, sale);
            return response.data as Sale;
        });
    }

    // Discounts
    async getAllDiscounts(): Promise<Discount[]> {
        return this.handleRequest(async () => {
            const response = await axios.get(`${API_BASE_URL}/Discounts`);
            return response.data as Discount[];
        });
    }
}

export const externalApiService = new ExternalApiService(); 