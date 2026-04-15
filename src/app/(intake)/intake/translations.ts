export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];

export type Dict = {
  dir: "ltr" | "rtl";
  [key: string]: string;
};

export const translations: Record<Locale, Dict> = {
  en: {
    dir: "ltr",
    clinic: "Noor Dental Clinic",
    clinicTagline: "Patient Form",
    switchToLang: "العربية",
    switchAria: "Switch to Arabic",

    heroEyebrow: "Welcome",
    heroTitle: "A few details,",
    heroTitleItalic: "before your visit.",
    heroLead:
      "A short form so we can prepare for you. All information stays confidential.",
    timeHint: "Takes about 2 minutes.",

    errorBanner: "Please check the highlighted fields.",
    requiredMark: "required",
    errRequired: "Required",

    // Section 1 — General details
    s1Num: "1",
    s1Title: "About you",
    s1Sub: "The basics.",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone (WhatsApp)",
    phonePlaceholder: "+213 555 000 000",
    dob: "Date of birth",
    gender: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    genderOther: "Prefer not to say",
    city: "City",

    // Section 2 — Health background
    s2Num: "2",
    s2Title: "Health background",
    s2Sub: "Past or present — anything that applies.",
    conditionsIntro: "Medical conditions",
    condDiabetes: "Diabetes",
    condHypertension: "High blood pressure",
    condHeart: "Heart disease",
    condAsthma: "Asthma",
    condKidney: "Kidney disease",
    condLiver: "Liver / hepatitis",
    condThyroid: "Thyroid",
    condEpilepsy: "Epilepsy",
    condBleeding: "Bleeding disorder",
    condCancer: "Cancer",
    condHiv: "HIV / immune",
    condOsteo: "Osteoporosis",
    condPsych: "Anxiety / depression",
    condNone: "None of the above",
    otherConditions: "Other conditions",
    otherConditionsPlaceholder: "Optional",
    medications: "Medications you take",
    medicationsPlaceholder: "Name & dose if known — optional",
    allergies: "Allergies",
    allergiesPlaceholder: "E.g. penicillin, latex — optional",
    smoker: "Do you smoke?",
    smokerYes: "Yes",
    smokerNo: "No",
    smokerFormer: "Former",
    pregnantLabel: "Pregnant or breastfeeding?",
    pregnantYes: "Yes",
    pregnantNo: "No",
    pregnantNA: "Not applicable",

    // Section 3 — Consent
    s3Num: "3",
    s3Title: "Consent",
    s3Sub: "",
    consent:
      "The information above is accurate, and I consent to its use for my dental care. It will be kept confidential.",

    submit: "Submit",
    submitting: "Sending…",

    // Confirmation
    confirmTitle: "Thank you,",
    confirmLead:
      "Your form was received. The clinic will review it before your visit.",
    confirmRef: "Ref",
    confirmCall:
      "If anything changes, reply on WhatsApp — we'll update your file.",
    returnHome: "Back",
    notFoundTitle: "Form not found.",
    notFoundLead: "The link may have expired. Please reopen it.",
  },

  ar: {
    dir: "rtl",
    clinic: "عيادة نور لطب الأسنان",
    clinicTagline: "استمارة المريض",
    switchToLang: "English",
    switchAria: "التحويل إلى الإنجليزية",

    heroEyebrow: "أهلاً بك",
    heroTitle: "بعض المعلومات،",
    heroTitleItalic: "قبل زيارتك.",
    heroLead:
      "استمارة قصيرة لنتمكن من التحضير لزيارتك. جميع المعلومات تبقى سرية.",
    timeHint: "تستغرق حوالي دقيقتين.",

    errorBanner: "يُرجى مراجعة الحقول المظللة.",
    requiredMark: "مطلوب",
    errRequired: "مطلوب",

    // Section 1
    s1Num: "1",
    s1Title: "بياناتك",
    s1Sub: "المعلومات الأساسية.",
    firstName: "الاسم",
    lastName: "اللقب",
    phone: "رقم الهاتف (واتساب)",
    phonePlaceholder: "+213 555 000 000",
    dob: "تاريخ الميلاد",
    gender: "الجنس",
    genderMale: "ذكر",
    genderFemale: "أنثى",
    genderOther: "أفضل عدم الذكر",
    city: "المدينة",

    // Section 2
    s2Num: "2",
    s2Title: "الحالة الصحية",
    s2Sub: "حالياً أو سابقاً — كل ما ينطبق عليك.",
    conditionsIntro: "الأمراض",
    condDiabetes: "السكري",
    condHypertension: "ضغط الدم",
    condHeart: "أمراض القلب",
    condAsthma: "الربو",
    condKidney: "أمراض الكلى",
    condLiver: "الكبد / التهاب الكبد",
    condThyroid: "الغدة الدرقية",
    condEpilepsy: "الصرع",
    condBleeding: "اضطرابات النزيف",
    condCancer: "السرطان",
    condHiv: "نقص المناعة",
    condOsteo: "هشاشة العظام",
    condPsych: "القلق / الاكتئاب",
    condNone: "لا شيء مما سبق",
    otherConditions: "أمراض أخرى",
    otherConditionsPlaceholder: "اختياري",
    medications: "الأدوية التي تتناولها",
    medicationsPlaceholder: "الاسم والجرعة إن أمكن — اختياري",
    allergies: "الحساسيات",
    allergiesPlaceholder: "مثل البنسلين، اللاتكس — اختياري",
    smoker: "هل تدخن؟",
    smokerYes: "نعم",
    smokerNo: "لا",
    smokerFormer: "سابقاً",
    pregnantLabel: "هل أنتِ حامل أو مرضعة؟",
    pregnantYes: "نعم",
    pregnantNo: "لا",
    pregnantNA: "لا ينطبق",

    // Section 3
    s3Num: "3",
    s3Title: "الموافقة",
    s3Sub: "",
    consent:
      "المعلومات أعلاه صحيحة، وأوافق على استخدامها لأغراض علاجي السني. وستبقى سرية.",

    submit: "إرسال",
    submitting: "جارٍ الإرسال…",

    confirmTitle: "شكراً لك،",
    confirmLead: "تم استلام استمارتك. ستتم مراجعتها قبل موعدك.",
    confirmRef: "الرقم",
    confirmCall: "إذا تغيّر أي شيء، يكفي الرد عبر واتساب — وسنقوم بتحديث ملفك.",
    returnHome: "رجوع",
    notFoundTitle: "لم يتم العثور على الاستمارة.",
    notFoundLead: "قد يكون الرابط منتهي الصلاحية. يُرجى فتحه من جديد.",
  },
};
