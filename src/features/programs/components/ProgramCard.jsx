import { Link } from "react-router-dom";

const ProgramCard = ({ title, description, icon, link }) => {
  const Icon = icon;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#8bc34a] text-white">
        {Icon && <Icon className="text-2xl" />}
      </div>

      <h3 className="mb-3 text-xl font-bold text-[#33691e]">{title}</h3>

      <p className="leading-8 text-gray-600">{description}</p>
      {link && (
        <Link
          to={link}
          className="mt-5 inline-flex items-center font-semibold text-[#558b2f] transition hover:text-[#33691e]"
        >
          اكتشف المزيد
          <span className="mr-2">←</span>
        </Link>
      )}
    </div>
  );
};

export default ProgramCard;
