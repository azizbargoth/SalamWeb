
import { useAuth } from "../../app/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../data/api";

const buttonClass =
  "rounded-lg px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60";
const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#78B33B] focus:ring-2 focus:ring-[#78B33B]/20";

function getErrorMessage(error) {
  return error.response?.data?.message || "تعذر تنفيذ الطلب. حاول مرة أخرى.";
}

export default function AdminHeader({ onMenuClick }) {
  const { user, logout, updateUser } = useAuth();
  const menuRef = useRef(null);
  const fileRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const fullName =
    user?.fullName ||
    user?.name ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Administrator";
  // const avatarUrl =
  //   user?.avatarUrl || user?.avatar || user?.profileImage || user?.image;

  const avatarUrl = user?.avatar_url?.startsWith("/")
    ? `${Api.defaults.baseURL.replace(/\/api\/?$/, "")}${user.avatar_url}`
    : user?.avatar_url;

  const initials =
    fullName
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "A";

  // const fullName =
  //   user?.full_name || user?.name || user?.email || "مدير النظام";
  // const avatarUrl = user?.avatar_url?.startsWith("/")
  //   ? `${Api.defaults.baseURL.replace(/\/api\/?$/, "")}${user.avatar_url}`
  //   : user?.avatar_url;
  // const initials = fullName.trim().charAt(0).toUpperCase() || "A";

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setPasswordOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await Api.post("/auth/change-password", passwords);
      setPasswords({ current_password: "", new_password: "" });
      setMessage("تم تغيير كلمة المرور بنجاح.");
      setPasswordOpen(false);
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setBusy(false);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("يرجى اختيار ملف صورة.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage("يجب ألا يتجاوز حجم الصورة 2 ميغابايت.");
      event.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    setBusy(true);
    setMessage("");
    try {
      const response = await Api.patch("/users/me/avatar", formData);
      const updatedUser = {
        ...user,
        avatar_media_id: response.data.data?.avatar_media_id,
        avatar_url: response.data.data?.avatar_url,
      };
      updateUser(updatedUser);
      setMessage("تم تحديث الصورة الشخصية.");
      setMenuOpen(false);
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  const handleLogout = async () => {
    setBusy(true);
    try {
      await logout();
      navigate("/admin/login", { replace: true });
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setBusy(false);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-white/95 backdrop-blur"
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
              <p className="text-sm font-semibold text-slate-900">
                لوحة الإدارة
              </p>

              <p className="hidden text-xs text-slate-500 sm:block">
                إدارة محتوى موقع Salam
              </p>
            </div>
          </div>

          {/* Left Side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            {/* <button
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
              > */}
            {/* 🔔 */}
            {/* Notification indicator */}
            <div className="hidden text-right sm:block" dir="rtl">
              <p className="max-w-48 truncate text-sm font-semibold text-slate-900">
                {fullName}
              </p>
              <p className="max-w-48 truncate text-xs text-slate-500">
                {user?.role_name || user?.role_code || "مدير النظام"}
              </p>
            </div>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-label="فتح قائمة الحساب"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => {
                  setMenuOpen((open) => !open);
                  setMessage("");
                }}
                className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#78B33B] text-sm font-bold text-white shadow-sm transition hover:bg-[#527D27] hover:shadow-md"
              >
                
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </button>

              {/* Divider */}
              {/* <div className="hidden h-8 w-px bg-slate-200 sm:block" /> */}

              {/* User Information */}
              <div className="hidden text-right sm:block" dir="rtl">
                {/* <p className="text-sm font-semibold text-slate-900">
                    Administrator
                  </p> */}

                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-14 z-40 w-60 rounded-xl border border-slate-200 bg-white p-2 text-right shadow-xl"
                  >
                    <div className="border-b border-slate-100 px-3 py-2">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {fullName}
                      </p>
                      {user?.email && (
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      )}
                    </div>
                    <button
                      role="menuitem"
                      type="button"
                      disabled={busy}
                      onClick={() => fileRef.current?.click()}
                      className="mt-1 w-full rounded-lg px-3 py-2 text-right text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                      تحديث الصورة الشخصية
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                    <button
                      role="menuitem"
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        setPasswordOpen(true);
                        setMenuOpen(false);
                        setMessage("");
                      }}
                      className="w-full rounded-lg px-3 py-2 text-right text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                      تغيير كلمة المرور
                    </button>
                    <button
                      role="menuitem"
                      type="button"
                      disabled={busy}
                      onClick={handleLogout}
                      className="w-full rounded-lg px-3 py-2 text-right text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {message && (
          <p
            role="status"
            className="absolute left-4 top-[5.25rem] z-40 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-md sm:left-6"
          >
            {message}
          </p>
        )}
      </header>
      {passwordOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPasswordOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="password-dialog-title"
            dir="rtl"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2
              id="password-dialog-title"
              className="text-lg font-semibold text-slate-900"
            >
              تغيير كلمة المرور
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              أدخل كلمة المرور الحالية ثم اختر كلمة مرور جديدة.
            </p>
            {message && (
              <p
                role="alert"
                className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {message}
              </p>
            )}
            <form onSubmit={handlePasswordChange} className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                كلمة المرور الحالية
                <input
                  required
                  autoComplete="current-password"
                  type="password"
                  value={passwords.current_password}
                  onChange={(event) =>
                    setPasswords({
                      ...passwords,
                      current_password: event.target.value,
                    })
                  }
                  className={fieldClass}
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                كلمة المرور الجديدة
                <input
                  required
                  autoComplete="new-password"
                  type="password"
                  minLength={8}
                  pattern="(?=.*[A-Za-z])(?=.*\d).{8,72}"
                  title="يجب أن تحتوي على 8 أحرف على الأقل، وحرف ورقم."
                  value={passwords.new_password}
                  onChange={(event) =>
                    setPasswords({
                      ...passwords,
                      new_password: event.target.value,
                    })
                  }
                  className={fieldClass}
                />
              </label>
              <p className="text-xs text-slate-500">
                يجب أن تحتوي كلمة المرور الجديدة على 8 أحرف على الأقل، وحرف
                ورقم.
              </p>
              <div className="flex justify-start gap-2 pt-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setPasswordOpen(false)}
                  className={`${buttonClass} border border-slate-300 text-slate-700 hover:bg-slate-50`}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className={`${buttonClass} bg-[#78B33B] text-white hover:bg-[#527D27]`}
                >
                  {busy ? "جارٍ الحفظ…" : "حفظ كلمة المرور"}
                </button>
              </div>
            </form>
          </section>
          {/* Avatar */}
          {/* <button
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
            {user.data.full_name.slice(0, 1)}
          </button> */}
        </div>
      )}
    </>
  );
}
