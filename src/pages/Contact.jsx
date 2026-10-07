function Contact() {
  return (
    <main dir="rtl" className="bg-slate-50">
      {/* Hero */}
      <section className="bg-[#3d2a1c] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">اتصل بنا</h1>

          <p className="mx-auto max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            نحن سعداء بتواصلكم معنا. يمكنكم إرسال استفساراتكم ومقترحاتكم أو
            التواصل معنا عبر معلومات الاتصال المتاحة.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-800">
              تواصل معنا
            </h2>

            <p className="mb-8 leading-8 text-slate-600">
              إذا كان لديكم أي استفسار أو ترغبون في معرفة المزيد عن برامج
              ومشاريع منظمة السلام، يسعدنا استقبال رسائلكم.
            </p>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3d2a1c] text-xl text-white">
                  📍
                </div>

                <div>
                  <h3 className="mb-1 font-bold text-[#3d2a1c]">العنوان</h3>

                  <p className="text-slate-600">عنوان منظمة السلام</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3d2a1c] text-xl text-white">
                  ☎
                </div>

                <div>
                  <h3 className="mb-1 font-bold text-[#3d2a1c]">الهاتف</h3>

                  <p dir="ltr" className="text-slate-600">
                    +000 000 000 000
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#3d2a1c] text-xl text-white">
                  ✉
                </div>

                <div>
                  <h3 className="mb-1 font-bold text-[#3d2a1c]">
                    البريد الإلكتروني
                  </h3>

                  <p className="text-slate-600">info@example.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
              أرسل لنا رسالة
            </h2>

            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  الاسم الكامل
                </label>

                <input
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-[#3d2a1c] focus:ring-1 focus:ring-[#3d2a1c]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  placeholder="example@email.com"
                  dir="ltr"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-[#3d2a1c] focus:ring-1 focus:ring-[#3d2a1c]"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  الموضوع
                </label>

                <input
                  type="text"
                  placeholder="موضوع الرسالة"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-[#3d2a1c] focus:ring-1 focus:ring-[#3d2a1c]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  الرسالة
                </label>

                <textarea
                  rows="6"
                  placeholder="اكتب رسالتك هنا..."
                  className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-[#3d2a1c] focus:ring-1 focus:ring-[#3d2a1c]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-[#3d2a1c] px-6 py-3 font-semibold text-white transition hover:bg-[#513924]"
              >
                إرسال الرسالة
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
