import { Link } from "react-router-dom";

function News() {
  const news = [
    {
      id: 1,
      title: "منظمة السلام تطلق مبادرة جديدة لدعم المجتمع المحلي",
      description:
        "أطلقت منظمة السلام مبادرة مجتمعية جديدة تهدف إلى تعزيز التعاون ودعم أفراد المجتمع من خلال مجموعة من الأنشطة والبرامج التنموية.",
      category: "أخبار المنظمة",
      date: "15 سبتمبر 2026",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    },
    {
      id: 2,
      title: "اختتام برنامج تمكين الشباب بنجاح",
      description:
        "اختتمت المنظمة برنامجًا تدريبيًا يهدف إلى تطوير مهارات الشباب وتعزيز مشاركتهم الفاعلة في المجتمع.",
      category: "برامج ومبادرات",
      date: "10 سبتمبر 2026",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    },
    {
      id: 3,
      title: "منظمة السلام تعزز جهودها في مجال التعليم",
      description:
        "ضمن جهودها المستمرة لدعم التعليم، تعمل المنظمة على تنفيذ عدد من الأنشطة والمبادرات التي تساعد على توفير فرص تعليمية أفضل.",
      category: "التعليم",
      date: "5 سبتمبر 2026",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    },
    {
      id: 4,
      title: "مبادرة جديدة لتعزيز التنمية المستدامة",
      description:
        "تواصل المنظمة العمل على مبادرات تهدف إلى تعزيز التنمية المستدامة وتشجيع المشاركة المجتمعية في حماية البيئة.",
      category: "تنمية مستدامة",
      date: "28 أغسطس 2026",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    },
    {
      id: 5,
      title: "حملة مجتمعية لدعم الأسر",
      description:
        "نظمت منظمة السلام حملة مجتمعية تهدف إلى تقديم الدعم والمساعدة للأسر وتعزيز روح التكافل والتعاون داخل المجتمع.",
      category: "مجتمع",
      date: "20 أغسطس 2026",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
    },
    {
      id: 6,
      title: "لقاء مجتمعي لتعزيز الحوار والتعاون",
      description:
        "شهدت المنظمة لقاءً مجتمعيًا جمع عددًا من أفراد المجتمع لمناقشة سبل تعزيز الحوار والتعاون والعمل المشترك.",
      category: "فعاليات",
      date: "12 أغسطس 2026",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
    },
  ];


  return (
    <main dir="rtl" className="bg-slate-50">
      {/* =========================
          Hero
      ========================== */}
      <section className="bg-[#3d2a1c] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold tracking-wide text-white/70">
            منظمة السلام
          </p>

          <h1 className="mb-5 text-4xl font-bold md:text-5xl">أخبارنا</h1>

          <p className="mx-auto max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            تابعوا آخر أخبار منظمة السلام وأنشطتها ومبادراتها وبرامجها
            المجتمعية، واطلعوا على آخر المستجدات والفعاليات.
          </p>
        </div>
      </section>

      {/* =========================
          Introduction
      ========================== */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="mb-3 font-semibold text-[#3d2a1c]">آخر المستجدات</p>

        <h2 className="mb-5 text-3xl font-bold text-slate-800">
          أخبار وأنشطة منظمة السلام
        </h2>

        <p className="leading-8 text-slate-600">
          نشارككم من خلال هذه الصفحة أبرز أخبار المنظمة وأنشطتها ومبادراتها
          والفعاليات التي تساهم في تحقيق رسالتنا وخدمة المجتمع.
        </p>
      </section>

      {/* =========================
          News Grid
      ========================== */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* =========================
                  Image
              ========================== */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Category */}
                <span className="absolute right-4 top-4 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#3d2a1c] shadow-sm">
                  {item.category}
                </span>

                {/* Date */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-sm font-medium text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {item.date}
                </div>
              </div>

              {/*  Content */}
              <div className="p-6">
                {/* Small Category */}
                <p className="mb-3 text-sm font-semibold text-[#3d2a1c]">
                  {item.category}
                </p>

                {/* Title */}
                <h3 className="mb-4 text-xl font-bold leading-8 text-slate-800 transition duration-300 group-hover:text-[#3d2a1c]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mb-6 line-clamp-3 leading-7 text-slate-600">
                  {item.description}
                </p>

                {/* Read More */}
                <Link
                  to={`/news/${item.id}`}
                  className="inline-flex items-center gap-2 font-semibold text-[#3d2a1c] transition duration-300 hover:gap-3"
                >
                  اقرأ الخبر
                  <span>←</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================
          Newsletter / CTA
      ========================== */}
      <section className="bg-[#3d2a1c] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-white/70">
            ابقَ على اطلاع
          </p>

          <h2 className="mb-5 text-3xl font-bold">تابع أخبار منظمة السلام</h2>

          <p className="mb-8 leading-8 text-white/80">
            تعرف على أحدث أنشطة المنظمة ومشاريعها ومبادراتها، وكن على اطلاع دائم
            بكل ما نقوم به لخدمة المجتمع.
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

export default News;
