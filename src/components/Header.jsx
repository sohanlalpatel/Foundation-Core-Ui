function Header({ title, user }) {
  const userName = user?.email || "User";

   const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40  h-16 w-full bg-white border-b flex items-center justify-between px-4 sm:px-6">
      <h2 className="text-lg ml-12 md:ml-0 sm:text-xl font-semibold text-slate-800 truncate">
        {title}
      </h2>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden xs:block sm:block text-right">
          <p className="text-xs text-slate-500">Welcome</p>
          <p className="text-sm font-medium text-slate-800 max-w-32 truncate">
            {userName}
          </p>
        </div>

        <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}

export default Header;
