import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { deleteProduct, getAllProducts } from "../api/product";
import { Edit, Trash2 } from 'lucide-react';
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

export default function AdminProductsTable({ setPage, setTotalPages }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate();

    async function fetchProducts() {
        try {
            const { data } = await getAllProducts();
            setProducts(data.data);
            setPage(data.currentPage);
            setTotalPages(data.totalPages);
        }
        catch (error) {
            toast.error("Failed to load products")
        }
        finally {
            setLoading(false);
        }
    }

    async function productDelete() {
        try {
            await deleteProduct(selectedProductId);
            setProducts(prev => prev.filter(product => String(product._id) !== String(selectedProductId)));
            setSelectedProductId(null);
            setOpenModal(false);
        }
        catch (error) {
            toast.error("Product delete failed");
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <Spinner />

    if (products.length === 0) return <p>No products found</p>

    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left font-inter">Image</th>
                        <th className="p-3 text-left font-inter">Name</th>
                        <th className="p-3 text-left font-inter">Price</th>
                        <th className="p-3 text-left font-inter">Stock</th>
                        <th className="p-3 text-left font-inter">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="border-t">
                            <td className="p-3"><img src={product.images?.[0]?.url} alt={product.name} className="w-14 h-14 object-cover rounded" /></td>
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">₹{product.price}</td>
                            <td className="p-3">{product.stock > 0 ? <span className="text-green-600 font-inter">In stock</span> : <span className="text-red-600">Out of stock</span>}</td>
                            <td className="px-3 py-6 flex gap-3"><button onClick={() => navigate(`/admin/products/edit/${product._id}`)} className="text-blue-600 cursor-pointer hover:underline"><Edit size={30} /></button> <button onClick={() => { setSelectedProductId(product._id); setOpenModal(true) }} className="text-red-600 cursor-pointer hover:underline"><Trash2 size={30} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmDeleteModal open={openModal} onClose={() => setOpenModal(false)} onConfirm={productDelete} />
        </div >
    )
}