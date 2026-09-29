function StatusBadge({ status }) {
  const styles = {
    Active: "bg-blue-50 text-blue-700",
    Inactive: "bg-yellow-50 text-yellow-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Completed: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium
        ${styles[status] || "bg-slate-100 text-slate-600"}
      `}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
