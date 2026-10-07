import { Link } from "react-router-dom";
import Button from "../../common/buttons/Button";

function DesktopNav() {
  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about" },
    { label: "برامجنا", href: "/programs" },
    { label: "مشاريعنا", href: "/projects" },
    { label: "الأخبار", href: "/news" },
    { label: "اتصل بنا", href: "/contact" },
  ];

  return (
    <nav className="hidden items-center gap-6 lg:flex">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="text-sm font-medium text-slate-700 transition hover:text-primary-700"
        >
          {link.label}
        </Link>
      ))}

      <Button to="/donate">تبرع الآن</Button>
    </nav>
  );
}

export default DesktopNav;
