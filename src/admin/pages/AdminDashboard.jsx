
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../data/api";

const recentActivity = [
  {
    title: "مرحبًا بك في لوحة إدارة Salam",
    description: "سيظهر هنا النشاط الأخير للموقع.",
    time: "الآن",
  },
  {
    title: "إدارة المحتوى",
    description: "يمكنك من القائمة الجانبية إدارة الأخبار والبرامج والمشاريع.",
    time: "—",
  },
  {
    title: "الإعدادات",
    description: "سيتم إضافة إعدادات الموقع في المرحلة القادمة.",
    time: "—",
  },
];

// ✅ ADD: request only one row; the API returns the full count in meta.total.
  async function fetchTotal(endpoint, signal) {
    const response = await Api.get(endpoint, {
      params: { page: 1, limit: 1 },
      signal,
    });

    return response.data?.meta?.total ?? 0;
  }

  const emptyOverview = {
    posts: null,
    projects: null,
    sectors: null,
    messages: null,
  };

export default function AdminDashboard() {
  

  // ✅ ADD: keep dashboard counts in state so they update when the API responds.
  const [overview, setOverview] = useState(emptyOverview);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // ✅ ADD: cancel a previous refresh or the request when the page unmounts.
  const requestControllerRef = useRef(null);

  // ✅ ADD: fetch each count together; a failed endpoint won't hide the other counts.
  const refreshOverview = useCallback(async () => {
    requestControllerRef.current?.abort();

    const controller = new AbortController();
    requestControllerRef.current = controller;

    setLoading(true);
    setLoadError("");

    const endpoints = [
      ["posts", "/posts/admin/list"],
      ["projects", "/projects/admin/list"],
      ["sectors", "/sectors/admin/list"],
      ["messages", "/contact"],
    ];

    const results = await Promise.allSettled(
      endpoints.map(async ([key, endpoint]) => [
        key,
        await fetchTotal(endpoint, controller.signal),
      ]),
    );
    // Ignore results from a refresh that was canceled or replaced.
    if (controller.signal.aborted) return;

    const nextOverview = { ...emptyOverview };

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        const [key, total] = result.value;
        nextOverview[key] = total;
      }
    });

    setOverview(nextOverview);
    setLoadError(
      results.some((result) => result.status === "rejected")
        ? "تعذر تحميل بعض الإحصائيات."
        : "",
    );
    setLoading(false);
  }, []);

  // ✅ ADD: load counts when the dashboard opens and cancel requests on exit.
 useEffect(() => {
   void refreshOverview(); // Load counts when the page opens.

   const intervalId = window.setInterval(() => {
     void refreshOverview(); // Refresh counts every 60 seconds.
   }, 60_000);

   return () => {
     window.clearInterval(intervalId);
     requestControllerRef.current?.abort();
   };
 }, [refreshOverview]);

  // ✅ ADD: build the cards from API data. “القطاعات” maps to the backend
  // sectors endpoint; change it only if your program data is stored elsewhere.
  const stats = useMemo(
    () => [
      {
        title: "الأخبار",
        value: overview.posts ?? (loading ? "…" : "—"),
        description: "إجمالي المنشورات",
        icon: "▤",
      },
      {
        title: "المشاريع",
        value: overview.projects ?? (loading ? "…" : "—"),
        description: "إجمالي المشاريع",
        icon: "◇",
      },
      {
        title: "القطاعات",
        value: overview.sectors ?? (loading ? "…" : "—"),
        description: "إجمالي القطاعات",
        icon: "◫",
      },
      {
        title: "الرسائل",
        value: overview.messages ?? (loading ? "…" : "—"),
        description: "إجمالي الرسائل",
        icon: "✉",
      },
    ],
    [overview, loading],
  );

  return (
    <div className="space-y-8" dir="rtl">
      {/* Page Heading */}
      <div>
        <p className="mb-2 text-sm font-medium text-[#78B33B]">نظرة عامة</p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          لوحة التحكم
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          مرحبًا بك في لوحة إدارة موقع Salam. من هنا يمكنك إدارة محتوى الموقع.
        </p>
        {/* ✅ ADD: allow the admin to refresh counts without reloading the page. */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={refreshOverview}
            disabled={loading}
            aria-busy={loading}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-60"
          >
            {loading ? "جارٍ التحديث..." : "تحديث الإحصائيات"}
          </button>

          {loadError && (
            <p role="status" className="text-sm text-amber-700">
              {loadError}
            </p>
          )}
        </div>
      </div>

      {/* Statistics */}
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="
                group
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-[#D8B98A]
                hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    bg-[#78B33B]/10
                    text-lg
                    text-[#78B33B]
                    transition
                    group-hover:bg-[#78B33B]
                    group-hover:text-white
                  "
                >
                  {stat.icon}
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Welcome */}
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            bg-[#78B33B]
            p-6
            text-white
            shadow-sm
            xl:col-span-2
          "
        >
          {/* Decorative circle */}
          <div
            className="
              absolute
              -left-16
              -top-16
              h-40
              w-40
              rounded-full
              bg-white/10
            "
          />

          <div className="relative">
            <p className="text-sm font-medium text-white/80">مرحبًا بك</p>

            <h2 className="mt-2 text-xl font-bold">
              إدارة موقع Salam أصبحت أسهل
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
              استخدم لوحة التحكم لإدارة الأخبار والبرامج والمشاريع وبقية محتوى
              الموقع. سيتم تطوير كل قسم تدريجيًا وربطه بالبيانات الفعلية.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="
                  rounded-xl
                  bg-white
                  px-4 py-2.5
                  text-sm font-semibold
                  text-[#527D27]
                  transition
                  hover:bg-[#F5E9D8]
                "
              >
                إدارة المحتوى
              </button>

              <button
                type="button"
                className="
                  rounded-xl
                  border border-white/60
                  px-4 py-2.5
                  text-sm font-semibold
                  text-white
                  transition
                  hover:bg-[#D8B98A]/30
                "
              >
                إعدادات الموقع
              </button>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div
          className="
            rounded-2xl
            border border-slate-200
            bg-white
            p-6
            shadow-sm
          "
        >
          <h2 className="text-base font-bold text-slate-900">الوصول السريع</h2>

          <div className="mt-5 space-y-2">
            <QuickLink icon="▤" title="الأخبار"   description="إدارة أخبار الموقع"/>
            <QuickLink icon="◫" title="البرامج"  description="إدارة البرامج" />
            <QuickLink icon="▱" title="المشاريع" description="إدارة المشاريع" />
            <QuickLink icon="⚙" title="الإعدادات" description="إعدادات الموقع" />
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section
        className="
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-base font-bold text-slate-900">النشاط الأخير</h2>

          <p className="mt-1 text-sm text-slate-500">
            آخر التحديثات والنشاطات في لوحة الإدارة.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {recentActivity.map((activity) => (
            <div
              key={activity.title}
              className="
                flex items-start gap-4
                px-6 py-5
                transition
                hover:bg-[#D8B98A]/10
              "
            >
              <div
                className="
                  mt-1
                  flex h-9 w-9
                  shrink-0
                  items-center justify-center
                  rounded-full
                  bg-[#78B33B]/10
                  text-sm
                  font-bold
                  text-[#78B33B]
                "
              >
                •
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {activity.title}
                  </h3>

                  <span className="text-xs text-slate-400">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ✅ REPLACE: use a Link because each quick-access item navigates to a page.
function QuickLink({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="group flex w-full items-center gap-3 rounded-xl p-3 text-right transition hover:bg-[#D8B98A]/15"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#78B33B]/10 text-[#78B33B] transition group-hover:bg-[#78B33B] group-hover:text-white">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </Link>
  );
}
