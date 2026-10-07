
import { Link } from "react-router-dom";

function About() {
  return (
    <main dir="rtl" className="bg-slate-50">
      {/* Hero */}
      <section className="bg-[#3d2a1c] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">من نحن</h1>

          <p className="mx-auto max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            منظمة السلام، منظمة تسعى إلى بناء مجتمع أكثر سلامًا وتعاونًا من خلال
            برامج ومبادرات تخدم الإنسان والمجتمع.
          </p>
        </div>
      </section>

      {/* About Us */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image Placeholder */}
          <div className="flex min-h-[350px] items-center justify-center rounded-2xl bg-[#e8dfd7]">
            <div className="text-center text-[#3d2a1c]">
              <div className="mb-3 text-6xl">🌍</div>
              <p className="font-medium">صورة المنظمة</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="mb-3 font-semibold text-[#3d2a1c]">تعرف علينا</p>

            <h2 className="mb-6 text-3xl font-bold text-slate-800 md:text-4xl">
              معًا من أجل السلام والتنمية
            </h2>

            <p className="mb-5 leading-8 text-slate-600">
              منظمة السلام هي منظمة تهدف إلى المساهمة في بناء مجتمع يسوده السلام
              والتعاون والتكافل، من خلال تنفيذ مجموعة من البرامج والمبادرات التي
              تركز على خدمة المجتمع.
            </p>

            <p className="leading-8 text-slate-600">
              نؤمن بأن العمل المشترك وتمكين الأفراد ودعم المبادرات المجتمعية
              يمكن أن يسهم في صناعة مستقبل أفضل وأكثر استقرارًا للأجيال القادمة.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 font-semibold text-[#3d2a1c]">رؤيتنا ورسالتنا</p>

            <h2 className="text-3xl font-bold text-slate-800">
              ما الذي نسعى إليه؟
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision */}
            <div className="rounded-2xl bg-slate-50 p-8 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#3d2a1c] text-2xl text-white">
                👁
              </div>

              <h3 className="mb-4 text-2xl font-bold text-[#3d2a1c]">رؤيتنا</h3>

              <p className="leading-8 text-slate-600">
                بناء مجتمع يسوده السلام والعدالة والتعاون، ويتمتع أفراده بالقدرة
                على المشاركة الفاعلة في تنمية مجتمعهم.
              </p>
            </div>

            {/* Mission */}
            <div className="rounded-2xl bg-slate-50 p-8 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#3d2a1c] text-2xl text-white">
                🎯
              </div>

              <h3 className="mb-4 text-2xl font-bold text-[#3d2a1c]">
                رسالتنا
              </h3>

              <p className="leading-8 text-slate-600">
                تقديم برامج ومبادرات مجتمعية تساهم في تعزيز السلام والتعاون
                وتمكين الأفراد ودعم المجتمعات المحلية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold text-[#3d2a1c]">قيمنا</p>

          <h2 className="text-3xl font-bold text-slate-800">
            المبادئ التي نؤمن بها
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mb-4 text-4xl">🤝</div>
            <h3 className="mb-3 text-xl font-bold text-[#3d2a1c]">التعاون</h3>
            <p className="leading-7 text-slate-600">
              نؤمن بقوة العمل المشترك والشراكات المجتمعية.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mb-4 text-4xl">🕊️</div>
            <h3 className="mb-3 text-xl font-bold text-[#3d2a1c]">السلام</h3>
            <p className="leading-7 text-slate-600">
              نعمل من أجل تعزيز ثقافة السلام والحوار.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mb-4 text-4xl">⚖️</div>
            <h3 className="mb-3 text-xl font-bold text-[#3d2a1c]">العدالة</h3>
            <p className="leading-7 text-slate-600">
              نحرص على المساواة واحترام حقوق جميع أفراد المجتمع.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mb-4 text-4xl">💡</div>
            <h3 className="mb-3 text-xl font-bold text-[#3d2a1c]">الابتكار</h3>
            <p className="leading-7 text-slate-600">
              نشجع الأفكار والمبادرات التي تحقق أثرًا إيجابيًا.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-[#3d2a1c] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 text-3xl font-bold">كن جزءًا من التغيير</h2>

          <p className="mb-8 leading-8 text-white/80">
            نؤمن بأن التغيير يبدأ بخطوة، وبأن تعاوننا معًا يمكن أن يصنع أثرًا
            إيجابيًا في المجتمع.
          </p>


          <Link
            to="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-[#3d2a1c] transition hover:bg-slate-100"
          >
            تواصل معنا
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
