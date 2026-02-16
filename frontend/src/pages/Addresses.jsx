import { Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createAddress, deleteAddress, getAddresses, updateAddress } from "../api/address";
import toast from "react-hot-toast";
import AddressForm from "../components/AddressForm";

export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);

    async function fetchAddresses() {
        try {
            const res = await getAddresses();
            setAddresses(res.data.addresses);

            const defaultAddress = res.data.addresses.find(a => a.isDefault);

            if (defaultAddress) {
                setSelectedAddress(defaultAddress._id);
            }
        }
        catch (error) {
            toast.error("Failed to fetch address");
        }
    }

    useEffect(() => {
        fetchAddresses();
    }, []);

    async function handleSave(data) {
        try {
            if (editing) {
                await updateAddress(editing._id, data);
                toast.success("Address updated");
            } else {
                await createAddress(data);
                toast.success("Address created");
            }

            setEditing(null);
            setShowForm(false);
            fetchAddresses();
        }
        catch (error) {
            toast.error("Failed to save addresss")
        }
    }

    async function handleDelete(id) {
        try {
            await deleteAddress(id);
            toast.success("Address deleted");
            fetchAddresses();
        }
        catch (error) {
            toast.error("Failed to delete address");
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-6 font-inter">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">My Addresses</h1>
                <button onClick={() => { setEditing(null); setShowForm(true) }} className="flex items-center gap-2 bg-primaryButton text-white px-4 py-2 rounded hover:bg-primaryHover cursor-pointer"><Plus size={18} /> Add Address</button>
            </div>

            {showForm && (
                <AddressForm initialData={editing} onSubmit={handleSave} onCancel={() => { setShowForm(false); setEditing(null) }} />
            )}

            {addresses.length === 0 && (
                <div className="text-center border rounded p-10 bg-white">
                    <p className="mb-4 text-gray-600"> You don't have any saved addresses yet</p>
                    <button onClick={() => { setEditing(null); setShowForm(true) }} className="bg-primaryButton text-white px-5 py-2 rounded hover:bg-primaryHover cursor-pointer">Add Your First Address </button>
                </div>)}

            <div className="grid md:grid-cols-2 gap-5">
                {addresses.map((addr) => (
                    <div key={addr._id} className="bg-white border rounded-lg p-5 shadow-sm relative">
                        {addr.isDefault && (<span className="absolute top-3 right-3 text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Default</span>)}
                        <h3 className="font-semibold">{addr.fullName}</h3>
                        <p className="text-sm text-gray-600">{addr.phone}</p>
                        <p className="mt-2 text-gray-700 text-sm">{addr.addressLine1}, {addr.city}, {addr.state}</p>
                        <p className="text-gray-700 text-sm">{addr.pincode}</p>
                        <div className="flex gap-4 mt-4">
                            <button onClick={() => { setEditing(addr); setShowForm(true) }} className="text-blue-600"><Pencil size={18} /></button>
                            <button onClick={() => handleDelete(addr._id)} className="text-red-600"><Trash2 size={18} /></button>
                            {!addr.isDefault && (<button onClick={() => onSetDefault(addr._id)} className="text-sm text-gray-500" >Set Default</button>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}