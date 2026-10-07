import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminNewsNew() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    date: "",
    image: "",
    status: "مسودة",
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

    // سيتم ربط الحفظ الحقيقي بالـ Backend لاحقًا
    console.log("بيانات الخبر:", form);

    alert("تم حفظ الخبر بنجاح");

    navigate("/admin/news");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#3d2a1c]">
                إضافة خبر جديد
              </h1>

              <p className="mt-2 text-slate-500">
                أضف خبرًا جديدًا إلى موقع منظمة السلام
              </p>
            </div>

            <Link
              to="/admin/news"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-[#3d2a1c] transition hover:bg-[#3d2a1c] hover:text-white"
            >
              ← العودة إلى الأخبار
            </Link>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-7 lg:col-span-2">
              {/* Basic Information */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-[#3d2a1c]">
                  معلومات الخبر
                </h2>

                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      عنوان الخبر
                    </label>

                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="اكتب عنوان الخبر..."
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#78B33B] focus:ring-2 focus:ring-[#78B33B]/20"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      الوصف المختصر
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="اكتب وصفًا مختصرًا للخبر..."
                      rows="4"
                      required
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 leading-7 outline-none transition focus:border-[#78B33B] focus:ring-2 focus:ring-[#78B33B]/20"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label
                      htmlFor="content"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      محتوى الخبر
                    </label>

                    <textarea
                      id="content"
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      placeholder="اكتب محتوى الخبر بالتفصيل..."
                      rows="10"
                      required
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 leading-8 outline-none transition focus:border-[#78B33B] focus:ring-2 focus:ring-[#78B33B]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-[#3d2a1c]">
                  صورة الخبر
                </h2>

                <div>
                  <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    رابط الصورة
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="/images/news/news-1.jpg"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#78B33B] focus:ring-2 focus:ring-[#78B33B]/20"
                  />
                </div>

                {/* Image Preview */}
                {form.image && (
                  <div className="mt-5 overflow-hidden rounded-2xl">
                    <img
                      src={form.image}
                      alt="معاينة الخبر"
                      className="h-64 w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-7">
              {/* Publish Settings */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold text-[#3d2a1c]">
                  إعدادات النشر
                </h2>

                <div className="space-y-5">
                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      التصنيف
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#78B33B] focus:ring-2 focus:ring-[#78B33B]/20"
                    >
                      <option value="">اختر التصنيف</option>
                      <option value="مجتمعي">مجتمعي</option>
                      <option value="إنساني">إنساني</option>
                      <option value="شباب">شباب</option>
                      <option value="تنمية">تنمية</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      تاريخ الخبر
                    </label>

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#78B33B] focus:ring-2 focus:ring-[#78B33B]/20"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      حالة الخبر
                    </label>

                    <select
                      id="status"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#78B33B] focus:ring-2 focus:ring-[#78B33B]/20"
                    >
                      <option value="مسودة">مسودة</option>
                      <option value="منشور">منشور</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preview Card */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="border-b border-slate-100 p-6">
                  <h2 className="text-xl font-bold text-[#3d2a1c]">معاينة</h2>
                </div>

                <div className="p-6">
                  <div className="overflow-hidden rounded-2xl border border-slate-100">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt=""
                        className="h-40 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-slate-100 text-slate-400">
                        صورة الخبر
                      </div>
                    )}

                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-[#3d2a1c] px-3 py-1 text-xs font-semibold text-white">
                          {form.category || "التصنيف"}
                        </span>

                        <span className="text-xs text-slate-400">
                          {form.date || "التاريخ"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold leading-7 text-[#3d2a1c]">
                        {form.title || "عنوان الخبر"}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                        {form.description || "سيظهر هنا الوصف المختصر للخبر."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#78B33B] px-6 py-3 font-bold text-white transition hover:bg-[#3d2a1c]"
                >
                  حفظ الخبر
                </button>

                <Link
                  to="/admin/news"
                  className="mt-3 block w-full rounded-xl border border-slate-200 px-6 py-3 text-center font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  إلغاء
                </Link>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AdminNewsNew;
