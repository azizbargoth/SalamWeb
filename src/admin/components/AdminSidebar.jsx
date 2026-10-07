import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "لوحة التحكم",
    path: "/admin",
    icon: "▦",
  },
  {
    label: "المحتوى",
    type: "section",
  },
  {
    label: "الأخبار",
    path: "/admin/news",
    icon: "▤",
  },
  {
    label: "البرامج",
    path: "/admin/programs",
    icon: "◫",
  },
  {
    label: "المشاريع",
    path: "/admin/projects",
    icon: "▱",
  },
  {
    label: "الرسائل",
    path: "/admin/messages",
    icon: "✉",
  },
  {
    label: "التبرعات",
    path: "/admin/donations",
    icon: "♡",
  },
  {
    label: "الوسائط",
    path: "/admin/media",
    icon: "▧",
  },
  {
    label: "الإعدادات",
    path: "/admin/settings",
    icon: "⚙",
  },
];

export default function AdminSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="إغلاق القائمة"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 right-0 z-50
          flex w-72 flex-col
          border-l border-slate-200
          bg-white
          shadow-xl
          transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        dir="rtl"
      >
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-slate-200 px-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Salam</h1>

            <p className="mt-0.5 text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              /* Section title */
              if (item.type === "section") {
                return (
                  <div
                    key={index}
                    className="px-3 pb-2 pt-5 text-xs font-semibold text-slate-400"
                  >
                    {item.label}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    rounded-xl px-3 py-3
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-[#78B33B]/15 text-[#527D27] shadow-sm"
                        : "text-slate-600 hover:bg-[#D8B98A]/35 hover:text-[#6B4A2F]"
                    }
                    `
                  }
                >
                  {/* Icon */}
                  <span
                    className="
                      flex h-8 w-8
                      items-center justify-center
                      rounded-lg
                      text-base
                    "
                  >
                    {item.icon}
                  </span>

                  {/* Label */}
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Administrator */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            {/* Avatar */}
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-[#78B33B]
                text-sm font-bold
                text-white
              "
            >
              A
            </div>

            {/* User information */}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                Administrator
              </p>

              <p className="truncate text-xs text-slate-500">مدير النظام</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
