function DataTable({ columns, data, onRowClick }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Header */}
          <thead>
            <tr className="border border-slate-200 bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-6 py-4 text-left font-semibold text-slate-650"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className="
                    cursor-pointer
                    hover:bg-slate-50
                    transition
                  "
                >
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="px-6 py-4 text-slate-600"
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
