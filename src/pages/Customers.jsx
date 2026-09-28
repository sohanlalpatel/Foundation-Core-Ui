import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddCustomerModal from "../components/AddCustomerModal";
import CustomerModal from "../components/CustomerModal";
import { customers as initialCustomers } from "../data/customers";

function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

  const addCustomer = (newCustomer) => {
    setCustomers((currentCustomers) => [...currentCustomers, newCustomer]);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="md:ml-64">
        <Header title="Customers" />

        <main className="p-4 pt-20 md:p-6 md:pt-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border bg-white rounded-lg px-4 py-3 w-full md:w-80 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border bg-white rounded-lg px-4 py-3"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
              >
                + Add Customer
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="text-lg font-semibold">Customer List</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t">
                      <td className="p-4 font-medium">{customer.name}</td>
                      <td className="p-4">{customer.email}</td>
                      <td className="p-4">{customer.phone}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            customer.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="text-blue-600 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredCustomers.length === 0 && (
            <p className="text-center text-slate-500 mt-6">
              No customers found.
            </p>
          )}
        </main>
      </div>

      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {showAddModal && (
        <AddCustomerModal
          onClose={() => setShowAddModal(false)}
          onAdd={addCustomer}
        />
      )}
    </div>
  );
}

export default Customers;
