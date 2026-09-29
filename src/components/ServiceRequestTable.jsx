function ServiceRequestTable({ requests }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
           <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Customer
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Service
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Date
              </th>

              <th className="px-6 py-4 text-right font-semibold text-slate-600">
                Action
              </th>
            </tr>
          </thead>

           <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="
                    hover:bg-slate-50
                    transition
                  "
                >
                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">
                      {request.customer}
                    </div>
                  </td>

                   <td className="px-6 py-4 text-slate-600">
                    {request.service}
                  </td>

                   <td className="px-6 py-4">
                    <span
                      className={`
                        inline-flex
                        items-center
                        px-2.5
                        py-1
                        rounded-full
                        text-xs
                        font-medium

                        ${
                          request.status === "Completed"
                            ? "bg-green-50 text-green-600"
                            : "bg-yellow-50 text-yellow-600"
                        }
                      `}
                    >
                      {request.status}
                    </span>
                  </td>

                   <td className="px-6 py-4 text-slate-500">{request.date}</td>

                   <td className="px-6 py-4 text-right">
                    <button
                      className="
                        text-blue-600
                        hover:text-blue-700
                        text-sm
                        font-medium
                        transition
                      "
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="text-slate-500">
                    No service requests found.
                  </div>

                  <p className="text-sm text-slate-400 mt-1">
                    Try changing your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServiceRequestTable;
