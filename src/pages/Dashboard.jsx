import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import { serviceRequests } from "../data/serviceRequests";
import { dashboardData } from "../data/dashboard";
import { useState } from "react";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import TableToolbar from "../components/TableToolbar";
 
function Dashboard({ setIsLoggedIn }) {
  const [dateFilter, setDateFilter] = useState("Today");
  const [requestSearch, setRequestSearch] = useState("");
  const [requestStatus, setRequestStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const currentData = dashboardData[dateFilter];

  const filteredRequests = serviceRequests.filter((request) => {
    const search = requestSearch.toLowerCase();

    const matchesSearch =
      request.customer.toLowerCase().includes(search) ||
      request.service.toLowerCase().includes(search);

    const matchesStatus =
      requestStatus === "All" || request.status === requestStatus;

    return matchesSearch && matchesStatus;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    return sortOrder === "newest" ? b.id - a.id : a.id - b.id;
  });

  const requestColumns = [
    {
      header: "Customer",
      accessor: "customer",
    },
    {
      header: "Service",
      accessor: "service",
    },
    {
      header: "Status",
      accessor: "status",

      render: (request) => <StatusBadge status={request.status} />,
    },
    {
      header: "Date",
      accessor: "date",
    },

  ];

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "",
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />

      <div className="md:ml-64">
        <Header title="Dashboard" user={user} />
        <main className="p-4 pt-20 md:p-6 md:pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Overview</h2>

              <p className="text-sm text-slate-500 mt-1">
                Monitor your business performance
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="dateFilter"
                className="text-sm font-medium text-slate-600"
              >
                Filter by:
              </label>

              <select
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="
                  border border-slate-300
                  rounded-lg
                  px-4 py-2
                  bg-white
                  text-sm
                  text-slate-700
                  font-medium
                  outline-none
                  cursor-pointer
                  hover:border-blue-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                  transition
                "
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SummaryCard
              title="Total Customers"
              value={currentData.totalCustomers}
            />

            <SummaryCard
              title="Active Services"
              value={currentData.activeServices}
            />

            <SummaryCard
              title="Pending Requests"
              value={currentData.pendingRequests}
            />

            <SummaryCard
              title="Revenue"
              value={`₹${currentData.revenue.toLocaleString("en-IN")}`}
            />
          </div>

          <div className="mt-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Service Requests
              </h2>
            </div>

            <div className="bg-white rounded-xl px-4 py-4 mb-3">
              <TableToolbar
                search={requestSearch}
                setSearch={setRequestSearch}
                searchPlaceholder="Search customer or service..."
                filterValue={requestStatus}
                setFilterValue={setRequestStatus}
                filterOptions={[
                  {
                    value: "All",
                    label: "All Status",
                  },
                  {
                    value: "Pending",
                    label: "Pending",
                  },
                  {
                    value: "Completed",
                    label: "Completed",
                  },
                ]}
                sortValue={sortOrder}
                setSortValue={setSortOrder}
                sortOptions={[
                  {
                    value: "newest",
                    label: "Newest First",
                  },
                  {
                    value: "oldest",
                    label: "Oldest First",
                  },
                ]}
              />
            </div>

            <DataTable columns={requestColumns} data={sortedRequests} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
