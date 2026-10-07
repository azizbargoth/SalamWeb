import { Link } from "react-router-dom";

function Home() {
  return (
    <main dir="rtl" className="bg-slate-50">
      {/* ==================== Hero ==================== */}
      <section className="relative overflow-hidden bg-[#70A637] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 font-semibold text-white/80">منظمة السلام</p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              معًا نصنع أثرًا...
              <br />
              ونبني مستقبلًا أفضل
            </h1>

            <p className="mb-8 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              نعمل من أجل دعم الإنسان والمجتمع من خلال برامج ومشاريع إنسانية
              وتنموية تسهم في بناء مستقبل أكثر استقرارًا واستدامة.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/programs"
                className="rounded-lg bg-white px-7 py-3 font-semibold text-[#70A637] transition hover:bg-slate-100"
              >
                تعرف على برامجنا
              </Link>

              <Link
                to="/contact"
                className="rounded-lg border border-white/40 px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-[#70A637]"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== About ==================== */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="mb-3 font-semibold text-[#70A637]">من نحن؟</p>

        <h2 className="mb-5 text-3xl font-bold text-slate-800 md:text-4xl">
          نعمل من أجل مجتمع أفضل
        </h2>

        <p className="leading-8 text-slate-600">
          منظمة السلام هي منظمة تعمل على خدمة المجتمع ودعم الفئات الأكثر
          احتياجًا من خلال مجموعة من البرامج والمبادرات الإنسانية والمجتمعية
          والتنموية.
        </p>

        <Link
          to="/about"
          className="mt-7 inline-block rounded-lg bg-[#70A637] px-7 py-3 font-semibold text-white transition hover:opacity-90"
        >
          تعرف علينا أكثر
        </Link>
      </section>

      {/* ==================== Programs ==================== */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 font-semibold text-[#70A637]">
              برامج منظمة السلام
            </p>

            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">
              برامجنا
            </h2>

            <p className="mx-auto max-w-2xl leading-8 text-slate-600">
              مجموعة من البرامج التي نعمل من خلالها على تحقيق رسالتنا وخدمة
              المجتمع.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Program 1 */}
            <article className="group rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#70A637] text-xl text-white">
                01
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-800 transition group-hover:text-[#70A637]">
                العمل الإنساني
              </h3>

              <p className="mb-5 leading-7 text-slate-600">
                تقديم الدعم والمساعدة للأفراد والأسر الأكثر احتياجًا والاستجابة
                للاحتياجات الإنسانية.
              </p>

              <Link
                to="/programs/humanitarian"
                className="font-semibold text-[#70A637] transition hover:opacity-70"
              >
                معرفة المزيد ←
              </Link>
            </article>

            {/* Program 2 */}
            <article className="group rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#70A637] text-xl text-white">
                02
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-800 transition group-hover:text-[#70A637]">
                الدعم المجتمعي
              </h3>

              <p className="mb-5 leading-7 text-slate-600">
                دعم المجتمع المحلي وتعزيز المشاركة والتكافل من خلال المبادرات
                المجتمعية.
              </p>

              <Link
                to="/programs/community-support"
                className="font-semibold text-[#70A637] transition hover:opacity-70"
              >
                معرفة المزيد ←
              </Link>
            </article>

            {/* Program 3 */}
            <article className="group rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#70A637] text-xl text-white">
                03
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-800 transition group-hover:text-[#70A637]">
                التنمية المستدامة
              </h3>

              <p className="mb-5 leading-7 text-slate-600">
                تنفيذ مبادرات تنموية تسهم في تحسين الظروف الاجتماعية والاقتصادية
                وتعزيز استدامة المجتمع.
              </p>

              <Link
                to="/programs/sustainable-development"
                className="font-semibold text-[#70A637] transition hover:opacity-70"
              >
                معرفة المزيد ←
              </Link>
            </article>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/programs"
              className="inline-block rounded-lg bg-[#70A637] px-8 py-3 font-semibold text-white transition hover:opacity-90"
            >
              جميع برامجنا
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== Projects ==================== */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 font-semibold text-[#70A637]">
              مشاريع منظمة السلام
            </p>

            <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">
              مشاريعنا
            </h2>

            <p className="mx-auto max-w-2xl leading-8 text-slate-600">
              نعمل على تنفيذ مشاريع ومبادرات ذات أثر حقيقي ومستدام في المجتمع.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Project 1 */}
            <article className="overflow-hidden rounded-2xl bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
                  alt="دعم المجتمع المحلي"
                  className="h-52 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-800">
                  دعم المجتمع المحلي
                </h3>

                <p className="mb-5 leading-7 text-slate-600">
                  مبادرة تهدف إلى دعم أفراد المجتمع وتعزيز التعاون والمشاركة
                  المجتمعية.
                </p>

                <Link
                  to="/projects"
                  className="font-semibold text-[#70A637] transition hover:opacity-70"
                >
                  عرض المشاريع ←
                </Link>
              </div>
            </article>

            {/* Project 2 */}
            <article className="overflow-hidden rounded-2xl bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
                  alt="تمكين الشباب"
                  className="h-52 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-800">
                  تمكين الشباب
                </h3>

                <p className="mb-5 leading-7 text-slate-600">
                  مشروع يركز على تطوير مهارات الشباب ودعم مشاركتهم في المجتمع.
                </p>

                <Link
                  to="/projects"
                  className="font-semibold text-[#70A637] transition hover:opacity-70"
                >
                  عرض المشاريع ←
                </Link>
              </div>
            </article>

            {/* Project 3 */}
            <article className="overflow-hidden rounded-2xl bg-slate-50 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
                  alt="التعليم للجميع"
                  className="h-52 w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-800">
                  التعليم للجميع
                </h3>

                <p className="mb-5 leading-7 text-slate-600">
                  مبادرة تهدف إلى دعم التعليم وتوفير فرص تعليمية أفضل للأطفال
                  والشباب.
                </p>

                <Link
                  to="/projects"
                  className="font-semibold text-[#70A637] transition hover:opacity-70"
                >
                  عرض المشاريع ←
                </Link>
              </div>
            </article>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-block rounded-lg bg-[#70A637] px-8 py-3 font-semibold text-white transition hover:opacity-90"
            >
              اكتشف مشاريعنا
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== Statistics ==================== */}
      <section className="bg-[#70A637] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 font-semibold text-white/80">أثرنا في المجتمع</p>

            <h2 className="text-3xl font-bold md:text-4xl">
              أرقام تعكس مسيرتنا
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Beneficiaries */}
            <div className="group rounded-2xl bg-white/10 p-7 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:bg-white/15">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#70A637] shadow-lg transition duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.7"
                  stroke="currentColor"
                  className="h-10 w-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75a4.5 4.5 0 0 0-9 0M12 13.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 18.75a3.75 3.75 0 0 0-2.25-3.438M17.25 5.625a3.75 3.75 0 0 1 0 7.25"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 18.75a3.75 3.75 0 0 1 2.25-3.438M6.75 5.625a3.75 3.75 0 0 0 0 7.25"
                  />
                </svg>
              </div>

              <h3 className="mb-2 text-4xl font-bold">+1000</h3>

              <p className="text-white/75">مستفيد من برامجنا</p>
            </div>

            {/* Projects */}
            <div className="group rounded-2xl bg-white/10 p-7 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:bg-white/15">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#70A637] shadow-lg transition duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.7"
                  stroke="currentColor"
                  className="h-10 w-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 21h16.5M5.25 21V7.5l6.75-3 6.75 3V21"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 10.5h.01M12 10.5h.01M15.75 10.5h.01M8.25 14.25h.01M12 14.25h.01M15.75 14.25h.01M8.25 18h.01M12 18h.01M15.75 18h.01"
                  />
                </svg>
              </div>

              <h3 className="mb-2 text-4xl font-bold">+50</h3>

              <p className="text-white/75">مشروعًا ومبادرة</p>
            </div>

            {/* Years */}
            <div className="group rounded-2xl bg-white/10 p-7 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:bg-white/15">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#70A637] shadow-lg transition duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.7"
                  stroke="currentColor"
                  className="h-10 w-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3.75 9.75h16.5"
                  />

                  <rect x="3.75" y="5.25" width="16.5" height="15" rx="2.25" />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 14h8M8 17h5"
                  />
                </svg>
              </div>

              <h3 className="mb-2 text-4xl font-bold">+10</h3>

              <p className="text-white/75">سنوات من العمل</p>
            </div>

            {/* Partners */}
            <div className="group rounded-2xl bg-white/10 p-7 text-center backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:bg-white/15">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#70A637] shadow-lg transition duration-300 group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.7"
                  stroke="currentColor"
                  className="h-10 w-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                  />

                  <circle cx="9" cy="7" r="4" />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  />
                </svg>
              </div>

              <h3 className="mb-2 text-4xl font-bold">+20</h3>

              <p className="text-white/75">شريكًا وداعمًا</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== News ==================== */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 font-semibold text-[#70A637]">تابع أخبارنا</p>

          <h2 className="mb-5 text-3xl font-bold text-slate-800 md:text-4xl">
            آخر الأخبار
          </h2>

          <p className="mb-8 leading-8 text-slate-600">
            تابع آخر أخبار وأنشطة منظمة السلام وتعرف على أحدث المبادرات
            والمشاريع التي ننفذها.
          </p>

          <Link
            to="/news"
            className="inline-block rounded-lg bg-[#70A637] px-8 py-3 font-semibold text-white transition hover:opacity-90"
          >
            جميع الأخبار
          </Link>
        </div>
      </section>

      {/* ==================== Call To Action ==================== */}
      <section className="bg-[#70A637] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            كن جزءًا من التغيير
          </h2>

          <p className="mb-8 leading-8 text-white/80">
            مساهمتك يمكن أن تصنع فرقًا حقيقيًا في حياة الآخرين. تواصل معنا
            لمعرفة المزيد عن أعمال المنظمة وطرق المشاركة.
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

export default Home;
