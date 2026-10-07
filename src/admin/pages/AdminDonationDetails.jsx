import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const donationsData = [
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

function AdminDonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const donationId = Number(id);

  const donation = donationsData.find((item) => item.id === donationId);

  const [status, setStatus] = useState(donation?.status || "قيد المراجعة");

  if (!donation) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-5xl">$</div>

            <h1 className="text-2xl font-bold text-[#3d2a1c]">
              التبرع غير موجود
            </h1>

            <p className="mt-3 text-slate-500">
              لم يتم العثور على التبرع المطلوب.
            </p>

            <Link
              to="/admin/donations"
              className="mt-6 inline-flex rounded-xl bg-[#78B33B] px-6 py-3 font-semibold text-white transition hover:bg-[#3d2a1c]"
            >
              العودة إلى التبرعات
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const cancelDonation = () => {
    const confirmed = window.confirm("هل أنت متأكد من إلغاء هذا التبرع؟");

    if (!confirmed) return;

    setStatus("ملغي");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-[#78B33B]">
                الإدارة المالية
              </p>

              <h1 className="text-3xl font-bold text-[#3d2a1c]">
                تفاصيل التبرع
              </h1>

              <p className="mt-2 text-slate-500">
                عرض تفاصيل التبرع ومعلومات المتبرع.
              </p>
            </div>

            <Link
              to="/admin/donations"
              className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#3d2a1c] hover:text-white"
            >
              العودة إلى التبرعات
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* Donation Header */}
          <div className="border-b border-slate-100 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">مبلغ التبرع</p>

                <p className="mt-2 text-4xl font-bold text-[#78B33B]">
                  {donation.amount.toLocaleString()} {donation.currency}
                </p>
              </div>

              <StatusBadge status={status} />
            </div>
          </div>

          {/* Donor Information */}
          <div className="grid gap-4 border-b border-slate-100 p-6 md:grid-cols-2 md:p-8">
            <InfoCard label="اسم المتبرع" value={donation.donorName} />

            <InfoCard label="البريد الإلكتروني" value={donation.email} />

            <InfoCard label="طريقة الدفع" value={donation.method} />

            <InfoCard label="تاريخ التبرع" value={donation.date} />
          </div>

          {/* Donation Summary */}
          <div className="p-6 md:p-8">
            <p className="mb-4 text-sm font-semibold text-[#78B33B]">
              ملخص التبرع
            </p>

            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-sm text-slate-500">المبلغ</span>

                <span className="font-bold text-[#3d2a1c]">
                  {donation.amount.toLocaleString()} {donation.currency}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-slate-500">الحالة</span>

                <StatusBadge status={status} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-6 sm:flex-row sm:flex-wrap">
            {status !== "ملغي" && (
              <button
                type="button"
                onClick={cancelDonation}
                className="rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                إلغاء التبرع
              </button>
            )}

            <Link
              to="/admin/donations"
              className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-[#3d2a1c] hover:text-white"
            >
              العودة
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-400">{label}</p>

      <p className="mt-2 break-words text-sm font-semibold text-[#3d2a1c]">
        {value}
      </p>
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
      className={`rounded-full px-4 py-2 text-xs font-semibold ${
        statusClasses[status] || "bg-slate-100 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}

export default AdminDonationDetails;
