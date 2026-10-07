import { useState } from "react";

import { Link } from "react-router-dom";
import { projects as projectData } from "../features/projects/data/projects.data";


function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");


  const projects = [
    {
      id: 1,
      title: "مشروع دعم المجتمع المحلي",
      description:
        "مبادرة تهدف إلى دعم أفراد المجتمع وتعزيز التعاون والمشاركة المجتمعية.",
      category: "completed",
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    },
    {
      id: 2,
      title: "مشروع تمكين الشباب",
      description:
        "مشروع يركز على تطوير مهارات الشباب ودعم مشاركتهم في المجتمع.",
      category: "ongoing",
      status: "قيد التنفيذ",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    },
    {
      id: 3,
      title: "مبادرة التعليم للجميع",
      description:
        "مبادرة تهدف إلى دعم التعليم وتوفير فرص تعليمية أفضل للأطفال والشباب.",
      category: "completed",
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    },
    {
      id: 4,
      title: "مشروع التنمية المستدامة",
      description:
        "مشروع يساهم في تعزيز التنمية المستدامة ودعم المبادرات البيئية والمجتمعية.",
      category: "ongoing",
      status: "قيد التنفيذ",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    },
    {
      id: 5,
      title: "مبادرة دعم الأسر",
      description:
        "مبادرة مجتمعية تهدف إلى تقديم الدعم والمساعدة للأسر المحتاجة.",
      category: "completed",
      status: "مكتمل",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
    },
    {
      id: 6,
      title: "مشروع السلام المجتمعي",
      description:
        "مبادرة تهدف إلى تعزيز الحوار والتعاون وبناء جسور التواصل داخل المجتمع.",
      category: "ongoing",
      status: "قيد التنفيذ",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
    },
  ];


  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <main dir="rtl" className="bg-slate-50">
      {/* Hero */}
      <section className="bg-[#3d2a1c] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">مشاريعنا</h1>

          <p className="mx-auto max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            نستثمر جهودنا في تنفيذ مشاريع ومبادرات تساهم في خدمة المجتمع وتحقيق
            أثر إيجابي ومستدام.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center">
        <p className="mb-3 font-semibold text-[#3d2a1c]">مشاريع منظمة السلام</p>

        <h2 className="mb-5 text-3xl font-bold text-slate-800">
          مبادرات تصنع أثرًا
        </h2>

        <p className="leading-8 text-slate-600">
          نعمل من خلال مجموعة من المشاريع والمبادرات التي تستهدف احتياجات
          المجتمع، وتسعى إلى تعزيز التنمية والتعاون والمشاركة المجتمعية.
        </p>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveFilter("all")}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
              activeFilter === "all"
                ? "bg-[#3d2a1c] text-white"
                : "bg-white text-slate-600 hover:bg-[#3d2a1c] hover:text-white"
            }`}
          >
            جميع المشاريع
          </button>

          <button
            onClick={() => setActiveFilter("ongoing")}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
              activeFilter === "ongoing"
                ? "bg-[#3d2a1c] text-white"
                : "bg-white text-slate-600 hover:bg-[#3d2a1c] hover:text-white"
            }`}
          >
            قيد التنفيذ
          </button>

          <button
            onClick={() => setActiveFilter("completed")}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
              activeFilter === "completed"
                ? "bg-[#3d2a1c] text-white"
                : "bg-white text-slate-600 hover:bg-[#3d2a1c] hover:text-white"
            }`}
          >
            مكتملة
          </button>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Status */}
                <span
                  className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                    project.category === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold text-slate-800 transition group-hover:text-[#3d2a1c]">
                  {project.title}
                </h3>

                <p className="mb-5 leading-7 text-slate-600">
                  {project.description}
                </p>


                <Link
                  to="/projects"
                  className="font-semibold text-[#3d2a1c] transition hover:opacity-70"
                >
                  عرض تفاصيل المشروع ←
                </Link>

              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-[#3d2a1c] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 text-3xl font-bold">ساهم معنا في صناعة الأثر</h2>

          <p className="mb-8 leading-8 text-white/80">
            يمكنكم التواصل معنا لمعرفة المزيد عن مشاريعنا ومبادراتنا وكيفية
            المساهمة في دعم أعمال المنظمة.
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

export default Projects;
