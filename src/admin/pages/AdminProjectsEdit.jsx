import {  useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../../data/api";
import { getMediaUrl } from "../../app/AuthContext";
import { notefyError,  notefySuccess } from "../../js/Tosats";

// const projectsData = [];
// Backend project lifecycle states. Values expected by the backend project schema.
const PROJECT_STATUSES = [
  { value: "planned", label: "مخطط" },
  { value: "ongoing", label: "قيد التنفيذ" },
  { value: "completed", label: "مكتمل" },
  { value: "suspended", label: "موقوف" },
];

// Backend publication states.
const PROJECT_VISIBILITIES = [
  { value: "draft", label: "مسودة" },
  { value: "scheduled", label: "مجدول" },
  { value: "published", label: "منشور" },
  { value: "archived", label: "مؤرشف" },
];

// These language codes match the backend validator.
const LANGUAGES = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
  { code: "ku", label: "Kurmanji" },
];

const EMPTY_TRANSLATION = {
  title: "",
  summary: "",
  description: "",
  objectives: "",
  results: "",
};

const INPUT_CLASS =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#78B33B] focus:bg-white";

const TEXTAREA_CLASS =
  "w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#78B33B] focus:bg-white";

// Read validation details from the API so rejected fields are visible.
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

// Convert optional numeric form values to numbers or null for the API.
function numberOrNull(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  return Number(value);
}

// Convert API dates to the YYYY-MM-DD string required by input[type="date"].
function dateInputValue(value) {
  if (!value) return "";

  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}


// Create a fresh translation object for each supported language.
function createEmptyTranslations() {
  return Object.fromEntries(
    LANGUAGES.map(({ code }) => [code, { ...EMPTY_TRANSLATION }]),
  );
}

// Check whether the user started entering content for a translation.
function hasTranslationContent(translation) {
  return Object.values(translation).some((value) => value.trim().length > 0);
}

///Main Function here ---------------

function AdminProjectsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  // project data
  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState(null);
  // Text fields are stored separately for every language.
  const [translations, setTranslations] = useState(createEmptyTranslations);
  const [activeLanguage, setActiveLanguage] = useState("ar");

  // const [projectsData, setProjectsData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Image preview uses its URL; the API receives its media UUID.
  const [coverPreviewUrl, setCoverPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // Form status and API validation feedback.
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

 
    const activeTranslation = translations[activeLanguage];
    const activeStatus = PROJECT_STATUSES.find(
      (item) => item.value === formData?.status,
    );
    const activeVisibility = PROJECT_VISIBILITIES.find(
      (item) => item.value === formData?.visibility,
    );
  // Load the full admin record so drafts and all translations are available.
  useEffect(() => {
    const controller = new AbortController();
    const loadProject = async () => {
      setLoading(true);
      setLoadError("");
      setProject(null);
      setFormData(null);
      try {
        // Api already has /api in its base URL.
        const result = await Api.get(`projects/admin/${id}`, {
          signal: controller.signal, //add with controler
        });
        const loadedProject = result.data?.data;
        if (!loadedProject) {
          throw new Error("لم يتم العثور على المشروع.");
        }
        if (controller.signal.aborted) return;

        setProject(loadedProject);
        // Fill each language tab from the backend translations array.
        const loadedTranslations = createEmptyTranslations();

        for (const translation of loadedProject.translations ?? []) {
          if (loadedTranslations[translation.lang_code]) {
            loadedTranslations[translation.lang_code] = {
              title: translation.title ?? "",
              summary: translation.summary ?? "",
              description: translation.description ?? "",
              objectives: translation.objectives ?? "",
              results: translation.results ?? "",
            };
          }
        }

        // Use the API's selected-language fields if Arabic translation is absent.
        if (!loadedTranslations.ar.title && loadedProject.title) {
          loadedTranslations.ar = {
            title: loadedProject.title ?? "",
            summary: loadedProject.summary ?? "",
            description: loadedProject.description ?? "",
            objectives: loadedProject.objectives ?? "",
            results: loadedProject.results ?? "",
          };
        }

        setTranslations(loadedTranslations);

        // Load shared, language-neutral project fields.
        setFormData({
          code: loadedProject.code ?? "",
          status: loadedProject.status ?? "planned",
          visibility: loadedProject.visibility ?? "draft",
          start_date: dateInputValue(loadedProject.start_date),
          end_date: dateInputValue(loadedProject.end_date),
          budget_amount:
            loadedProject.budget_amount == null
              ? ""
              : String(loadedProject.budget_amount),
          budget_currency: loadedProject.budget_currency ?? "USD",
          show_budget: Boolean(loadedProject.show_budget),
          beneficiaries_total:
            loadedProject.beneficiaries_total == null
              ? ""
              : String(loadedProject.beneficiaries_total),
          beneficiaries_women:
            loadedProject.beneficiaries_women == null
              ? ""
              : String(loadedProject.beneficiaries_women),
          beneficiaries_men:
            loadedProject.beneficiaries_men == null
              ? ""
              : String(loadedProject.beneficiaries_men),
          beneficiaries_girls:
            loadedProject.beneficiaries_girls == null
              ? ""
              : String(loadedProject.beneficiaries_girls),
          beneficiaries_boys:
            loadedProject.beneficiaries_boys == null
              ? ""
              : String(loadedProject.beneficiaries_boys),
          cover_media_id: loadedProject.cover_media_id ?? null,
          is_featured: Boolean(loadedProject.is_featured),
        });

        setCoverPreviewUrl(
          loadedProject.cover_image
            ? getMediaUrl(loadedProject.cover_image)
            : "",
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
    };

    // setLoading(true); changed later for rendering
    void loadProject();

    return () => {
      controller.abort(); //added later
    };
  }, [id]);
  // Update shared, language-neutral project fields.
  function handleBaseChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Update text fields for the language currently selected.
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

  // Upload a cover image and store the returned media ID on the project.
  async function handleCoverImageChange(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadMessage("يرجى اختيار ملف صورة.");
      input.value = "";
      return;
    }

    const maxImageSize = 5 * 1024 * 1024;

    if (file.size > maxImageSize) {
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
      // The backend media route is POST /api/media and expects the "file" field.
      const response = await Api.post("/media", uploadData);
      const media = response.data?.data;

      if (!media?.id) {
        throw new Error("لم يرجع الخادم معرّف الصورة.");
      }

      setFormData((current) => ({
        ...current,
        cover_media_id: media.id,
      }));

      setCoverPreviewUrl(getMediaUrl(media.url));
      setUploadMessage("تم رفع صورة المشروع.");
    } catch (error) {
      const message = getApiErrorMessage(error);
      setUploadMessage(message);
      notefyError(message);
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  }

  // Validate the form and send an update request to the backend.
  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    if (!formData) return;

    if (isUploading) {
      setErrorMessage("انتظر حتى يكتمل رفع الصورة.");
      return;
    }

    if (!translations.ar.title.trim()) {
      setActiveLanguage("ar");
      setErrorMessage("أدخل اسم المشروع باللغة العربية.");
      return;
    }

    // Any translation with content must have its own title.
    const translationMissingTitle = LANGUAGES.find(({ code }) => {
      const translation = translations[code];
      const shouldBeIncluded =
        code === "ar" || hasTranslationContent(translation);

      return shouldBeIncluded && !translation.title.trim();
    });

    if (translationMissingTitle) {
      setActiveLanguage(translationMissingTitle.code);
      setErrorMessage(
        `أدخل عنوان المشروع باللغة ${translationMissingTitle.label}.`,
      );
      return;
    }

    const budgetCurrency = formData.budget_currency.trim().toUpperCase();

    if (!/^[A-Z]{3}$/.test(budgetCurrency)) {
      setErrorMessage("أدخل رمز عملة من ثلاثة أحرف، مثل USD.");
      return;
    }

    if (
      formData.start_date &&
      formData.end_date &&
      formData.start_date > formData.end_date
    ) {
      setErrorMessage("تاريخ الانتهاء يجب أن يكون بعد تاريخ البداية.");
      return;
    }

    const budgetAmount = numberOrNull(formData.budget_amount);

    if (
      budgetAmount !== null &&
      (!Number.isFinite(budgetAmount) || budgetAmount < 0)
    ) {
      setErrorMessage("أدخل ميزانية صحيحة.");
      return;
    }

    const beneficiaryFields = [
      formData.beneficiaries_total,
      formData.beneficiaries_women,
      formData.beneficiaries_men,
      formData.beneficiaries_girls,
      formData.beneficiaries_boys,
    ].map(numberOrNull);

    if (
      beneficiaryFields.some(
        (value) => value !== null && (!Number.isInteger(value) || value < 0),
      )
    ) {
      setErrorMessage("أعداد المستفيدين يجب أن تكون أعدادًا صحيحة موجبة.");
      return;
    }

    // Arabic is always submitted. Other languages are included when entered.
    const projectTranslations = LANGUAGES.filter(
      ({ code }) => code === "ar" || hasTranslationContent(translations[code]),
    ).map(({ code }) => {
      const translation = translations[code];

      return {
        lang_code: code,
        title: translation.title.trim(),
        summary: translation.summary.trim(),
        description: translation.description.trim(),
        objectives: translation.objectives.trim(),
        results: translation.results.trim(),
      };
    });

        // Send backend field names and numeric/boolean values.
    const payload = {
      code: formData.code.trim() || null,
      status: formData.status,
      visibility: formData.visibility,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      budget_amount: budgetAmount,
      budget_currency: budgetCurrency,
      show_budget: formData.show_budget,
      beneficiaries_total: beneficiaryFields[0],
      beneficiaries_women: beneficiaryFields[1],
      beneficiaries_men: beneficiaryFields[2],
      beneficiaries_girls: beneficiaryFields[3],
      beneficiaries_boys: beneficiaryFields[4],
      cover_media_id: formData.cover_media_id || null,
      is_featured: formData.is_featured,
      translations: projectTranslations,
    };

    // Match field names and value types expected by project.validation.service.js.
    setIsSaving(true);

    try {
      // Api's base URL includes /api, so this posts to /api/projects.
      await Api.patch(`/projects/${id}`, payload);
      notefySuccess("تم تعديل المشروع بنجاح.");
      navigate("/admin/projects");
    } catch (error) {
      const message = getApiErrorMessage(error);
      setErrorMessage(message);
      notefyError(message);
    } finally {
      setIsSaving(false);
    }
  }


   
    if (loading || (project && !formData)) {
      return null;
    }

    // Include Arabic plus any other languages entered in the form.
    // const projectTranslations = LANGUAGES.filter(
    //   ({ code }) => code === "ar" || hasTranslationContent(translations[code]),
    // ).map(({ code }) => {
    //   const translation = translations[code];

    //   return {
    //     lang_code: code,
    //     title: translation.title.trim(),
    //     summary: translation.summary.trim(),
    //     description: translation.description.trim(),
    //     objectives: translation.objectives.trim(),
    //     results: translation.results.trim(),
    //   };
    // });



  // Show loading or load errors before rendering the edit form.
  if (loading) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50 px-6 py-16">
        <p className="mx-auto max-w-3xl text-center text-slate-600">
          جارٍ تحميل بيانات المشروع...
        </p>
      </main>
    );
  }

  if (loadError || !project || !formData) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-2xl px-6 py-16">
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mb-5 text-5xl text-red-500">!</div>

            <h1 className="text-2xl font-bold text-[#3d2a1c]">
              المشروع غير موجود
            </h1>

            <p className="mt-3 text-slate-500">
              لم يتم العثور على مشروع بالمعرف: {id}
            </p>

            <Link
              to="/admin/projects"
              className="mt-6 inline-block rounded-xl bg-[#78B33B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d2a1c]"
            >
              ← العودة إلى المشاريع
            </Link>
          </div>
        </section>
      </main>
    );
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((current) => ({
  //     ...current,
  //     [name]: value,
  //   }));
  // };

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50">
      {/* Page heading and navigation. */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            to="/admin/projects"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#78B33B]"
          >
            ← العودة إلى المشاريع
          </Link>

          <p className="mb-2 text-sm font-semibold text-[#78B33B]">
            إدارة المحتوى
          </p>

          <h1 className="text-3xl font-bold text-[#3d2a1c]">تعديل المشروع</h1>

          <p className="mt-2 text-slate-500">
            حدّث بيانات المشروع وترجماته ثم احفظ التغييرات.
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
              بيانات المشروع
            </h2>

            {/* Show API and validation errors in the form. */}
            {errorMessage && (
              <p
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {errorMessage}
              </p>
            )}

            {/* Shared fields apply to every translation. */}
            <fieldset
              disabled={isSaving || isUploading}
              className="m-0 min-w-0 border-0 p-0"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <TextInput
                  id="project-code"
                  label="كود المشروع (اختياري)"
                  name="code"
                  value={formData.code}
                  onChange={handleBaseChange}
                  maxLength={40}
                />

                <SelectField
                  id="project-status"
                  label="حالة المشروع"
                  name="status"
                  value={formData.status}
                  onChange={handleBaseChange}
                >
                  {PROJECT_STATUSES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </SelectField>

                <SelectField
                  id="project-visibility"
                  label="ظهور المشروع"
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleBaseChange}
                >
                  {PROJECT_VISIBILITIES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </SelectField>

                <TextInput
                  id="project-start-date"
                  label="تاريخ البداية"
                  name="start_date"
                  type="date"
                  value={dateInputValue(formData.start_date) ?? ""}
                  onChange={handleBaseChange}
                />

                <TextInput
                  id="project-end-date"
                  label="تاريخ الانتهاء"
                  name="end_date"
                  type="date"
                  value={dateInputValue(formData.end_date) ?? ""}
                  onChange={handleBaseChange}
                />

                <TextInput
                  id="project-budget"
                  label="الميزانية"
                  name="budget_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.budget_amount}
                  onChange={handleBaseChange}
                />

                <TextInput
                  id="project-budget-currency"
                  label="رمز العملة"
                  name="budget_currency"
                  maxLength={3}
                  value={formData.budget_currency}
                  onChange={handleBaseChange}
                  required
                />

                <TextInput
                  id="beneficiaries-total"
                  label="إجمالي المستفيدين"
                  name="beneficiaries_total"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.beneficiaries_total}
                  onChange={handleBaseChange}
                />

                <TextInput
                  id="beneficiaries-women"
                  label="عدد النساء المستفيدات"
                  name="beneficiaries_women"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.beneficiaries_women}
                  onChange={handleBaseChange}
                />

                <TextInput
                  id="beneficiaries-men"
                  label="عدد الرجال المستفيدين"
                  name="beneficiaries_men"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.beneficiaries_men}
                  onChange={handleBaseChange}
                />

                <TextInput
                  id="beneficiaries-girls"
                  label="عدد الفتيات المستفيدات"
                  name="beneficiaries_girls"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.beneficiaries_girls}
                  onChange={handleBaseChange}
                />

                <TextInput
                  id="beneficiaries-boys"
                  label="عدد الفتيان المستفيدين"
                  name="beneficiaries_boys"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.beneficiaries_boys}
                  onChange={handleBaseChange}
                />
              </div>

              {/* Boolean project settings are checkboxes. */}
              <div className="my-6 flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="show_budget"
                    checked={formData.show_budget}
                    onChange={handleBaseChange}
                    className="h-4 w-4 accent-[#78B33B]"
                  />
                  إظهار الميزانية للعامة
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleBaseChange}
                    className="h-4 w-4 accent-[#78B33B]"
                  />
                  مشروع مميز
                </label>
              </div>

              {/* Edit translated project fields by language. */}
              <section className="mb-6 rounded-2xl border border-slate-200 p-5">
                <h3 className="mb-4 font-bold text-[#3d2a1c]">
                  ترجمات المشروع
                </h3>

                <div
                  role="tablist"
                  aria-label="لغات المشروع"
                  className="mb-5 flex flex-wrap gap-2"
                >
                  {LANGUAGES.map((language) => (
                    <button
                      key={language.code}
                      id={`language-tab-${language.code}`}
                      type="button"
                      role="tab"
                      aria-selected={activeLanguage === language.code}
                      aria-controls={`language-panel-${language.code}`}
                      onClick={() => setActiveLanguage(language.code)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        activeLanguage === language.code
                          ? "bg-[#78B33B] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>

                <div
                  id={`language-panel-${activeLanguage}`}
                  role="tabpanel"
                  aria-labelledby={`language-tab-${activeLanguage}`}
                  dir={activeLanguage === "en" ? "ltr" : "rtl"}
                >
                  <TextInput
                    id={`title-${activeLanguage}`}
                    label="اسم المشروع"
                    name="title"
                    value={activeTranslation.title}
                    onChange={handleTranslationChange}
                    required={activeLanguage === "ar"}
                    maxLength={250}
                  />

                  <TextAreaField
                    id={`summary-${activeLanguage}`}
                    label="الوصف المختصر"
                    name="summary"
                    value={activeTranslation.summary}
                    onChange={handleTranslationChange}
                    rows={3}
                  />

                  <TextAreaField
                    id={`description-${activeLanguage}`}
                    label="الوصف الكامل"
                    name="description"
                    value={activeTranslation.description}
                    onChange={handleTranslationChange}
                    rows={6}
                  />

                  <TextAreaField
                    id={`objectives-${activeLanguage}`}
                    label="أهداف المشروع"
                    name="objectives"
                    value={activeTranslation.objectives}
                    onChange={handleTranslationChange}
                    rows={4}
                  />

                  <TextAreaField
                    id={`results-${activeLanguage}`}
                    label="نتائج المشروع"
                    name="results"
                    value={activeTranslation.results}
                    onChange={handleTranslationChange}
                    rows={4}
                  />
                </div>
              </section>

              {/* Upload replacement cover image and update the media ID. */}
              <div className="mb-6">
                <label
                  htmlFor="project-cover"
                  className="mb-2 block text-sm font-semibold text-[#3d2a1c]"
                >
                  صورة غلاف المشروع
                </label>

                <input
                  id="project-cover"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  disabled={isUploading || isSaving}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                />

                {uploadMessage && (
                  <p role="status" className="mt-2 text-sm text-slate-600">
                    {uploadMessage}
                  </p>
                )}

                {coverPreviewUrl && (
                  <div className="mt-3">
                    <img
                      src={coverPreviewUrl}
                      alt="معاينة صورة المشروع"
                      className="h-40 w-full rounded-xl object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setFormData((current) => ({
                          ...current,
                          cover_media_id: null,
                        }));
                        setCoverPreviewUrl("");
                        setUploadMessage("تم إزالة صورة الغلاف من المشروع.");
                      }}
                      className="mt-2 text-sm font-semibold text-red-600 hover:underline"
                    >
                      إزالة صورة الغلاف
                    </button>
                  </div>
                )}
              </div>
            </fieldset>

            {/* Save changes or return to the project list. */}
            <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
              <button
                type="submit"
                disabled={isSaving || isUploading}
                aria-busy={isSaving}
                className="rounded-xl bg-[#78B33B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d2a1c] disabled:cursor-wait disabled:opacity-60"
              >
                {isSaving
                  ? "جارٍ حفظ التعديلات..."
                  : isUploading
                  ? "جارٍ رفع الصورة..."
                  : "حفظ التعديلات"}
              </button>

              <Link
                to="/admin/projects"
                className="rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#3d2a1c] hover:text-white"
              >
                إلغاء
              </Link>
            </div>
          </form>

          {/* Preview shows the currently selected language and statuses. */}
          <aside>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5">
                <h2 className="text-xl font-bold text-[#3d2a1c]">
                  معاينة المشروع
                </h2>
              </div>

              <div className="flex h-56 items-center justify-center overflow-hidden bg-slate-200">
                {coverPreviewUrl ? (
                  <img
                    src={coverPreviewUrl}
                    alt={activeTranslation.title || "معاينة المشروع"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-5xl text-slate-400" aria-hidden="true">
                    ▧
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#78B33B]/10 px-3 py-1 text-xs font-semibold text-[#527D27]">
                    {activeStatus?.label ?? formData.status}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {activeVisibility?.label ?? formData.visibility}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-[#3d2a1c]">
                  {activeTranslation.title || "اسم المشروع"}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {activeTranslation.summary ||
                    activeTranslation.description ||
                    "سيظهر وصف المشروع هنا."}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
// Reusable labeled text/number/date input.
function TextInput({ id, label, className = "", ...props }) {
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

// Reusable labeled select.
function SelectField({ id, label, children, ...props }) {
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

// Reusable labeled text area.
function TextAreaField({ id, label, className = "", ...props }) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#3d2a1c]"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`${TEXTAREA_CLASS} ${className}`}
        {...props}
      />
    </div>
  );
}
export default AdminProjectsEdit;
