function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200",
    secondary:
      "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-200",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",
  };
   
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium  transition focus:ring-2
        disabled:opacity-50
         ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
