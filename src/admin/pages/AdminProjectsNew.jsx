import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../data/api";

const STATUS = ["planned", "ongoing", "completed", "suspended"];
const VISIBILITY = ["draft", "scheduled", "published", "archived"];


function AdminProjectsNew() {
  const navigate = useNavigate();
const [isSaving, setIsSaving] = useState(false);
const [error, setError] = useState("");
  const [formDataBs, setFormDataBs] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    status: STATUS,
    //////////////////////
    code: "",
    // status: "",
    start_date: "",
    end_date: "",
    budget_amount: 0,
    budget_currency: 0,
    show_budget: 0,
    beneficiaries_total: 0,
    beneficiaries_women: 0,
    beneficiaries_men: 0,
    beneficiaries_girls: 0,
    beneficiaries_boys: 0,
    cover_media_id: "",
    is_featured: true,
    visibility: VISIBILITY,
    sector_ids: "",
    location_ids: "",
    donor_ids: "",
  });
    const [formDataTr, setFormDataTr] = useState({
      title: "",
      description: "",
      content: "",
      image: "",
      status: "نشط",
      ///////////////////
      // slug,
      // title: Joi.string().trim().max(250),
      summary: "",
      objectives: "",
      // description: text,
      results: "",
      meta_title: "",
      meta_description: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormDataBs((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // حفظ مؤقت - سيتم ربط Backend لاحقًا
    console.log("New project:", formDataBs);

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
                  اسم المشروع:
                </label>

                <input
                  type="text"
                  name="title"
                  value={formDataBs.title}
                  onChange={handleChange}
                  placeholder="أدخل اسم المشروع"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>
              {/* project code */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#3d2a1c]">
                  كود المشروع:
                </label>

                <input
                  type="text"
                  name="title"
                  value={formDataBs.code}
                  onChange={handleChange}
                  placeholder="أدخل كود المشروع"
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
                  value={formDataBs.summary}
                  onChange={handleChange}
                  placeholder="أدخل وصفًا مختصرًا للمشروع"
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>

              {/* description */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#3d2a1c]">
                  المحتوى الكامل
                </label>

                <textarea
                  name="content"
                  value={formDataBs.description}
                  onChange={handleChange}
                  placeholder="أدخل المحتوى الكامل للمشروع"
                  rows={9}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>
              {/* Objective */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#3d2a1c]">
                  اهداف المشروع:
                </label>

                <textarea
                  name="content"
                  value={formDataBs.objectives}
                  onChange={handleChange}
                  placeholder="أدخل  اهداف للمشروع"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#78B33B] focus:bg-white"
                />
              </div>
              {/* Objective */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold text-[#3d2a1c]">
                  نتائج المشروع:
                </label>

                <textarea
                  name="content"
                  value={formDataBs.objectives}
                  onChange={handleChange}
                  placeholder="أدخل نتائج للمشروع"
                  rows={4}
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
                  value={formDataBs.image}
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
                  value={formDataBs.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white"
                >
                  {
                    STATUS.map((ele) => (
                      <option value={ele}>{ele}</option>
                    ))
                  }
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
                {formDataBs.image ? (
                  <img
                    src={formDataBs.image}
                    alt={formDataBs.title || "معاينة المشروع"}
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
                    formDataBs.status === "نشط"
                      ? "bg-[#78B33B] text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {formDataBs.status}
                </span>

                <h3 className="mt-4 text-xl font-bold text-[#3d2a1c]">
                  {formDataBs.title || "اسم المشروع"}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {formDataBs.description || "سيظهر الوصف المختصر للمشروع هنا."}
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
