import axios from 'axios';
import type { Product, Salesperson, Customer, Sale, SaleWithDetails, Discount, DetailedCommissionReport } from '../types';

const API_BASE_URL = 'http://localhost:3002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsApi = {
  getAll: () => api.get<Product[]>('/products').then(res => res.data),
  getById: (id: number) => api.get<Product>(`/products/${id}`).then(res => res.data),
  create: (product: Omit<Product, 'id'>) => api.post<Product>('/products', product).then(res => res.data),
  update: (id: number, product: Partial<Product>) => api.put<Product>(`/products/${id}`, product).then(res => res.data),
};

// Salespersons API
export const salespersonsApi = {
  getAll: () => api.get<Salesperson[]>('/salespersons').then(res => res.data),
  getById: (id: number) => api.get<Salesperson>(`/salespersons/${id}`).then(res => res.data),
  create: (salesperson: Omit<Salesperson, 'id'>) => api.post<Salesperson>('/salespersons', salesperson).then(res => res.data),
  update: (id: number, salesperson: Partial<Salesperson>) => api.put<Salesperson>(`/salespersons/${id}`, salesperson).then(res => res.data),
};

// Customers API
export const customersApi = {
  getAll: () => api.get<Customer[]>('/customers').then(res => res.data),
  getById: (id: number) => api.get<Customer>(`/customers/${id}`).then(res => res.data),
  create: (customer: Omit<Customer, 'id'>) => api.post<Customer>('/customers', customer).then(res => res.data),
  update: (id: number, customer: Partial<Customer>) => api.put<Customer>(`/customers/${id}`, customer).then(res => res.data),
};

// Sales API
export const salesApi = {
  getAll: () => api.get<SaleWithDetails[]>('/sales', { params: { details: 'true' } }).then(res => res.data),
  getById: (id: number) => api.get<Sale>(`/sales/${id}`).then(res => res.data),
  getByDateRange: (startDate: string, endDate: string) => 
    api.get<SaleWithDetails[]>('/sales', { params: { startDate, endDate } }).then(res => res.data),
  create: (sale: Omit<Sale, 'id'>) => api.post<Sale>('/sales', sale).then(res => res.data),
  update: (id: number, sale: Partial<Sale>) => api.put<Sale>(`/sales/${id}`, sale).then(res => res.data),
};

// Discounts API
export const discountsApi = {
  getAll: () => api.get<Discount[]>('/discounts').then(res => res.data),
  getActive: () => api.get<Discount[]>('/discounts', { params: { active: 'true' } }).then(res => res.data),
};

// Commission Reports API
export const reportsApi = {
  getDetailedCommission: (quarter: number, year: number, salesPersonId?: number) =>
    api.get<DetailedCommissionReport[]>('/reports/commission-detailed', {
      params: { 
        quarter, 
        year,
        ...(salesPersonId && { salesPersonId })
      }
    }).then(res => res.data),
};

// External API - Profisee API
export const externalApi = {
  products: {
    getAll: () => api.get<Product[]>('/external/products').then(res => res.data),
    getById: (id: number) => api.get<Product>(`/external/products/${id}`).then(res => res.data),
    create: (product: Omit<Product, 'id'>) => api.post<Product>('/external/products', product).then(res => res.data),
    update: (id: number, product: Partial<Product>) => api.put<Product>(`/external/products/${id}`, product).then(res => res.data),
  },
  salespersons: {
    getAll: () => api.get<Salesperson[]>('/external/salespersons').then(res => res.data),
    getById: (id: number) => api.get<Salesperson>(`/external/salespersons/${id}`).then(res => res.data),
    create: (salesperson: Omit<Salesperson, 'id'>) => api.post<Salesperson>('/external/salespersons', salesperson).then(res => res.data),
    update: (id: number, salesperson: Partial<Salesperson>) => api.put<Salesperson>(`/external/salespersons/${id}`, salesperson).then(res => res.data),
  },
  customers: {
    getAll: () => api.get<Customer[]>('/external/customers').then(res => res.data),
    getById: (id: number) => api.get<Customer>(`/external/customers/${id}`).then(res => res.data),
    create: (customer: Omit<Customer, 'id'>) => api.post<Customer>('/external/customers', customer).then(res => res.data),
    update: (id: number, customer: Partial<Customer>) => api.put<Customer>(`/external/customers/${id}`, customer).then(res => res.data),
  },
  sales: {
    getAll: () => api.get<Sale[]>('/external/sales').then(res => res.data),
    getById: (id: number) => api.get<Sale>(`/external/sales/${id}`).then(res => res.data),
    create: (sale: Omit<Sale, 'id'>) => api.post<Sale>('/external/sales', sale).then(res => res.data),
    update: (id: number, sale: Partial<Sale>) => api.put<Sale>(`/external/sales/${id}`, sale).then(res => res.data),
  },
  discounts: {
    getAll: () => api.get<Discount[]>('/external/discounts').then(res => res.data),
  },
};

export default api; 