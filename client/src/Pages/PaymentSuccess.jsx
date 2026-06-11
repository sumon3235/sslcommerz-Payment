import { useNavigate } from "react-router";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center max-w-md w-full">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-2xl font-semibold text-slate-800 mb-2">Payment Successful!</h1>
                <p className="text-slate-400 text-sm mb-6">আপনার payment সফলভাবে সম্পন্ন হয়েছে।</p>
                <button
                    onClick={() => navigate("/allItems")}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                >
                    আবার কেনাকাটা করুন
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;