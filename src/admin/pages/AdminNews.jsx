import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const initialNews = [
  {
    id: 1,
    title: "منظمة السلام تطلق مبادرة جديدة لدعم المجتمع",
    description:
      "مبادرة جديدة تهدف إلى دعم المجتمع وتعزيز التعاون وتنفيذ برامج ذات أثر مستدام.",
    category: "مجتمعي",
    date: "2026-09-28",
    image: "/images/news/news-1.jpg",
    status: "منشور",
  },
  {
    id: 2,
    title: "استمرار برامج الدعم والمساعدات الإنسانية",
    description:
      "تواصل منظمة السلام تنفيذ برامجها الإنسانية والوصول إلى الفئات الأكثر احتياجًا.",
    category: "إنساني",
    date: "2026-09-24",
    image: "/images/news/news-2.jpg",
    status: "منشور",
  },
  {
    id: 3,
    title: "إطلاق برنامج جديد لتمكين الشباب",
    description:
      "برنامج يركز على تطوير مهارات الشباب وفتح فرص جديدة للمشاركة والتنمية.",
    category: "شباب",
    date: "2026-09-20",
    image: "/images/news/news-3.jpg",
    status: "مسودة",
  },
];

function AdminNews() {
  const [news, setNews] = useState(initialNews);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("الكل");

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "الكل" || item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [news, search, filter]);

  const publishedCount = news.filter((item) => item.status === "منشور").length;

  const draftCount = news.filter((item) => item.status === "مسودة").length;

  const categoriesCount = new Set(news.map((item) => item.category)).size;

  const toggleStatus = (id) => {
    setNews((currentNews) =>
      currentNews.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "منشور" ? "مسودة" : "منشور",
            }
          : item,
      ),
    );
  };

  const deleteNews = (id) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا الخبر؟");

    if (!confirmed) return;

    setNews((currentNews) => currentNews.filter((item) => item.id !== id));
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#3d2a1c]">الأخبار</h1>

              <p className="mt-2 text-slate-500">إدارة أخبار ومحتوى الموقع</p>
            </div>

            <Link
              to="/admin/news/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#78B33B] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#3d2a1c]"
            >
              <span className="text-xl">+</span>
              إضافة خبر جديد
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="إجمالي الأخبار" value={news.length} />

          <StatCard title="الأخبار المنشورة" value={publishedCount} green />

          <StatCard title="المسودات" value={draftCount} />

          <StatCard title="التصنيفات" value={categoriesCount} />
        </div>

        {/* Search & Filter */}
        <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن خبر..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm outline-none transition focus:border-[#78B33B] focus:ring-2 focus:ring-[#78B33B]/20"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {["الكل", "منشور", "مسودة"].map((item) => (
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

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Category */}
                  <span className="absolute right-5 top-5 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#3d2a1c] shadow-sm">
                    {item.category}
                  </span>

                  {/* Status */}
                  <span
                    className={`absolute left-5 top-5 rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm ${
                      item.status === "منشور"
                        ? "bg-[#78B33B] text-white"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>

                  {/* Date */}
                  <div className="absolute bottom-5 right-5 text-sm text-white/90">
                    {item.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="mb-3 text-xl font-bold leading-8 text-[#3d2a1c]">
                    {item.title}
                  </h2>

                  <p className="mb-6 line-clamp-2 text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                    <Link
                      to={`/news/${item.id}`}
                      target="_blank"
                      className="font-semibold text-[#3d2a1c] transition hover:text-[#78B33B]"
                    >
                      عرض الخبر ←
                    </Link>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/admin/news/edit/${item.id}`}
                        className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#3d2a1c] hover:text-white"
                      >
                        تعديل
                      </Link>

                      <button
                        type="button"
                        onClick={() => toggleStatus(item.id)}
                        className="rounded-lg bg-[#78B33B]/10 px-4 py-2 text-sm font-semibold text-[#5f922d] transition hover:bg-[#78B33B] hover:text-white"
                      >
                        {item.status === "منشور" ? "تحويل لمسودة" : "نشر"}
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteNews(item.id)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">
            <div className="mb-4 text-5xl">📰</div>

            <h2 className="mb-2 text-2xl font-bold text-[#3d2a1c]">
              لا توجد أخبار
            </h2>

            <p className="text-slate-500">
              لم يتم العثور على أخبار مطابقة للبحث أو الفلتر المحدد.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function StatCard({ title, value, green = false }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p
            className={`mt-2 text-3xl font-bold ${
              green ? "text-[#78B33B]" : "text-[#3d2a1c]"
            }`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            green
              ? "bg-[#78B33B]/10 text-[#78B33B]"
              : "bg-[#3d2a1c]/10 text-[#3d2a1c]"
          }`}
        >
          📰
        </div>
      </div>
    </div>
  );
}

export default AdminNews;
