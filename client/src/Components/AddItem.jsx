import { useNavigate } from "react-router";

const AddItem = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const payload = {
            name: form.name.value,
            category: form.category.value,
            price: Number(form.price.value),
            stock: Number(form.stock.value),
            status: form.status.value,
            description: form.description.value,
            image: form.image.value,
        };
        console.log(payload)

        try {
            const res = await fetch("http://localhost:5000/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                form.reset();
                navigate("/allItems");
            } else {
                alert("Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            alert("Server error!");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-2xl">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                        {/* Card Header */}
                        <div className="px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-800">Add new item</h2>
                                    <p className="text-sm text-slate-400">Fill in the details below to add a new item.</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="px-8 py-7 space-y-5">

                                {/* Item Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-600">
                                        Item name <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="e.g. Wireless Mouse"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Category + Price */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-600">
                                            Category <span className="text-rose-400">*</span>
                                        </label>
                                        <select
                                            name="category"
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:border-transparent transition-all cursor-pointer"
                                        >
                                            <option value="">Select one</option>
                                            <option>Electronics</option>
                                            <option>Clothing</option>
                                            <option>Food</option>
                                            <option>Furniture</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-600">
                                            Price (BDT) <span className="text-rose-400">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            required
                                            placeholder="0.00"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-600">Description</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        placeholder="Write a short description..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                {/* Image URL */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-slate-600">Image URL</label>
                                    <input
                                        type="url"
                                        name="image"
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Stock + Status */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-600">Stock quantity</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            placeholder="0"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-slate-600">Status</label>
                                        <select
                                            name="status"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white focus:border-transparent transition-all cursor-pointer"
                                        >
                                            <option>Available</option>
                                            <option>Out of stock</option>
                                            <option>Coming soon</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save item
                                </button>
                            </div>
                        </form>

                    </div>
                    <p className="text-center text-xs text-slate-400 mt-4">
                        <span className="text-rose-400">*</span> Required fields
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddItem;