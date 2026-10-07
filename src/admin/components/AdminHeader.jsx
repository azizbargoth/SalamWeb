export default function AdminHeader({ onMenuClick }) {
  return (
    <header
      className="
        sticky top-0 z-30
        h-20
        border-b border-slate-200
        bg-white/95
        backdrop-blur
      "
      dir="rtl"
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="فتح القائمة"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-slate-200
              text-slate-600
              transition
              hover:border-[#D8B98A]
              hover:bg-[#D8B98A]/20
              hover:text-[#6B4A2F]
              lg:hidden
            "
          >
            ☰
          </button>

          {/* Page Information */}
          <div>
            <p className="text-sm font-semibold text-slate-900">لوحة الإدارة</p>

            <p className="hidden text-xs text-slate-500 sm:block">
              إدارة محتوى موقع Salam
            </p>
          </div>
        </div>

        {/* Left Side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            type="button"
            aria-label="الإشعارات"
            className="
              relative
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              text-slate-500
              transition
              hover:bg-[#D8B98A]/20
              hover:text-[#6B4A2F]
            "
          >
            🔔
            {/* Notification indicator */}
            <span
              className="
                absolute
                right-2
                top-2
                h-1.5
                w-1.5
                rounded-full
                bg-[#78B33B]
              "
            />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* User Information */}
          <div className="hidden text-right sm:block" dir="rtl">
            <p className="text-sm font-semibold text-slate-900">
              Administrator
            </p>

            <p className="text-xs text-slate-500">مدير النظام</p>
          </div>

          {/* Avatar */}
          <button
            type="button"
            aria-label="حساب المدير"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              bg-[#78B33B]
              text-sm font-bold
              text-white
              shadow-sm
              transition
              hover:bg-[#527D27]
              hover:shadow-md
            "
          >
            A
          </button>
        </div>
      </div>
    </header>
  );
}
