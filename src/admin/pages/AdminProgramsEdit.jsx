import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const programs = [
  {
    id: 1,
    title: "المساعدات الإنسانية",
    description:
      "برامج تهدف إلى تقديم الدعم والمساعدة للفئات الأكثر احتياجًا وتحسين ظروفهم المعيشية.",
    content:
      "نعمل من خلال برامج المساعدات الإنسانية على الوصول إلى الفئات الأكثر احتياجًا وتقديم الدعم المناسب لهم.",
    image: "/images/programs/humanitarian.jpg",
    status: "نشط",
  },
  {
    id: 2,
    title: "دعم المجتمع",
    description:
      "مبادرات مجتمعية تهدف إلى تعزيز التعاون ودعم أفراد المجتمع وتنمية روح المشاركة.",
    content:
      "ننفذ مجموعة من المبادرات التي تساهم في دعم المجتمع وتعزيز المشاركة والتعاون.",
    image: "/images/programs/community-support.jpg",
    status: "نشط",
  },
  {
    id: 3,
    title: "التنمية المستدامة",
    description:
      "برامج ومبادرات تركز على التنمية المستدامة وتحقيق أثر إيجابي طويل الأمد.",
    content:
      "نسعى إلى تنفيذ مشاريع تنموية تحقق أثرًا مستدامًا وتساهم في تحسين مستقبل المجتمعات.",
    image: "/images/programs/sustainable-development.jpg",
    status: "نشط",
  },
  {
    id: 4,
    title: "تمكين الشباب",
    description:
      "برامج تهدف إلى تطوير مهارات الشباب ورفع قدراتهم وفتح فرص جديدة أمامهم.",
    content:
      "نركز على تطوير مهارات الشباب وتعزيز مشاركتهم وفتح فرص جديدة أمامهم.",
    image: "/images/programs/youth-empowerment.jpg",
    status: "نشط",
  },
];

function AdminProgramsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const program = programs.find((item) => String(item.id) === String(id));

  const [form, setForm] = useState(
    program || {
      title: "",
      description: "",
      content: "",
      image: "",
      status: "نشط",
    },
  );

  if (!program) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="mb-4 text-3xl font-bold text-[#3d2a1c]">
            البرنامج غير موجود
          </h1>

          <p className="mb-8 text-slate-500">
            عذرًا، لم نتمكن من العثور على البرنامج المطلوب.
          </p>

          <Link
            to="/admin/programs"
            className="inline-block rounded-xl bg-[#78B33B] px-6 py-3 font-semibold text-white transition hover:bg-[#3d2a1c]"
          >
            العودة إلى البرامج
          </Link>
        </section>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("تعديل البرنامج:", {
      id,
      ...form,
    });

    alert("تم تعديل البرنامج بنجاح");

    navigate("/admin/programs");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Link
            to="/admin/programs"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#78B33B] transition hover:text-[#3d2a1c]"
          >
            <span>→</span>
            العودة إلى البرامج
          </Link>

          <p className="text-sm font-semibold text-[#78B33B]">إدارة المحتوى</p>

          <h1 className="mt-2 text-3xl font-bold text-[#3d2a1c]">
            تعديل البرنامج
          </h1>

          <p className="mt-2 text-slate-500">تعديل بيانات البرنامج ومحتواه.</p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          {/* Main */}
          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  اسم البرنامج
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  الوصف المختصر
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 leading-7 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>

              {/* Content */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  محتوى البرنامج
                </label>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={10}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 leading-8 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  رابط صورة البرنامج
                </label>

                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />

                <p className="mt-2 text-xs text-slate-400">
                  رفع الصور الحقيقي سيتم ربطه بالـBackend لاحقًا.
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  حالة البرنامج
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#78B33B] focus:bg-white"
                >
                  <option value="نشط">نشط</option>
                  <option value="غير نشط">غير نشط</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
              <button
                type="submit"
                className="rounded-xl bg-[#78B33B] px-6 py-3 font-semibold text-white transition hover:bg-[#3d2a1c]"
              >
                حفظ التعديلات
              </button>

              <Link
                to="/admin/programs"
                className="rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                إلغاء
              </Link>
            </div>
          </div>

          {/* Preview */}
          <aside className="h-fit overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-bold text-[#3d2a1c]">معاينة البرنامج</h2>

              <p className="mt-1 text-xs text-slate-400">
                المعاينة تتحدث أثناء تعديل البيانات.
              </p>
            </div>

            <div className="p-5">
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <div className="h-48 bg-slate-100">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt={form.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-400">
                      لا توجد صورة
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      form.status === "نشط"
                        ? "bg-[#78B33B]/10 text-[#78B33B]"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {form.status}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-[#3d2a1c]">
                    {form.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {form.description}
                  </p>

                  {form.content && (
                    <div className="mt-5 border-t border-slate-100 pt-5">
                      <p className="text-sm leading-7 text-slate-600">
                        {form.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}

export default AdminProgramsEdit;
