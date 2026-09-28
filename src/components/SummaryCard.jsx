function SummaryCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-2">{value}</h3>
    </div>
  );
}

export default SummaryCard;
