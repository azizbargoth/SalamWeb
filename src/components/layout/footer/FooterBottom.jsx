const FooterBottom = () => {
  return (
    <div className="border-t border-white/10">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-400 md:flex-row">
          <p>© {new Date().getFullYear()} منظمة سلام. جميع الحقوق محفوظة.</p>

          <p>جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
