import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const initialMessages = [
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

function AdminMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("الكل");

  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        message.name.toLowerCase().includes(searchValue) ||
        message.email.toLowerCase().includes(searchValue) ||
        message.subject.toLowerCase().includes(searchValue) ||
        message.message.toLowerCase().includes(searchValue);

      const matchesFilter = filter === "الكل" || message.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [messages, search, filter]);

  const unreadCount = messages.filter(
    (message) => message.status === "غير مقروءة",
  ).length;

  const readCount = messages.filter(
    (message) => message.status === "مقروءة",
  ).length;

  const toggleReadStatus = (id) => {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === id
          ? {
              ...message,
              status: message.status === "غير مقروءة" ? "مقروءة" : "غير مقروءة",
            }
          : message,
      ),
    );
  };

  const deleteMessage = (id) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذه الرسالة؟");

    if (!confirmed) return;

    setMessages((currentMessages) =>
      currentMessages.filter((message) => message.id !== id),
    );
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#78B33B]">
              إدارة التواصل
            </p>

            <h1 className="text-3xl font-bold text-[#3d2a1c]">الرسائل</h1>

            <p className="mt-2 text-slate-500">
              إدارة الرسائل والاستفسارات الواردة من زوار الموقع.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="إجمالي الرسائل" value={messages.length} icon="▦" />

          <StatCard title="غير مقروءة" value={unreadCount} icon="●" />

          <StatCard title="مقروءة" value={readCount} icon="✓" />
        </div>

        {/* Search & Filter */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث في الرسائل..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["الكل", "غير مقروءة", "مقروءة"].map((item) => (
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

        {/* Messages */}
        {filteredMessages.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-4xl">✉</div>

            <h2 className="text-xl font-bold text-slate-800">لا توجد رسائل</h2>

            <p className="mt-2 text-slate-500">
              لم يتم العثور على رسائل مطابقة للبحث.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <article
                key={message.id}
                className={`rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md ${
                  message.status === "غير مقروءة"
                    ? "border-r-4 border-[#78B33B]"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Message Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-[#3d2a1c]">
                        {message.subject}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          message.status === "غير مقروءة"
                            ? "bg-[#78B33B]/10 text-[#78B33B]"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {message.status}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                      <span>{message.name}</span>
                      <span>{message.email}</span>
                      <span>
                        {message.date} - {message.time}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-500">
                      {message.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 lg:shrink-0">
                    <Link
                      to={`/admin/messages/${message.id}`}
                      className="rounded-lg bg-[#78B33B] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d2a1c]"
                    >
                      عرض الرسالة
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleReadStatus(message.id)}
                      className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#3d2a1c] hover:text-white"
                    >
                      {message.status === "غير مقروءة"
                        ? "تحديد كمقروءة"
                        : "تحديد كغير مقروءة"}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteMessage(message.id)}
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

export default AdminMessages;
