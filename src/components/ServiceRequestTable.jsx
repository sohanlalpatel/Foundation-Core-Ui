function ServiceRequestTable({ requests }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="p-5 border-b">
        <h3 className="font-semibold text-lg">Recent Service Requests</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Service</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-t">
                <td className="p-4">{request.customer}</td>

                <td className="p-4">{request.service}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      request.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>

                <td className="p-4">{request.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceRequestTable;
