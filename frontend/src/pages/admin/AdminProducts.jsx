import { Plus } from 'lucide-react';
import AdminProductsTable from '../../components/AdminProductsTable';
import { useNavigate } from 'react-router-dom';

export default function AdminProducts() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-inter font-bold">Products</h1>
                <button onClick={() => navigate('/admin/products/add')} className='flex items-center font-inter gap-2 bg-primaryButton text-white rounded-lg cursor-pointer px-4 py-2 hover:bg-primaryHover'><Plus size={18} /> Add Product</button>
            </div>

            <AdminProductsTable />
        </div>
    )
}