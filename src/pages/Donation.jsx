
import { Link } from "react-router-dom";

function Donation() {
  return (
    <main dir="rtl" className="bg-slate-50">
      {/* Hero */}
      <section className="bg-[#70A637] px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 font-semibold text-white/80">ساهم معنا</p>

          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            تبرعك يصنع فرقًا
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            مساهمتك تساعدنا على مواصلة تنفيذ البرامج والمشاريع الإنسانية
            والمجتمعية، والوصول إلى المزيد من الأشخاص الذين يحتاجون إلى الدعم.
          </p>
        </div>
      </section>

      {/* Donation Introduction */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 font-semibold text-[#70A637]">دعمك مهم</p>

          <h2 className="mb-5 text-3xl font-bold text-slate-800 md:text-4xl">
            كن جزءًا من الأثر
          </h2>

          <p className="leading-8 text-slate-600">
            من خلال تبرعك، تساهم في دعم مبادرات منظمة السلام وتعزيز قدرتنا على
            تنفيذ مشاريع تخدم المجتمع وتدعم الفئات الأكثر احتياجًا.
          </p>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 font-semibold text-[#70A637]">طرق التبرع</p>

            <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
              كيف يمكنك التبرع؟
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Method 1 */}
            <div className="rounded-2xl bg-slate-50 p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#70A637]/10 text-[#70A637]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M4.5 6h15A2.25 2.25 0 0 1 21.75 8.25v9.5A2.25 2.25 0 0 1 19.5 20h-15a2.25 2.25 0 0 1-2.25-2.25v-9.5A2.25 2.25 0 0 1 4.5 6Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 14.25h.008v.008H16.5v-.008Z"
                  />
                </svg>
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-800">
                التبرع المالي
              </h3>

              <p className="leading-7 text-slate-600">
                يمكنك المساهمة من خلال وسائل الدفع المتاحة لدعم برامج ومشاريع
                المنظمة.
              </p>
            </div>

            {/* Method 2 */}
            <div className="rounded-2xl bg-slate-50 p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#70A637]/10 text-[#70A637]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0 1.5-1.5 2.25-3 2.25H6c-1.5 0-3-.75-3-2.25S4.5 6 6 6h12c1.5 0 3 .75 3 2.25Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 10.5v7.25A2.25 2.25 0 0 0 7.5 20h9a2.25 2.25 0 0 0 2.25-2.25V10.5"
                  />
                </svg>
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-800">
                التبرع العيني
              </h3>

              <p className="leading-7 text-slate-600">
                يمكنك المساهمة بالمواد والمستلزمات التي تحتاجها بعض البرامج
                والمبادرات.
              </p>
            </div>

            {/* Method 3 */}
            <div className="rounded-2xl bg-slate-50 p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#70A637]/10 text-[#70A637]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.75-1.616A9.094 9.094 0 0 0 18 15.48M6 18.72a9.094 9.094 0 0 1-3.75-1.616A9.094 9.094 0 0 1 6 15.48M12 12a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5ZM19.5 8.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4.5 8.25a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5a7.5 7.5 0 0 1 15 0"
                  />
                </svg>
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-800">
                المساهمة معنا
              </h3>

              <p className="leading-7 text-slate-600">
                يمكنك أيضًا دعم المنظمة من خلال التطوع والمشاركة في أنشطتها
                ومبادراتها.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#70A637] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            كل مساهمة تصنع فرقًا
          </h2>

          <p className="mb-8 leading-8 text-white/80">
            تواصل معنا لمعرفة تفاصيل التبرع وطرق المساهمة المتاحة.
          </p>

          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-[#70A637] transition hover:bg-slate-100"
          >
            تواصل معنا
          </Link>

        </div>
      </section>
    </main>
  );
}

export default Donation;
