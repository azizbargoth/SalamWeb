import { Link } from "react-router-dom";

function MobileMenu({ isOpen, onClose }) {
  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about" },
    { label: "برامجنا", href: "/programs" },
    { label: "مشاريعنا", href: "/projects" },
    { label: "الأخبار", href: "/news" },
    { label: "اتصل بنا", href: "/contact" },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <nav className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-right text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-primary-700"
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/donate"
          onClick={onClose}
          className="rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-800"
        >
          تبرع الآن
        </Link>
      </div>
    </nav>
  );
}

export default MobileMenu;
