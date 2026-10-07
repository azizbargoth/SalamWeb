import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-600 text-xl font-bold text-white">
        <img
          src="/images/logo/Logo.png"
          alt="Salam"
          className="h-full w-full object-contain"
        />
      </div>

      <div>
        <h1 className="text-lg font-bold text-slate-800">منظمة السلام</h1>

        <p className="text-xs text-slate-500">SALAM Organization</p>
      </div>
    </Link>
  );
}

export default Logo;
