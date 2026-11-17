import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../../data/api";
import { getMediaUrl } from "../../app/AuthContext";
import { notefyError, notefySuccess } from "../../js/Tosats";

const PARTNER_TYPES = [
  { value: "donor", label: "جهة مانحة" },
  { value: "partner", label: "شريك" },
  { value: "network", label: "شبكة" },
  { value: "government", label: "جهة حكومية" },
];

const LANGUAGES = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
  { code: "ku", label: "Kurmanji" },
];

const EMPTY_TRANSLATION = { name: "", description: "" };

const INPUT_CLASS =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white";

function getApiErrorMessage(error) {
  const details = error.response?.data?.details ?? error.response?.data?.errors;

  if (Array.isArray(details) && details.length > 0) {
    return details
      .map((item) =>
        item.field ? `${item.field}: ${item.message}` : item.message,
      )
      .join(" • ");
  }

  return (
    error.response?.data?.message ||
    error.message ||
    "تعذر تنفيذ الطلب. حاول مرة أخرى."
  );
}

function createEmptyTranslations() {
  return Object.fromEntries(
    LANGUAGES.map(({ code }) => [code, { ...EMPTY_TRANSLATION }]),
  );
}

function hasTranslationContent(translation) {
  return Object.values(translation).some((value) => value.trim().length > 0);
}
const AdminPartnersEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [partner, setPartner] = useState(null);
  const [formData, setFormData] = useState(null);
  const [translations, setTranslations] = useState(createEmptyTranslations);
  const [activeLanguage, setActiveLanguage] = useState("ar");

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [logoPreviewUrl, setLogoPreviewUrl] = useState("");

  const activeTranslation = translations[activeLanguage];

  // Load the full admin partner record and all its language translations.
  useEffect(() => {
    const controller = new AbortController();

    async function loadPartner() {
      setLoading(true);
      setLoadError("");
      setPartner(null);
      setFormData(null);

      try {
        const response = await Api.get(`/partners/admin/${id}`, {
          signal: controller.signal,
        });

        const loadedPartner = response.data?.data;

        if (!loadedPartner) {
          throw new Error("لم يتم العثور على الشريك.");
        }

        if (controller.signal.aborted) return;

        setPartner(loadedPartner);

        const loadedTranslations = createEmptyTranslations();

        for (const translation of loadedPartner.translations ?? []) {
          if (loadedTranslations[translation.lang_code]) {
            loadedTranslations[translation.lang_code] = {
              name: translation.name ?? "",
              description: translation.description ?? "",
            };
          }
        }

        // Fallback to the selected language fields if Arabic is missing.
        if (!loadedTranslations.ar.name && loadedPartner.name) {
          loadedTranslations.ar = {
            name: loadedPartner.name ?? "",
            description: loadedPartner.description ?? "",
          };
        }

        setTranslations(loadedTranslations);

        setFormData({
          type: loadedPartner.type ?? "partner",
          logo_media_id: loadedPartner.logo_media_id ?? null,
          website_url: loadedPartner.website_url ?? "",
          sort_order:
            loadedPartner.sort_order == null
              ? "0"
              : String(loadedPartner.sort_order),
          is_active: Boolean(loadedPartner.is_active),
          show_on_home: Boolean(loadedPartner.show_on_home),
        });

        setLogoPreviewUrl(
          loadedPartner.logo_url ? getMediaUrl(loadedPartner.logo_url) : "",
        );
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          setLoadError(getApiErrorMessage(error));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadPartner();
    return () => controller.abort();
  }, [id]);

  function handleBaseChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleTranslationChange(event) {
    const { name, value } = event.target;

    setTranslations((current) => ({
      ...current,
      [activeLanguage]: {
        ...current[activeLanguage],
        [name]: value,
      },
    }));
  }

  // Upload a replacement logo and store its UUID on the partner.
  async function handleLogoChange(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadMessage("يرجى اختيار ملف صورة.");
      input.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadMessage("يجب ألا يتجاوز حجم الصورة 5 ميغابايت.");
      input.value = "";
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", file);

    setIsUploading(true);
    setUploadMessage("");
    setErrorMessage("");

    try {
      const response = await Api.post("/media", uploadData);
      const media = response.data?.data;

      if (!media?.id) {
        throw new Error("لم يرجع الخادم معرّف الصورة.");
      }

      setFormData((current) => ({
        ...current,
        logo_media_id: media.id,
      }));

      setLogoPreviewUrl(getMediaUrl(media.url));
      setUploadMessage("تم رفع الشعار.");
    } catch (error) {
      const message = getApiErrorMessage(error);
      setUploadMessage(message);
      notefyError(message);
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  }

  // Validate and save partner fields and translations.
  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    if (!formData) return;

    if (isUploading) {
      setErrorMessage("انتظر حتى يكتمل رفع الشعار.");
      return;
    }

    if (!translations.ar.name.trim()) {
      setActiveLanguage("ar");
      setErrorMessage("أدخل اسم الشريك باللغة العربية.");
      return;
    }

    const missingLanguageName = LANGUAGES.find(({ code }) => {
      const translation = translations[code];
      const included = code === "ar" || hasTranslationContent(translation);

      return included && !translation.name.trim();
    });

    if (missingLanguageName) {
      setActiveLanguage(missingLanguageName.code);
      setErrorMessage(`أدخل اسم الشريك باللغة ${missingLanguageName.label}.`);
      return;
    }

    const sortOrder = Number(formData.sort_order);

    if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 32000) {
      setErrorMessage("ترتيب العرض يجب أن يكون عددًا صحيحًا بين 0 و32000.");
      return;
    }

    const websiteUrl = formData.website_url.trim();

    const partnerTranslations = LANGUAGES.filter(
      ({ code }) => code === "ar" || hasTranslationContent(translations[code]),
    ).map(({ code }) => ({
      lang_code: code,
      name: translations[code].name.trim(),
      description: translations[code].description.trim(),
    }));

    const payload = {
      type: formData.type,
      logo_media_id: formData.logo_media_id || null,
      website_url: websiteUrl || null,
      sort_order: sortOrder,
      is_active: formData.is_active,
      show_on_home: formData.show_on_home,
      translations: partnerTranslations,
    };

    setIsSaving(true);

    try {
      await Api.patch(`/partners/${id}`, payload);
      notefySuccess("تم تعديل الشريك بنجاح.");
      navigate("/admin/partners");
    } catch (error) {
      const message = getApiErrorMessage(error);
      setErrorMessage(message);
      notefyError(message);
    } finally {
      setIsSaving(false);
    }
  }

  // Show loading and fetch errors before the edit form.
  if (loading) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50 px-6 py-16">
        <p className="mx-auto max-w-3xl text-center text-slate-600">
          جارٍ تحميل بيانات الشريك...
        </p>
      </main>
    );
  }

  if (loadError || !partner || !formData) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-2xl px-6 py-16">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-[#3d2a1c]">
              تعذر فتح الشريك
            </h1>
            <p role="alert" className="mt-3 text-red-600">
              {loadError || `لم يتم العثور على الشريك بالمعرّف ${id}.`}
            </p>
            <Link
              to="/admin/partners"
              className="mt-6 inline-block rounded-xl bg-[#78B33B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d2a1c]"
            >
              ← العودة إلى الشركاء
            </Link>
          </div>
        </section>
      </main>
    );
  }

 

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Header and back navigation. */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            to="/admin/partners"
            className="mb-4 inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#78B33B]"
          >
            ← العودة إلى الشركاء
          </Link>
          <p className="mb-2 text-sm font-semibold text-[#78B33B]">
            إدارة المحتوى
          </p>
          <h1 className="text-3xl font-bold text-[#3d2a1c]">تعديل الشريك</h1>
          <p className="mt-2 text-slate-500">
            حدّث بيانات الشريك وترجماته ثم احفظ التعديلات.
          </p>
        </div>
      </section>

      {/* Edit form and preview. */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2"
          >
            <h2 className="mb-6 text-xl font-bold text-[#3d2a1c]">
              بيانات الشريك
            </h2>

            {errorMessage && (
              <p
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {errorMessage}
              </p>
            )}

            <fieldset
              disabled={isSaving || isUploading}
              className="m-0 min-w-0 border-0 p-0"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <FieldSelect
                  id="partner-type"
                  label="نوع الشريك"
                  name="type"
                  value={formData.type}
                  onChange={handleBaseChange}
                >
                  {PARTNER_TYPES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </FieldSelect>

                <FieldInput
                  id="partner-order"
                  label="ترتيب العرض"
                  name="sort_order"
                  type="number"
                  min="0"
                  max="32000"
                  step="1"
                  value={formData.sort_order}
                  onChange={handleBaseChange}
                />

                <FieldInput
                  id="partner-website"
                  label="الموقع الإلكتروني (اختياري)"
                  name="website_url"
                  type="url"
                  maxLength={500}
                  value={formData.website_url}
                  onChange={handleBaseChange}
                />
              </div>

              <div className="my-5 flex flex-wrap gap-6">
                <CheckField
                  name="is_active"
                  checked={Boolean(formData.is_active)}
                  onChange={handleBaseChange}
                  label="الشريك نشط"
                />
                <CheckField
                  name="show_on_home"
                  checked={Boolean(formData.show_on_home)}
                  onChange={handleBaseChange}
                  label="إظهار على الصفحة الرئيسية"
                />
              </div>

              {/* Edit translated fields. */}
              <section className="mb-6 rounded-2xl border border-slate-200 p-5">
                <h3 className="mb-4 font-bold text-[#3d2a1c]">ترجمات الشريك</h3>

                <div
                  role="tablist"
                  aria-label="لغات الشريك"
                  className="mb-5 flex flex-wrap gap-2"
                >
                  {LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      type="button"
                      role="tab"
                      aria-selected={activeLanguage === language.code}
                      onClick={() => setActiveLanguage(language.code)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                        activeLanguage === language.code
                          ? "bg-[#78B33B] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>

                <div dir={activeLanguage === "ar" ? "rtl" :"ltr" }>
                  <FieldInput
                    id={`partner-name-${activeLanguage}`}
                    label="اسم الشريك"
                    name="name"
                    value={activeTranslation.name ?? ""}
                    onChange={handleTranslationChange}
                    required={activeLanguage === "ar"}
                    maxLength={200}
                  />

                  <FieldTextarea
                    id={`partner-description-${activeLanguage}`}
                    label="الوصف"
                    name="description"
                    value={activeTranslation.description ?? ""}
                    onChange={handleTranslationChange}
                    rows={5}
                  />
                </div>
              </section>

              {/* Replace the partner logo. */}
              <div className="mb-6">
                <label
                  htmlFor="partner-logo"
                  className="mb-2 block text-sm font-semibold text-[#3d2a1c]"
                >
                  شعار الشريك
                </label>

                <input
                  id="partner-logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  disabled={isUploading || isSaving}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                />

                {uploadMessage && (
                  <p role="status" className="mt-2 text-sm text-slate-600">
                    {uploadMessage}
                  </p>
                )}

                {logoPreviewUrl && (
                  <div className="mt-3">
                    <img
                      src={logoPreviewUrl}
                      alt="معاينة شعار الشريك"
                      className="h-40 w-full rounded-xl bg-slate-100 object-contain p-4"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setFormData((current) => ({
                          ...current,
                          logo_media_id: null,
                        }));
                        setLogoPreviewUrl("");
                        setUploadMessage("تم إزالة الشعار من سجل الشريك.");
                      }}
                      className="mt-2 text-sm font-semibold text-red-600 hover:underline"
                    >
                      إزالة الشعار
                    </button>
                  </div>
                )}
              </div>
            </fieldset>

            {/* Save or cancel. */}
            <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
              <button
                type="submit"
                disabled={isSaving || isUploading}
                className="rounded-xl bg-[#78B33B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d2a1c] disabled:opacity-60"
              >
                {isSaving ? "جارٍ حفظ التعديلات..." : "حفظ التعديلات"}
              </button>

              <Link
                to="/admin/partners"
                className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-[#3d2a1c] hover:text-white"
              >
                إلغاء
              </Link>
            </div>
          </form>

          {/* Live preview. */}
          <PartnerPreview
            name={activeTranslation.name}
            description={activeTranslation.description}
            type={formData.type}
            logoUrl={logoPreviewUrl}
            isActive={formData.is_active}
          />
        </div>
      </section>
    </main>
  );
};

// Shared input components.
function FieldInput({ id, label, className = "", ...props }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#3d2a1c]"
      >
        {label}
      </label>
      <input id={id} className={`${INPUT_CLASS} ${className}`} {...props} />
    </div>
  );
}

function FieldSelect({ id, label, children, ...props }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#3d2a1c]"
      >
        {label}
      </label>
      <select id={id} className={INPUT_CLASS} {...props}>
        {children}
      </select>
    </div>
  );
}

function FieldTextarea({ id, label, className = "", ...props }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#3d2a1c]"
      >
        {label}
      </label>
      <textarea id={id} className={`${INPUT_CLASS} ${className}`} {...props} />
    </div>
  );
}

function CheckField({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <input type="checkbox" className="h-4 w-4 accent-[#78B33B]" {...props} />
      {label}
    </label>
  );
}

function PartnerPreview({ name, description, type, logoUrl, isActive }) {
  const typeLabel =
    PARTNER_TYPES.find((item) => item.value === type)?.label ?? type;

  return (
    <aside>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-xl font-bold text-[#3d2a1c]">معاينة الشريك</h2>
        </div>

        <div className="flex h-48 items-center justify-center bg-slate-100 p-6">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={name || "شعار الشريك"}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span className="text-5xl text-slate-400" aria-hidden>
              🤝
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {typeLabel}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {isActive ? "نشط" : "غير نشط"}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#3d2a1c]">
            {name || "اسم الشريك"}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description || "سيظهر وصف الشريك هنا."}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminPartnersEdit;
