import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../data/api";
import { getMediaUrl } from "../../app/AuthContext";
import { notefyError, notefySuccess } from "../../js/Tosats";

const PARTNER_TYPES = [
  { value: "donor", label: "جهة مانحة" },
  { value: "partner", label: "شريك" },
  { value: "network", label: "شبكة" },
  { value: "government", label: "جهة حكومية" },
];

function getApiErrorMessage(error) {
  const details = error.response?.data?.details ?? error.response?.data?.errors;

  if (Array.isArray(details) && details.length > 0) {
    return details
      .map((item) =>
        item.field ? `${item.field}: ${item.message}` : item.message,
      )
      .join(" • ");
  }

  return (
    error.response?.data?.message ||
    error.message ||
    "تعذر تنفيذ الطلب. حاول مرة أخرى."
  );
}

const AdminPartners = () => {
  const [partners, setPartners] = useState([]);
  const [meta, setMeta] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [busyId, setBusyId] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Load partners, including inactive records, for the admin list.
  useEffect(() => {
    const controller = new AbortController();

    async function loadPartners() {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await Api.get("/partners/admin/list", {
          params: { page: 1, limit: 100, lang: "ar" },
          signal: controller.signal,
        });

        setPartners(response.data?.data ?? []);
        setMeta(response.data?.meta ?? null);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setErrorMessage(getApiErrorMessage(error));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadPartners();
    return () => controller.abort();
  }, [reloadKey]);

  // Filter the loaded list for the current search and selections.
  const filteredPartners = useMemo(() => {
    const query = search.trim().toLowerCase();

    return partners.filter((partner) => {
      const matchesSearch = [
        partner.name,
        partner.description,
        partner.website_url,
      ].some((value) => value?.toLowerCase().includes(query));

      const matchesType =
        typeFilter === "all" || partner.type === typeFilter;

      const matchesActive =
        activeFilter === "all" ||
        partner.is_active === (activeFilter === "active");

      return matchesSearch && matchesType && matchesActive;
    });
  }, [partners, search, typeFilter, activeFilter]);

  // Persist active/inactive changes to the backend.
  async function toggleActive(partner) {
    setBusyId(partner.id);
    setErrorMessage("");

    try {
      const nextActive = !partner.is_active;

      await Api.patch(`/partners/${partner.id}`, {
        is_active: nextActive,
      });

      setPartners((current) =>
        current.map((item) =>
          item.id === partner.id
            ? { ...item, is_active: nextActive }
            : item,
        ),
      );

      notefySuccess(
        nextActive ? "تم تفعيل الشريك." : "تم إيقاف الشريك.",
      );
    } catch (error) {
      const message = getApiErrorMessage(error);
      setErrorMessage(message);
      notefyError(message);
    } finally {
      setBusyId(null);
    }
  }

  // Delete a partner after confirmation.
  async function deletePartner(partner) {
    if (!window.confirm(`هل تريد حذف "${partner.name}"؟`)) return;

    setBusyId(partner.id);
    setErrorMessage("");

    try {
      await Api.delete(`/partners/${partner.id}`);

      setPartners((current) =>
        current.filter((item) => item.id !== partner.id),
      );

      setMeta((current) =>
        current
          ? { ...current, total: Math.max((current.total ?? 1) - 1, 0) }
          : current,
      );

      notefySuccess("تم حذف الشريك.");
    } catch (error) {
      const message = getApiErrorMessage(error);
      setErrorMessage(message);
      notefyError(message);
    } finally {
      setBusyId(null);
    }
  }

  const activeCount = partners.filter((item) => item.is_active).length;
  const inactiveCount = partners.filter((item) => !item.is_active).length;
  const homeCount = partners.filter((item) => item.show_on_home).length;

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Page heading and create action. */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-[#78B33B]">
                إدارة المحتوى
              </p>

              <h1 className="text-3xl font-bold text-[#3d2a1c]">الشركاء</h1>

              <p className="mt-2 text-slate-500">
                إدارة الجهات المانحة والشركاء والشبكات.
              </p>
            </div>

            <Link
              to="/admin/partners/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#78B33B] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#3d2a1c]"
            >
              <span className="text-xl">+</span>
              إضافة شريك
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Summary cards show counts for the loaded page. */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="إجمالي الشركاء" value={meta?.total ?? partners.length} />
          <StatCard title="نشط" value={activeCount} />
          <StatCard title="غير نشط" value={inactiveCount} />
          <StatCard title="ظاهر على الرئيسية" value={homeCount} />
        </div>

        {/* Search and filters. */}
        <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="ابحث عن شريك..."
              aria-label="ابحث عن شريك"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#78B33B]"
            />

            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              aria-label="تصفية حسب نوع الشريك"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#78B33B]"
            >
              <option value="all">كل الأنواع</option>
              {PARTNER_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              aria-label="تصفية حسب الحالة"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#78B33B]"
            >
              <option value="all">كل الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </section>

        {/* Loading and API error states. */}
        {loading && (
          <p role="status" className="py-10 text-center text-slate-600">
            جارٍ تحميل الشركاء...
          </p>
        )}

        {!loading && errorMessage && (
          <p
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {errorMessage}
          </p>
        )}

        {/* Partner cards. */}
        {!loading &&
          !errorMessage &&
          (filteredPartners.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="text-xl font-bold text-slate-800">
                لا يوجد شركاء
              </h2>
              <p className="mt-2 text-slate-500">
                لم يتم العثور على شركاء مطابقين للبحث أو التصفية.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPartners.map((partner) => {
                const typeLabel =
                  PARTNER_TYPES.find((type) => type.value === partner.type)
                    ?.label ?? partner.type;

                const logoUrl = partner.logo_url
                  ? getMediaUrl(partner.logo_url)
                  : "";

                return (
                  <article
                    key={partner.id}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm"
                  >
                    <div className="flex h-48 items-center justify-center bg-slate-100 p-6">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={`شعار ${partner.name}`}
                          loading="lazy"
                          decoding="async"
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-5xl text-slate-400" aria-hidden>
                          🤝
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {typeLabel}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            partner.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {partner.is_active ? "نشط" : "غير نشط"}
                        </span>
                        {partner.show_on_home && (
                          <span className="rounded-full bg-[#78B33B]/10 px-3 py-1 text-xs font-semibold text-[#527D27]">
                            الرئيسية
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-bold text-[#3d2a1c]">
                        {partner.name}
                      </h2>

                      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                        {partner.description || "لا يوجد وصف."}
                      </p>

                      {partner.website_url && (
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block break-all text-sm font-semibold text-[#527D27] hover:underline"
                        >
                          {partner.website_url}
                        </a>
                      )}

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                        <Link
                          to={`/admin/partners/edit/${partner.id}`}
                          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-[#3d2a1c] hover:text-white"
                        >
                          تعديل
                        </Link>

                        <button
                          type="button"
                          disabled={busyId === partner.id}
                          onClick={() => void toggleActive(partner)}
                          className="rounded-lg bg-[#78B33B]/10 px-4 py-2 text-sm font-semibold text-[#527D27] hover:bg-[#78B33B] hover:text-white disabled:opacity-60"
                        >
                          {partner.is_active ? "إيقاف" : "تفعيل"}
                        </button>

                        <button
                          type="button"
                          disabled={busyId === partner.id}
                          onClick={() => void deletePartner(partner)}
                          className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-60"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
      </section>
    </main>
  );
};

export default AdminPartners;



function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-bold text-[#3d2a1c]">{value}</p>
    </div>
  );
}