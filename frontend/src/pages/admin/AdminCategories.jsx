import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { createCategory, deleteCategory, getCategories, toggleCategory, updateCategory } from "../../api/category";
import { Check, Edit, Trash2, X } from "lucide-react";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [editId, setEditId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [editName, setEditName] = useState("");

    async function fetchCategories() {
        try {
            const res = await getCategories();
            setCategories(res.data.categories);
        }
        catch (error) {
            toast.error("Failed to fetch categories");
        }
    }

    async function handleCreate() {
        if (!name) return toast.error("Category name required");

        await createCategory({ name });
        toast.success("Category created");
        setName("");
        fetchCategories();
    }

    async function handleToggle(id) {
        await toggleCategory(id);
        fetchCategories();
    }

    async function handleUpdate() {
        if (!editName) return toast.error("Name required");

        await updateCategory(editId, { name: editName });
        toast.success("Category updated");
        setEditId(null);
        setEditName("");
        fetchCategories();
    }

    async function categoryDelete() {
        try {
            await deleteCategory(selectedCategoryId);
            setCategories(prev => prev.filter(category => String(category._id) !== String(selectedCategoryId)));
            setSelectedCategoryId(null);
            setOpenModal(false);
        }
        catch (error) {
            toast.error("Category delete failed");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    if (categories.length === 0) return <p>No products found</p>

    return (
        <div className="p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            <div className="flex gap-3 mb-6">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" className="border px-3 py-2 rounded w-64" />
                <button onClick={handleCreate} className="bg-primaryButton hover:bg-primaryHover text-white px-4 py-2 rounded">Add</button>
            </div>

            <table className="w-full bg-white shadow border-collapse font-inter">
                <thead className="bg-gray-100">
                    <tr className="border-b text-left">
                        <th className="p-3 ">Name</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat._id} className="border-t">
                            <td className="p-3">{editId === cat._id ? (
                                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="border px-2 py-1 rounded w-full" />
                            ) : (cat.name)}</td>

                            <td className="p-3 text-center">{cat.isActive ? "Active" : "Disabled"}</td>
                            <td className="p-3 text-center">
                                <div className="flex justify-center gap-3">
                                    {editId === cat._id ? (
                                        <>
                                            <button onClick={() => handleUpdate(cat._id)}><Check className="text-green-600" /></button>
                                            <button onClick={() => setEditId(null)}><X className="text-gray-600" /></button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => { setEditId(cat._id); setEditName(cat.name) }}><Edit className="text-blue-600" /></button>
                                            <button onClick={() => handleToggle(cat._id)}>Toggle</button>
                                            <button onClick={() => { setSelectedCategoryId(cat._id); setOpenModal(true) }}><Trash2 className="text-red-600" /></button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmDeleteModal open={openModal} onClose={() => setOpenModal(false)} onConfirm={categoryDelete} />
        </div>
    )
}