import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCard from "../components/SummaryCard";
import ServiceRequestTable from "../components/ServiceRequestTable";

import { serviceRequests } from "../data/serviceRequests";

function Dashboard() {
      const user = JSON.parse(localStorage.getItem("user")) || {
        name: "User",
        email: "",
      };


  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="md:ml-64">
        <Header title="Dashboard" user={user} />
        <main className="p-4 pt-20 md:p-6 md:pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <SummaryCard title="Total Customers" value="120" />
            <SummaryCard title="Active Services" value="35" />
            <SummaryCard title="Pending Requests" value="12" />
            <SummaryCard title="Revenue" value="₹2,50,000" />
          </div>

          <div className="mt-6">
            <ServiceRequestTable requests={serviceRequests} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
