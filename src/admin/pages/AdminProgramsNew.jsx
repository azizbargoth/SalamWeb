import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminProgramsNew() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    status: "نشط",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("برنامج جديد:", form);

    alert("تم حفظ البرنامج بنجاح");

    navigate("/admin/programs");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div>
            <Link
              to="/admin/programs"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#78B33B] transition hover:text-[#3d2a1c]"
            >
              <span>→</span>
              العودة إلى البرامج
            </Link>

            <p className="text-sm font-semibold text-[#78B33B]">
              إدارة المحتوى
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#3d2a1c]">
              إضافة برنامج جديد
            </h1>

            <p className="mt-2 text-slate-500">
              أضف برنامجًا جديدًا ليظهر ضمن برامج المنظمة.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          {/* Main fields */}
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
                  placeholder="مثال: المساعدات الإنسانية"
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
                  placeholder="اكتب وصفًا مختصرًا للبرنامج..."
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
                  placeholder="اكتب تفاصيل البرنامج وأهدافه ومجالات العمل..."
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
                  placeholder="/images/programs/example.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />

                <p className="mt-2 text-xs text-slate-400">
                  سيتم ربط رفع الصور الحقيقي بالـBackend لاحقًا.
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

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
              <button
                type="submit"
                className="rounded-xl bg-[#78B33B] px-6 py-3 font-semibold text-white transition hover:bg-[#3d2a1c]"
              >
                حفظ البرنامج
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
                تظهر المعاينة أثناء إدخال البيانات.
              </p>
            </div>

            <div className="p-5">
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <div className="h-48 bg-slate-100">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt={form.title || "صورة البرنامج"}
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
                  <div className="mb-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        form.status === "نشط"
                          ? "bg-[#78B33B]/10 text-[#78B33B]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {form.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#3d2a1c]">
                    {form.title || "اسم البرنامج"}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {form.description || "سيظهر الوصف المختصر للبرنامج هنا."}
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

export default AdminProgramsNew;
