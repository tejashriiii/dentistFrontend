import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function PaymentPage() {
  const [formData, setFormData] = useState({
    clinic: "",
    doctor: "",
    mode: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment details submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="bg-purple-200 shadow-lg rounded-2xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-purple-900 text-center mb-4">
          Payment Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="clinic" className="block text-purple-800 mb-1">
              Clinic
            </label>
            <input
              type="text"
              id="clinic"
              name="clinic"
              value={formData.clinic}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter Clinic Name"
            />
          </div>
          <div>
            <label htmlFor="doctor" className="block text-purple-800 mb-1">
              Doctor
            </label>
            <input
              type="text"
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter Doctor's Name"
            />
          </div>
          <div>
            <label htmlFor="mode" className="block text-purple-800 mb-1">
              Mode
            </label>
            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount" className="block text-purple-800 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter Amount"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-purple-800 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-medium py-2 rounded-lg hover:bg-purple-600 transition duration-200"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PaymentPage />);

export default Payment;