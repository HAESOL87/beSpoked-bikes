import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { productsApi } from '../services/api';
import ProductModalForm from './ProductModalForm';
import './ProductsList.css';

// Import icons
import OutOfStock from '../assets/OutOfStock';
import LowStock from '../assets/LowStock';
import Checkmark from '../assets/Checkmark';
import Edit from '../assets/Edit';

const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productsApi.getAll();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handlers
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleProductUpdated = () => {
        fetchProducts();
    };

    // Render
    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="products-list">
            <div className="page-header">
                <h2>Products</h2>
            </div>

            <div className="action-container">
                <button
                    onClick={handleAdd}
                    className="btn-green"
                >
                    Add Product
                </button>
            </div>
            
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Style</th>
                            <th>Purchase Price</th>
                            <th>Sale Price</th>
                            <th>Quantity on Hand</th>
                            <th>Commission %</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            const isOutOfStock = product.qtyOnHand === 0;
                            const isLowStock = product.qtyOnHand > 0 && product.qtyOnHand <= 5;

                            return (
                                <tr 
                                    key={product.id} 
                                    className={
                                        isOutOfStock ? 'products-list-row--out-of-stock' : 
                                        isLowStock ? 'products-list-row--low-stock' : ''
                                    }
                                >
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.manufacturer}</td>
                                    <td>{product.style}</td>
                                    <td>${product.purchasePrice.toFixed(2)}</td>
                                    <td>${product.salePrice.toFixed(2)}</td>
                                    <td>
                                        <span className={
                                            isOutOfStock ? 'products-list-qty--out-of-stock' : 
                                            isLowStock ? 'products-list-qty--low-stock' : 
                                            'products-list-qty--in-stock'
                                        }>
                                            {product.qtyOnHand}
                                            {isOutOfStock && <OutOfStock />}
                                            {isLowStock && <LowStock />}
                                            {!isOutOfStock && !isLowStock && <Checkmark />}
                                        </span>
                                        {isOutOfStock && (
                                            <small className="products-list-status-label products-list-status-label--out-of-stock">
                                                OUT OF STOCK
                                            </small>
                                        )}
                                        {isLowStock && (
                                            <small className="products-list-status-label products-list-status-label--low-stock">
                                                LOW STOCK
                                            </small>
                                        )}
                                    </td>
                                    <td>{product.commissionPercentage}%</td>
                                    <td className="actions-cell">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="btn-edit-icon"
                                        >
                                            <Edit />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <ProductModalForm
                product={editingProduct}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onProductUpdated={handleProductUpdated}
            />
        </div>
    );
};

export default ProductsList; 