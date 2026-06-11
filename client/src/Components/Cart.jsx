import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";

const Cart = () => {
  const { cart, removeFromCart, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const form = e.target;

    const customer = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
    };

    try {
      const res = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, totalPrice, customer }),
      });

      const data = await res.json();
      console.log("response:", data);

      if (data.url) {
        console.log(34)
        window.location.replace(data.url);
      }
    } catch (err) {
        console.log(38)
      console.log("Error:", err);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 mb-4 text-slate-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="text-lg font-medium">Cart খালি আছে</p>
        <p className="text-sm mt-1 mb-6">কিছু item add করুন</p>
        <button
          onClick={() => navigate("/allItems")}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
        >
          Items দেখুন
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Your Cart</h1>
            <p className="text-sm text-slate-400 mt-1">
              {totalItems} টি item আছে
            </p>
          </div>
          <button
            onClick={clearCart}
            className="px-4 py-2 rounded-xl text-sm font-medium text-rose-500 border border-rose-200 hover:bg-rose-50 transition-all"
          >
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Table Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Subtotal
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      ৳{item.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 ml-auto w-full max-w-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Items ({totalItems})</span>
                <span>৳{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Shipping</span>
                <span className="text-emerald-500">Free</span>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-3 mb-5">
              <div className="flex justify-between text-base font-semibold text-slate-800">
                <span>Total</span>
                <span>৳{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/allItems")}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 border border-slate-200 transition-all mt-2"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4 text-black">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Delivery Information
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
                {/* name field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600">
                  নাম <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="আপনার নাম"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
                />
              </div>
              {/* email field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600">
                  Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
                />
              </div>
              {/* phone number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600">
                  Phone <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
                />
              </div>
              {/* address field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-600">
                  Address <span className="text-rose-400">*</span>
                </label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  placeholder="আপনার ঠিকানা"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-500 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                >
                  Pay ৳{totalPrice.toLocaleString()}
                </button>
              </div>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
