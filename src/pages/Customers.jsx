import { useEffect, useState } from "react";
import { customers as initialCustomers } from "../data/customers";
import PageHeader from "../components/PageHeader";
import TableToolbar from "../components/TableToolbar";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import AddCustomerModal from "../components/AddCustomerModal";
import CustomerModal from "../components/CustomerModal";
import { EyeIcon, Trash2 } from "lucide-react";

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

   const name = customer.name?.toLowerCase() || "";
   const email = customer.email?.toLowerCase() || "";
   const phone = customer.phone || "";

   const matchesSearch =
     name.includes(searchText) ||
     email.includes(searchText) ||
     phone.includes(searchText);

   const matchesStatus = status === "All" || customer.status === status;

   return matchesSearch && matchesStatus;
 });

 
const addCustomer = (newCustomer) => {
  const emailExists = customers.some(
    (customer) =>
      customer.email.toLowerCase().trim() ===
      newCustomer.email.toLowerCase().trim(),
  );

  if (emailExists) {
    return {
      success: false,
      message: "A customer with this email already exists.",
    };
  }

  setCustomers((currentCustomers) => [...currentCustomers, newCustomer]);

  setShowAddModal(false);

  setSuccessMessage("Customer added successfully.");

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);

  return {
    success: true,
  };
};

 const deleteCustomer = (customerId) => {
   const customer = customers.find((customer) => customer.id === customerId);

   if (!customer) return;

   const confirmDelete = window.confirm(
     `Are You sure, you want to delete ${customer.name}?`,
   );

   if (!confirmDelete) return;

   setCustomers((currentCustomers) =>
     currentCustomers.filter((customer) => customer.id !== customerId),
   );

   if (selectedCustomer?.id === customerId) {
     setSelectedCustomer(null);
   }

   setSuccessMessage("Customer deleted Successfully.");

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
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCustomer(customer);
            }}
            className="
            text-sm
            font-medium
            text-blue-600
            hover:text-blue-700
            transition
          "
          >
            <EyeIcon size={16}/>
          </button>

          <button onClick={(e)=>{
            e.stopPropagation();
            deleteCustomer(customer.id);
          }} 
          className="text-sm text-red-400 font-medium">
            <Trash2 size={16}/>
          </button>
        </div>
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
            className="mb-5 flex  items-center justify-between rounded-lg  border border-green-200 bg-green-50 px-4 py-3  text-sm text-green-700">
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
