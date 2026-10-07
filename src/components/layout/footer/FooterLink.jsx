const FooterMain = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* معلومات المنظمة */}
        <div>
          <h3 className="mb-5 text-2xl font-bold">منظمة سلام</h3>

          <p className="mb-6 leading-8 text-gray-300">
            منظمة إنسانية تعمل من أجل دعم المجتمعات وتحقيق أثر إيجابي ومستدام من
            خلال البرامج والمشاريع الإنسانية والتنموية.
          </p>

          <div className="flex gap-3">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary-600"
              aria-label="Facebook"
            >
              f
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary-600"
              aria-label="Instagram"
            >
              i
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-primary-600"
              aria-label="LinkedIn"
            >
              in
            </a>
          </div>
        </div>

        {/* روابط الموقع */}
        <div>
          <h3 className="mb-5 text-lg font-bold">روابط سريعة</h3>

          <ul className="space-y-3 text-gray-300">
            <li>
              <a href="#" className="transition hover:text-primary-400">
                الرئيسية
              </a>
            </li>

            <li>
              <a href="#about" className="transition hover:text-primary-400">
                من نحن
              </a>
            </li>

            <li>
              <a href="#programs" className="transition hover:text-primary-400">
                البرامج
              </a>
            </li>

            <li>
              <a href="#news" className="transition hover:text-primary-400">
                الأخبار
              </a>
            </li>

            <li>
              <a href="#contact" className="transition hover:text-primary-400">
                تواصل معنا
              </a>
            </li>
          </ul>
        </div>

        {/* مجالات العمل */}
        <div>
          <h3 className="mb-5 text-lg font-bold">مجالات العمل</h3>

          <ul className="space-y-3 text-gray-300">
            <li>العمل الإنساني</li>
            <li>التعليم</li>
            <li>الحماية</li>
            <li>الأمن الغذائي</li>
            <li>سبل العيش</li>
          </ul>
        </div>

        {/* معلومات التواصل */}
        <div>
          <h3 className="mb-5 text-lg font-bold">تواصل معنا</h3>

          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-primary-400">📍</span>
              <span>سوريا</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-primary-400">📞</span>
              <span dir="ltr">+963 XX XXX XXXX</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-primary-400">✉</span>
              <span>info@salam.org</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
