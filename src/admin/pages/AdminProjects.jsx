import { useMemo, useState,useEffect } from "react";
import { Link } from "react-router-dom";

import Api from "../../data/api";

const PROJECT_STATUS_LABELS = {
  planned: "مخطط",
  ongoing: "جاري",
  completed: "مكتمل",
  suspended: "موقوف",
};

const VISIBILITY_LABELS = {
  draft: "مسودة",
  scheduled: "مجدول",
  published: "منشور",
  archived: "مؤرشف",
};
const PROJECT_STATUS_FILTERS = [
  { label: "الكل", value: "all" },
  { label: "مخطط", value: "planned" },
  { label: "جاري", value: "ongoing" },
  { label: "مكتمل", value: "completed" },
  { label: "موقوف", value: "suspended" },
];
function mapProject(project) {
  return {
    ...project,
    description: project.summary ?? project.description ?? "",
    image:`${Api.defaults.baseURL.replace(/\/api\/?$/, "")}${project.cover_image}`,
    statusLabel: PROJECT_STATUS_LABELS[project.status] ?? project.status,
    visibilityLabel:
      VISIBILITY_LABELS[project.visibility] ?? project.visibility,
  };
}



function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  // Load API data into the projects state.
  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      setLoading(true);
      setError("");

      try {
        const response = await Api.get("/projects/admin/list", {
          params: { page: 1, limit: 50 },
          signal: controller.signal,
        });
        const rows = response.data?.data ?? [];
        setProjects(rows.map(mapProject));
      } catch (requestError) {
        if (requestError.code !== "ERR_CANCELED") {
          setError("تعذر تحميل المشاريع. تحقق من تسجيل الدخول واتصال الخادم.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadProjects();
    // useEffect returns cleanup, not the project list.
    return () => controller.abort();
  }, [reloadKey]);
  
  // Derive the displayed list from the loaded projects and current filters.
  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch = [
        project.title,
        project.summary,
        project.description,
      ].some((value) => value?.toLowerCase().includes(query));

      // Compare with the backend value, e.g. "ongoing", not its Arabic label.
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  const activeCount = projects.filter(
    (project) => project.status === "نشط",
  ).length;

  const inactiveCount = projects.filter(
    (project) => project.status === "غير نشط",
  ).length;

  const toggleStatus = (id) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id
          ? {
              ...project,
              status: project.status === "نشط" ? "غير نشط" : "نشط",
            }
          : project,
      ),
    );
  };

  async function deleteProject(id) {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا المشروع؟");

    if (!confirmed) return;
    try {
      await Api.delete(`/projects/${id}`);
      setProjects((current) => current + 1);
    } catch {
      setError("تعذر حذف المشروع.");
    }
  }
  async function toggleVisibility(project) {
    const nextVisibility =
      project.visibility === "published" ? "draft" : "published";

    try {
      await Api.patch(`/projects/${project.id}`, {
        visibility: nextVisibility,
      });

      setReloadKey((current) => current + 1);
    } catch {
      setError("تعذر تحديث ظهور المشروع.");
    }
  }

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-[#78B33B]">
                إدارة المحتوى
              </p>

              <h1 className="text-3xl font-bold text-[#3d2a1c]">المشاريع</h1>

              <p className="mt-2 text-slate-500">
                إدارة المشاريع والمبادرات الموجودة في الموقع.
              </p>
            </div>

            <Link
              to="/admin/projects/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#78B33B] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#3d2a1c]"
            >
              <span className="text-xl">+</span>
              إضافة مشروع جديد
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="إجمالي المشاريع" value={projects.length} icon="▦" />

          <StatCard title="المشاريع النشطة" value={activeCount} icon="✓" />

          <StatCard title="غير نشطة" value={inactiveCount} icon="○" />
        </div>

        {/* Search & Filter */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن مشروع..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {PROJECT_STATUS_FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatusFilter(value)}
                  aria-pressed={statusFilter === value}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                    setStatusFilter === label
                      ? "bg-[#78B33B] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-[#3d2a1c] hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}

        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-4xl">⌕</div>

            <h2 className="text-xl font-bold text-slate-800">لا توجد مشاريع</h2>

            <p className="mt-2 text-slate-500">
              لم يتم العثور على مشاريع مطابقة للبحث.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {loading && <p>جارٍ تحميل المشاريع...</p>}
            {error && <p role="alert">{error}</p>}

            {!loading &&
              !error &&
              filteredProjects.map((project) => (
                <article
               
                  key={project.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-200">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />

                    <div className="absolute right-4 top-4">
                      <span
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                          project.statusLabel === "جاري"
                            ? "bg-[#78B33B] text-white"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        {project.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#3d2a1c]">
                      {project.title}
                    </h2>

                    <p className="mt-3 min-h-[72px] text-sm leading-7 text-slate-500">
                      {project.description}
                    </p>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#3d2a1c] hover:text-white"
                      >
                        تعديل
                      </Link>

                      <button
                        type="button"
                        onClick={() => toggleStatus(project.id)}
                        className="rounded-lg bg-[#78B33B]/10 px-4 py-2 text-sm font-semibold text-[#78B33B] transition hover:bg-[#78B33B] hover:text-white"
                      >
                        {project.status === "جاري" ? "تعطيل" : "تفعيل"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteProject(project.id)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold text-[#3d2a1c]">{value}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#78B33B]/10 text-xl font-bold text-[#78B33B]">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default AdminProjects;
