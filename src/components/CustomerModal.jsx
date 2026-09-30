import Button from "./Button";

function CustomerModal({ customer, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Customer Details</h2>
          <button
            onClick={onClose}
            className="text-xl text-slate-500 hover:text-black">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="font-medium">{customer.name}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium">{customer.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <p className="font-medium">{customer.phone}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-medium">{customer.status}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Service</p>
            <p className="font-medium">{customer.service}</p>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="mt-6 w-full   py-3 rounded-lg">
          Close
        </Button>
      </div>
    </div>
  );
}

export default CustomerModal;
