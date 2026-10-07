import programs from "../data/programs.data";
import ProgramsHeader from "./ProgramsHeader";
import ProgramCard from "./ProgramCard";

const ProgramsSection = () => {
  return (
    <section className="bg-[#f1f8e9] px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <ProgramsHeader />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              title={program.title}
              description={program.description}
              icon={program.icon}
              link={program.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
