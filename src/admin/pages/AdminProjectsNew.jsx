import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminProjectsNew() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    status: "نشط",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // حفظ مؤقت - سيتم ربط Backend لاحقًا
    console.log("New project:", formData);

    navigate("/admin/projects");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            to="/admin/projects"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#78B33B]"
          >
            ← العودة إلى المشاريع
          </Link>

          <p className="mb-2 text-sm font-semibold text-[#78B33B]">
            إدارة المحتوى
          </p>

          <h1 className="text-3xl font-bold text-[#3d2a1c]">
            إضافة مشروع جديد
          </h1>

          <p className="mt-2 text-slate-500">
            إضافة مشروع جديد إلى قائمة المشاريع.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-6 text-xl font-bold text-[#3d2a1c]">
                بيانات المشروع
              </h2>

              {/* Title */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#3d2a1c]">
                  اسم المشروع
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="أدخل اسم المشروع"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>

              {/* Description */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#3d2a1c]">
                  الوصف المختصر
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="أدخل وصفًا مختصرًا للمشروع"
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>

              {/* Content */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#3d2a1c]">
                  المحتوى الكامل
                </label>

                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="أدخل المحتوى الكامل للمشروع"
                  rows={9}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>

              {/* Image */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#3d2a1c]">
                  رابط / مسار الصورة
                </label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/images/projects/project.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-semibold text-[#3d2a1c]">
                  الحالة
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white"
                >
                  <option value="نشط">نشط</option>
                  <option value="غير نشط">غير نشط</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  className="rounded-xl bg-[#78B33B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d2a1c]"
                >
                  حفظ المشروع
                </button>

                <Link
                  to="/admin/projects"
                  className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#3d2a1c] hover:text-white"
                >
                  إلغاء
                </Link>
              </div>
            </form>
          </div>

          {/* Preview */}
          <div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5">
                <h2 className="text-xl font-bold text-[#3d2a1c]">
                  معاينة المشروع
                </h2>
              </div>

              <div className="h-56 bg-slate-200">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.title || "معاينة المشروع"}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl text-slate-400">
                    ▧
                  </div>
                )}
              </div>

              <div className="p-5">
                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    formData.status === "نشط"
                      ? "bg-[#78B33B] text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {formData.status}
                </span>

                <h3 className="mt-4 text-xl font-bold text-[#3d2a1c]">
                  {formData.title || "اسم المشروع"}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {formData.description || "سيظهر الوصف المختصر للمشروع هنا."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminProjectsNew;
