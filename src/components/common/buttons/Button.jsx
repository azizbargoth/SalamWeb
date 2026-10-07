import { Link } from "react-router-dom";

function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  to,
  ...props
}) {
  const variants = {
    primary: "bg-primary-700 text-white hover:bg-primary-800",

    secondary: "bg-secondary-600 text-white hover:bg-secondary-700",

    outline:
      "border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white",
  };

  const buttonClasses = `rounded-lg px-5 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
