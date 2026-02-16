import { useEffect, useState } from "react"

export default function AddressForm({ initialData = {}, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: false
    });

    useEffect(() => {
        if (initialData) {
            setFormData({ ...formData, ...initialData });
        }
    }, [initialData]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData);
    }
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-3">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="border border-gray-200 w-full px-3 py-2 rounded" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border border-gray-200 w-full px-3 py-2 rounded" required />
            <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="border border-gray-200 w-full px-3 py-2 rounded" required />
            <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" className="border border-gray-200 w-full px-3 py-2 rounded" />

            <div className="grid grid-cols-2 gap-3">
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="border border-gray-200 w-full px-3 py-2 rounded" required />
                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" className="border border-gray-200 w-full px-3 py-2 rounded" required />
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="border border-gray-200 w-full px-3 py-2 rounded" required />

                <label className="flex gap-2">
                    <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} />
                    Set as default
                </label>

                <div className="flex gap-3">
                    <button type="submit" className="bg-primaryButton hover:bg-primaryHover font-inter text-white px-4 py-2 cursor-pointer rounded">Save Address</button>
                    <button onClick={onCancel} type="button" className="bg-gray-500 hover:bg-gray-600 font-inter text-white px-4 py-2 cursor-pointer rounded">Cancel</button>
                </div>
            </div>
        </form>
    )
}