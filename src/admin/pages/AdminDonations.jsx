import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const initialDonations = [
  {
    id: 1,
    donorName: "أحمد محمد",
    email: "ahmad@example.com",
    amount: 500,
    currency: "USD",
    method: "بطاقة ائتمانية",
    date: "2026-10-02",
    status: "مكتمل",
  },
  {
    id: 2,
    donorName: "سارة علي",
    email: "sara@example.com",
    amount: 250,
    currency: "USD",
    method: "تحويل بنكي",
    date: "2026-10-01",
    status: "مكتمل",
  },
  {
    id: 3,
    donorName: "محمد خالد",
    email: "mohammad@example.com",
    amount: 100,
    currency: "USD",
    method: "بطاقة ائتمانية",
    date: "2026-09-30",
    status: "قيد المراجعة",
  },
  {
    id: 4,
    donorName: "نور حسين",
    email: "noor@example.com",
    amount: 750,
    currency: "USD",
    method: "تحويل بنكي",
    date: "2026-09-28",
    status: "مكتمل",
  },
  {
    id: 5,
    donorName: "فاعل خير",
    email: "donor@example.com",
    amount: 300,
    currency: "USD",
    method: "بطاقة ائتمانية",
    date: "2026-09-27",
    status: "ملغي",
  },
];

function AdminDonations() {
  const [donations, setDonations] = useState(initialDonations);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("الكل");

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        donation.donorName.toLowerCase().includes(searchValue) ||
        donation.email.toLowerCase().includes(searchValue) ||
        donation.method.toLowerCase().includes(searchValue);

      const matchesFilter = filter === "الكل" || donation.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [donations, search, filter]);

  const completedCount = donations.filter(
    (donation) => donation.status === "مكتمل",
  ).length;

  const pendingCount = donations.filter(
    (donation) => donation.status === "قيد المراجعة",
  ).length;

  const cancelledCount = donations.filter(
    (donation) => donation.status === "ملغي",
  ).length;

  const totalAmount = donations
    .filter((donation) => donation.status === "مكتمل")
    .reduce((total, donation) => total + donation.amount, 0);

  const cancelDonation = (id) => {
    const confirmed = window.confirm("هل أنت متأكد من إلغاء هذا التبرع؟");

    if (!confirmed) return;

    setDonations((currentDonations) =>
      currentDonations.map((donation) =>
        donation.id === id
          ? {
              ...donation,
              status: "ملغي",
            }
          : donation,
      ),
    );
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#78B33B]">
              الإدارة المالية
            </p>

            <h1 className="text-3xl font-bold text-[#3d2a1c]">التبرعات</h1>

            <p className="mt-2 text-slate-500">
              إدارة ومتابعة التبرعات الواردة إلى المؤسسة.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="إجمالي التبرعات"
            value={`${totalAmount.toLocaleString()} USD`}
            icon="$"
          />

          <StatCard title="التبرعات المكتملة" value={completedCount} icon="✓" />

          <StatCard title="قيد المراجعة" value={pendingCount} icon="○" />

          <StatCard title="الملغاة" value={cancelledCount} icon="×" />
        </div>

        {/* Search & Filter */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث باسم المتبرع أو البريد الإلكتروني..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["الكل", "مكتمل", "قيد المراجعة", "ملغي"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                    filter === item
                      ? "bg-[#78B33B] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-[#3d2a1c] hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Donations */}
        {filteredDonations.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-4xl">$</div>

            <h2 className="text-xl font-bold text-slate-800">لا توجد تبرعات</h2>

            <p className="mt-2 text-slate-500">
              لم يتم العثور على تبرعات مطابقة للبحث.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-right">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      المتبرع
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      المبلغ
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      طريقة الدفع
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      التاريخ
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      الحالة
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      الإجراءات
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredDonations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                    >
                      {/* Donor */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-[#3d2a1c]">
                            {donation.donorName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {donation.email}
                          </p>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-5">
                        <span className="font-bold text-[#78B33B]">
                          {donation.amount.toLocaleString()} {donation.currency}
                        </span>
                      </td>

                      {/* Method */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {donation.method}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {donation.date}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <StatusBadge status={donation.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/admin/donations/${donation.id}`}
                            className="rounded-lg bg-[#78B33B] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3d2a1c]"
                          >
                            عرض
                          </Link>

                          {donation.status !== "ملغي" && (
                            <button
                              type="button"
                              onClick={() => cancelDonation(donation.id)}
                              className="rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                            >
                              إلغاء
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

          <p className="mt-2 text-2xl font-bold text-[#3d2a1c]">{value}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#78B33B]/10 text-xl font-bold text-[#78B33B]">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusClasses = {
    مكتمل: "bg-[#78B33B]/10 text-[#78B33B]",
    "قيد المراجعة": "bg-amber-50 text-amber-600",
    ملغي: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        statusClasses[status] || "bg-slate-100 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}

export default AdminDonations;
