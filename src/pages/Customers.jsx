import { useEffect, useState } from "react";
import { customers as initialCustomers } from "../data/customers";

import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/TableToolbar";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";

import AddCustomerModal from "../components/AddCustomerModal";
import CustomerModal from "../components/CustomerModal";

function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

 
  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      customer.phone.includes(searchText);

    const matchesStatus = status === "All" || customer.status === status;
    return matchesSearch && matchesStatus;
  });

 
  const addCustomer = (newCustomer) => {
    setCustomers((currentCustomers) => [...currentCustomers, newCustomer]);
    setShowAddModal(false);
    setSuccessMessage("Customer added successfully.");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

 
  const customerColumns = [
    {
      header: "Name",
      accessor: "name",

      render: (customer) => (
        <span className="font-medium text-slate-800">{customer.name}</span>
      ),
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Status",
      accessor: "status",
      render: (customer) => <StatusBadge status={customer.status} />,
    },

    {
      header: "Action",
      accessor: "action",

      render: (customer) => (
        <button
          onClick={() => {e.stopPropagation(); 
            setSelectedCustomer(customer)}}
          className="
            text-sm
            font-medium
            text-blue-600
            hover:text-blue-700
            transition
          "
        >
          View Details
        </button>
      ),
    },
  ];

 
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div
            className="
            mx-auto
            h-8
            w-8
            animate-spin
            rounded-full
            border-4
            border-slate-200
            border-t-blue-600
          "
          />

          <p className="mt-3 text-sm text-slate-500">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="p-4 md:p-6">
        <PageHeader
          title="Customers"
          description="Manage and view all your customers."
          actionLabel="Add Customer"
          onAction={() => setShowAddModal(true)}
        />
        {successMessage && (
          <div
            className="mb-5 flex  items-center justify-between rounded-lg  border border-green-200 bg-green-50 px-4 py-3  text-s text-green-700">
            <span>{successMessage}</span>

            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        )}

        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4">
            <TableToolbar
              search={search}
              setSearch={setSearch}
              searchPlaceholder="Search customers..."
              filterValue={status}
              setFilterValue={setStatus}
              filterOptions={[
                {
                  value: "All",
                  label: "All Status",
                },
                {
                  value: "Active",
                  label: "Active",
                },
                {
                  value: "Inactive",
                  label: "Inactive",
                },
              ]}
            />
          </div>

          <div
            className="
            flex
            items-center
            justify-between
            px-5
            py-4
          "
          >
            <div>
              <h2 className="font-semibold text-slate-800">Customer List</h2>
              <p className="mt-1 text-xs text-slate-500">
                {filteredCustomers.length} customers
              </p>
            </div>
          </div>

          {filteredCustomers.length > 0 ? (
            <DataTable
              columns={customerColumns}
              data={filteredCustomers}
              onRowClick={(customer) => setSelectedCustomer(customer)}
            />
          ) : (
            <div className="px-6 py-12 text-center">
              <h3 className="font-medium text-slate-700">No customers found</h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>
      </main>
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
