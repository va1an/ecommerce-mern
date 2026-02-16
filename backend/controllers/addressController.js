import Address from "../models/addressModel.js"

export const createAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const data = req.body;

        if (data.isDefault) {
            await Address.updateMany({ user: userId }, { isDefault: false });
        }

        const address = await Address.create({ ...data, user: userId });
        res.status(201).json({ address });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const getAllAddress = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
        res.status(200).json({ addresses });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        if (req.body.isDefault) {
            await Address.updateMany({ user: userId }, { isDefault: false });
        }

        const address = await Address.findOneAndUpdate({ _id: id, user: userId }, req.body, { new: true });
        res.status(200).json({ address });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const deleteAddress = async (req, res) => {
    try {
        await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        res.status(200).json({ message: "Address deleted" });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

export const setDefaultAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        await Address.updateMany({ user: userId }, { isDefault: false });

        const address = await Address.findByIdAndUpdate(id, { isDefault: true }, { new: true });
        res.status(200).json({ address });
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}