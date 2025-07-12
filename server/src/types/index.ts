export interface Product {
  id: number;
  name: string;
  manufacturer: string;
  style: string;
  purchasePrice: number;
  salePrice: number;
  qtyOnHand: number;
  commissionPercentage: number;
}

export interface Salesperson {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  startDate: string;
  terminationDate: string;
  manager: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  startDate: string;
}

export interface Sale {
  id: number;
  productId: number;
  salesPersonId: number;
  customerId: number;
  date: string;
}

export interface SaleWithDetails extends Sale {
  product: Product;
  salesPerson: Salesperson;
  customer: Customer;
}

export interface Discount {
  id: number;
  productId: number;
  beginDate: string;
  endDate: string;
  percentage: number;
}

export interface DiscountWithDetails extends Discount {
  product: Product;
}

// Created for Commission Report
export interface DetailedCommissionReport {
  saleId: number;
  salespersonName: string;
  date: string;
  productName: string;
  quantity: number;
  discountStatus: string;
  discountRate: number;
  originalPrice: number;
  finalPrice: number;
  commission: number;
  quarter: string;
  year: number;
}