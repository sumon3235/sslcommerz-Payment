import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-800">All Items</h1>
          <p className="text-sm text-slate-400 mt-1">
            {items.length} টি আইটেম পাওয়া গেছে
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="h-48 bg-slate-100 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Name + Category */}
                <div className="mb-3">
                  <h3 className="text-base font-semibold text-slate-800">
                    {item.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {item.category}
                  </span>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {/* Price + Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-slate-800">
                    ৳{item.price?.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-lg border
                                        ${
                                          item.status === "Available"
                                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                            : item.status === "Out of stock"
                                              ? "bg-rose-50 text-rose-500 border-rose-200"
                                              : "bg-amber-50 text-amber-500 border-amber-200"
                                        }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={item.status !== "Available"}
                  className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 mx-auto mb-4 text-slate-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-lg font-medium">কোনো আইটেম নেই</p>
            <p className="text-sm mt-1">প্রথমে কিছু আইটেম add করুন</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllItems;
