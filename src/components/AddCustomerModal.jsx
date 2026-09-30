import { useState } from "react";
import Button from "./Button";
function AddCustomerModal({ onClose, onAdd }) {  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }

    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (!service.trim()) {
      setError("service is required.");
      return;
    }

    const result = onAdd({
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service: service.trim(),
      status,
    });

    if (result?.success === false) {
      setError(result.message);
      return;
    }

    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add Customer</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-slate-500 hover:text-black"
          >
            ✕
          </button>
        </div>
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter customer name"
              className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email
            </label>
            

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter email"
              className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>

            <input
              type="tel"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter phone number"
              className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Service</label>

            <input
              type="text"
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter Service"
              className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border px-4 py-2.5 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2.5"
            >
              Cancel
            </button>

            <Button
              type="submit"
              className=" "
            >
              Add Customer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCustomerModal;
