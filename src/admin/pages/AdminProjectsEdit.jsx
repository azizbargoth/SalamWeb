import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const projectsData = [
  {
    id: 1,
    title: "مشروع دعم الأسر",
    description: "مشروع يهدف إلى دعم الأسر المحتاجة وتحسين ظروفها المعيشية.",
    content:
      "يهدف هذا المشروع إلى تقديم الدعم للأسر المحتاجة من خلال مجموعة من المبادرات والخدمات التي تساعد على تحسين الظروف المعيشية وتعزيز الاستقرار الاجتماعي.",
    image: "/images/projects/family-support.jpg",
    status: "نشط",
  },
  {
    id: 2,
    title: "مشروع التعليم",
    description: "مبادرة لدعم التعليم وتوفير فرص تعليمية أفضل للأطفال والشباب.",
    content:
      "يركز المشروع على دعم العملية التعليمية وتوفير بيئة مناسبة للأطفال والشباب للحصول على فرص تعليمية تساعدهم على بناء مستقبل أفضل.",
    image: "/images/projects/education.jpg",
    status: "نشط",
  },
  {
    id: 3,
    title: "مشروع الرعاية الصحية",
    description: "تقديم الدعم والخدمات الصحية للفئات الأكثر احتياجًا.",
    content:
      "يسعى المشروع إلى توفير خدمات صحية ودعم طبي للفئات الأكثر احتياجًا.",
    image: "/images/projects/health.jpg",
    status: "غير نشط",
  },
];

function AdminProjectsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((item) => String(item.id) === String(id));

  const [formData, setFormData] = useState(() =>
    project
      ? {
          title: project.title,
          description: project.description,
          content: project.content,
          image: project.image,
          status: project.status,
        }
      : null,
  );

  if (!project) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-2xl px-6 py-16">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mb-5 text-5xl text-red-500">!</div>

            <h1 className="text-2xl font-bold text-[#3d2a1c]">
              المشروع غير موجود
            </h1>

            <p className="mt-3 text-slate-500">
              لم يتم العثور على مشروع بالمعرف: {id}
            </p>

            <Link
              to="/admin/projects"
              className="mt-6 inline-block rounded-xl bg-[#78B33B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d2a1c]"
            >
              ← العودة إلى المشاريع
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updated project:", {
      id: project.id,
      ...formData,
    });

    navigate("/admin/projects");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            to="/admin/projects"
            className="mb-4 inline-flex text-sm font-semibold text-slate-500 transition hover:text-[#78B33B]"
          >
            ← العودة إلى المشاريع
          </Link>

          <p className="mb-2 text-sm font-semibold text-[#78B33B]">
            إدارة المحتوى
          </p>

          <h1 className="text-3xl font-bold text-[#3d2a1c]">تعديل المشروع</h1>

          <p className="mt-2 text-slate-500">تعديل بيانات المشروع ومحتواه.</p>
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
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#3d2a1c]">
                  بيانات المشروع
                </h2>

                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    formData.status === "نشط"
                      ? "bg-[#78B33B] text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {formData.status}
                </span>
              </div>

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
                  حفظ التعديلات
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
                    alt={formData.title}
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
                  {formData.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {formData.description}
                </p>

                {formData.content && (
                  <div className="mt-5 border-t border-slate-100 pt-5">
                    <p className="text-sm leading-7 text-slate-500">
                      {formData.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminProjectsEdit;
