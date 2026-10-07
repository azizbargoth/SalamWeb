import { useMemo, useState } from "react";
import { Link } from "react-router-dom";



function AdminPrograms() {
  const initialPrograms = [
    {
      id: 1,
      title: "المساعدات الإنسانية",
      description:
        "برامج تهدف إلى تقديم الدعم والمساعدة للفئات الأكثر احتياجًا وتحسين ظروفهم المعيشية.",
      image: "/images/programs/humanitarian.jpg",
      status: "نشط",
    },
    {
      id: 2,
      title: "دعم المجتمع",
      description:
        "مبادرات مجتمعية تهدف إلى تعزيز التعاون ودعم أفراد المجتمع وتنمية روح المشاركة.",
      image: "/images/programs/community-support.jpg",
      status: "نشط",
    },
    {
      id: 3,
      title: "التنمية المستدامة",
      description:
        "برامج ومبادرات تركز على التنمية المستدامة وتحقيق أثر إيجابي طويل الأمد.",
      image: "/images/programs/sustainable-development.jpg",
      status: "نشط",
    },
    {
      id: 4,
      title: "تمكين الشباب",
      description:
        "برامج تهدف إلى تطوير مهارات الشباب ورفع قدراتهم وفتح فرص جديدة أمامهم.",
      image: "/images/programs/youth-empowerment.jpg",
      status: "نشط",
    },
  ];
  const [programs, setPrograms] = useState(initialPrograms);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("الكل");

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        program.title.toLowerCase().includes(searchValue) ||
        program.description.toLowerCase().includes(searchValue);

      const matchesFilter = filter === "الكل" || program.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [programs, search, filter]);

  const activeCount = programs.filter(
    (program) => program.status === "نشط",
  ).length;

  const inactiveCount = programs.filter(
    (program) => program.status === "غير نشط",
  ).length;

  const toggleStatus = (id) => {
    setPrograms((currentPrograms) =>
      currentPrograms.map((program) =>
        program.id === id
          ? {
              ...program,
              status: program.status === "نشط" ? "غير نشط" : "نشط",
            }
          : program,
      ),
    );
  };

  const deleteProgram = (id) => {
    const confirmed = window.confirm("هل أنت متأكد من حذف هذا البرنامج؟");

    if (!confirmed) return;

    setPrograms((currentPrograms) =>
      currentPrograms.filter((program) => program.id !== id),
    );
  };

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

              <h1 className="text-3xl font-bold text-[#3d2a1c]">البرامج</h1>

              <p className="mt-2 text-slate-500">
                إدارة البرامج والمبادرات الموجودة في الموقع.
              </p>
            </div>

            <Link
              to="/admin/programs/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#78B33B] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#3d2a1c]"
            >
              <span className="text-xl">+</span>
              إضافة برنامج جديد
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="إجمالي البرامج" value={programs.length} icon="▦" />

          <StatCard title="البرامج النشطة" value={activeCount} icon="✓" />

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
                placeholder="ابحث عن برنامج..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["الكل", "نشط", "غير نشط"].map((item) => (
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

        {/* Programs */}
        {filteredPrograms.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="mb-4 text-4xl">⌕</div>

            <h2 className="text-xl font-bold text-slate-800">لا توجد برامج</h2>

            <p className="mt-2 text-slate-500">
              لم يتم العثور على برامج مطابقة للبحث.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPrograms.map((program) => (
              <article
                key={program.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />

                  <div className="absolute right-4 top-4">
                    <span
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                        program.status === "نشط"
                          ? "bg-[#78B33B] text-white"
                          : "bg-slate-700 text-white"
                      }`}
                    >
                      {program.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#3d2a1c]">
                    {program.title}
                  </h2>

                  <p className="mt-3 min-h-[72px] text-sm leading-7 text-slate-500">
                    {program.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
                    <Link
                      to={`/admin/programs/edit/${program.id}`}
                      className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#3d2a1c] hover:text-white"
                    >
                      تعديل
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleStatus(program.id)}
                      className="rounded-lg bg-[#78B33B]/10 px-4 py-2 text-sm font-semibold text-[#78B33B] transition hover:bg-[#78B33B] hover:text-white"
                    >
                      {program.status === "نشط" ? "تعطيل" : "تفعيل"}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteProgram(program.id)}
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

export default AdminPrograms;
