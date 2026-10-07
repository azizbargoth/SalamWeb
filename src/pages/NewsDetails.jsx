import { Link, useParams } from "react-router-dom";


function NewsDetails() {
  const { id } = useParams();


  const news = [
    {
      id: 1,
      title: "منظمة السلام تطلق مبادرة جديدة لدعم المجتمع المحلي",
      description:
        "أطلقت منظمة السلام مبادرة مجتمعية جديدة تهدف إلى تعزيز التعاون ودعم أفراد المجتمع من خلال مجموعة من الأنشطة والبرامج التنموية.",
      content:
        "تأتي هذه المبادرة ضمن جهود منظمة السلام المستمرة في دعم المجتمع المحلي وتعزيز التعاون بين مختلف أفراده. وتهدف المبادرة إلى تنفيذ مجموعة من الأنشطة والبرامج التي تستجيب للاحتياجات المجتمعية وتساهم في بناء مجتمع أكثر تعاونًا وتكافلًا.",
      category: "أخبار المنظمة",
      date: "15 سبتمبر 2026",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    },
    {
      id: 2,
      title: "اختتام برنامج تمكين الشباب بنجاح",
      description:
        "اختتمت المنظمة برنامجًا تدريبيًا يهدف إلى تطوير مهارات الشباب وتعزيز مشاركتهم الفاعلة في المجتمع.",
      content:
        "اختتمت منظمة السلام برنامج تمكين الشباب بعد مجموعة من الأنشطة التدريبية التي ركزت على تطوير المهارات وتعزيز المشاركة المجتمعية. ويأتي البرنامج ضمن رؤية المنظمة لدعم الشباب وإتاحة المزيد من الفرص أمامهم.",
      category: "برامج ومبادرات",
      date: "10 سبتمبر 2026",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    },
    {
      id: 3,
      title: "منظمة السلام تعزز جهودها في مجال التعليم",
      description:
        "ضمن جهودها المستمرة لدعم التعليم، تعمل المنظمة على تنفيذ عدد من الأنشطة والمبادرات التي تساعد على توفير فرص تعليمية أفضل.",
      content:
        "تواصل منظمة السلام جهودها في مجال التعليم من خلال مجموعة من المبادرات والأنشطة التي تهدف إلى دعم العملية التعليمية وتوفير فرص أفضل للأطفال والشباب.",
      category: "التعليم",
      date: "5 سبتمبر 2026",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    },
    {
      id: 4,
      title: "مبادرة جديدة لتعزيز التنمية المستدامة",
      description:
        "تواصل المنظمة العمل على مبادرات تهدف إلى تعزيز التنمية المستدامة وتشجيع المشاركة المجتمعية في حماية البيئة.",
      content:
        "تعمل منظمة السلام على تعزيز مفهوم التنمية المستدامة من خلال مبادرات تهدف إلى رفع الوعي وتشجيع أفراد المجتمع على المشاركة في المبادرات البيئية والمجتمعية.",
      category: "تنمية مستدامة",
      date: "28 أغسطس 2026",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    },
    {
      id: 5,
      title: "حملة مجتمعية لدعم الأسر",
      description:
        "نظمت منظمة السلام حملة مجتمعية تهدف إلى تقديم الدعم والمساعدة للأسر وتعزيز روح التكافل والتعاون داخل المجتمع.",
      content:
        "نظمت المنظمة حملة مجتمعية ركزت على دعم الأسر وتعزيز روح التكافل والتعاون. وشملت الحملة عددًا من الأنشطة التي تهدف إلى مساعدة الأسر وتعزيز المشاركة المجتمعية.",
      category: "مجتمع",
      date: "20 أغسطس 2026",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
    },
    {
      id: 6,
      title: "لقاء مجتمعي لتعزيز الحوار والتعاون",
      description:
        "شهدت المنظمة لقاءً مجتمعيًا جمع عددًا من أفراد المجتمع لمناقشة سبل تعزيز الحوار والتعاون والعمل المشترك.",
      content:
        "جمع اللقاء عددًا من أفراد المجتمع لمناقشة مجموعة من القضايا والموضوعات المتعلقة بالتعاون والحوار والعمل المشترك، وذلك في إطار جهود المنظمة لتعزيز التواصل المجتمعي.",
      category: "فعاليات",
      date: "12 أغسطس 2026",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
    },
  ];

  const article = news.find((item) => item.id === Number(id));


  if (!article) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h1 className="mb-4 text-3xl font-bold text-slate-800">
            الخبر غير موجود
          </h1>

          <p className="mb-8 text-slate-600">
            عذرًا، لم نتمكن من العثور على الخبر المطلوب.
          </p>

          <Link
            to="/news"
            className="inline-block rounded-lg bg-[#3d2a1c] px-7 py-3 font-semibold text-white transition hover:opacity-90"
          >
            العودة إلى الأخبار
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main dir="rtl" className="bg-slate-50">
      {/* Hero Image */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        <div className="absolute bottom-0 right-0 left-0">
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#3d2a1c]">
              {article.category}
            </span>

            <h1 className="max-w-4xl text-3xl font-bold leading-relaxed text-white md:text-5xl">
              {article.title}
            </h1>

            <p className="mt-4 text-sm text-white/80">{article.date}</p>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="mx-auto max-w-4xl px-6 py-14">
        <article className="rounded-2xl bg-white p-7 shadow-sm md:p-10">
          <p className="mb-8 text-lg font-medium leading-9 text-slate-600">
            {article.description}
          </p>

          <div className="mb-8 h-px bg-slate-200" />

          <div className="space-y-6 text-base leading-9 text-slate-700">
            <p>{article.content}</p>

            <p>
              وتؤكد منظمة السلام استمرارها في العمل على تطوير برامجها ومبادراتها
              بما يساهم في خدمة المجتمع وتحقيق أثر إيجابي ومستدام.
            </p>
          </div>
        </article>

        {/* Back */}
        <div className="mt-10 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 font-semibold text-[#3d2a1c] transition hover:gap-3"
          >
            <span>→</span>
            العودة إلى الأخبار
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NewsDetails;
