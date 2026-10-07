import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const messagesData = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmad@example.com",
    subject: "استفسار حول البرامج",
    message:
      "السلام عليكم، أود الاستفسار عن البرامج والمبادرات التي تقدمها المؤسسة وكيف يمكنني الاستفادة منها.",
    date: "2026-10-02",
    time: "10:30",
    status: "غير مقروءة",
  },
  {
    id: 2,
    name: "سارة علي",
    email: "sara@example.com",
    subject: "طلب معلومات",
    message:
      "مرحبًا، أود الحصول على مزيد من المعلومات حول المشاريع الحالية وطرق المساهمة فيها.",
    date: "2026-10-01",
    time: "15:20",
    status: "مقروءة",
  },
  {
    id: 3,
    name: "محمد خالد",
    email: "mohammad@example.com",
    subject: "استفسار عن التبرع",
    message:
      "أرغب في معرفة طرق التبرع المتاحة والمعلومات المطلوبة لإتمام عملية التبرع.",
    date: "2026-09-30",
    time: "09:45",
    status: "غير مقروءة",
  },
  {
    id: 4,
    name: "نور حسين",
    email: "noor@example.com",
    subject: "تواصل مع المؤسسة",
    message:
      "أرغب في التواصل مع فريق المؤسسة بخصوص أحد المشاريع والمبادرات المجتمعية.",
    date: "2026-09-28",
    time: "12:10",
    status: "مقروءة",
  },
];

function AdminMessageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const messageId = Number(id);

  const message = messagesData.find((item) => item.id === messageId);

  const [status, setStatus] = useState(message?.status || "غير مقروءة");

  if (!message) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-5xl">✉</div>

            <h1 className="text-2xl font-bold text-[#3d2a1c]">
              الرسالة غير موجودة
            </h1>

            <p className="mt-3 text-slate-500">
              لم يتم العثور على الرسالة المطلوبة.
            </p>

            <Link
              to="/admin/messages"
              className="mt-6 inline-flex rounded-xl bg-[#78B33B] px-6 py-3 font-semibold text-white transition hover:bg-[#3d2a1c]"
            >
              العودة إلى الرسائل
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const toggleStatus = () => {
    setStatus((currentStatus) =>
      currentStatus === "غير مقروءة" ? "مقروءة" : "غير مقروءة",
    );
  };

  const deleteMessage = () => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذه الرسالة؟");

    if (!confirmed) return;

    navigate("/admin/messages");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-[#78B33B]">
                إدارة التواصل
              </p>

              <h1 className="text-3xl font-bold text-[#3d2a1c]">
                تفاصيل الرسالة
              </h1>

              <p className="mt-2 text-slate-500">
                عرض تفاصيل الرسالة الواردة من زائر الموقع.
              </p>
            </div>

            <Link
              to="/admin/messages"
              className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#3d2a1c] hover:text-white"
            >
              العودة إلى الرسائل
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* Message Header */}
          <div className="border-b border-slate-100 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-[#3d2a1c]">
                    {message.subject}
                  </h2>

                  <span
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                      status === "غير مقروءة"
                        ? "bg-[#78B33B]/10 text-[#78B33B]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  {message.date} - {message.time}
                </p>
              </div>
            </div>
          </div>

          {/* Sender Information */}
          <div className="grid gap-4 border-b border-slate-100 p-6 md:grid-cols-2 md:p-8">
            <InfoCard label="اسم المرسل" value={message.name} />

            <InfoCard label="البريد الإلكتروني" value={message.email} />
          </div>

          {/* Message Content */}
          <div className="p-6 md:p-8">
            <p className="mb-4 text-sm font-semibold text-[#78B33B]">
              محتوى الرسالة
            </p>

            <div className="min-h-[220px] rounded-2xl bg-slate-50 p-6">
              <p className="whitespace-pre-line text-sm leading-8 text-slate-700">
                {message.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-6 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={toggleStatus}
              className="rounded-xl bg-[#78B33B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3d2a1c]"
            >
              {status === "غير مقروءة" ? "تحديد كمقروءة" : "تحديد كغير مقروءة"}
            </button>

            <button
              type="button"
              onClick={deleteMessage}
              className="rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              حذف الرسالة
            </button>

            <Link
              to="/admin/messages"
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

export default AdminMessageDetails;
