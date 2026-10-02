/**
 * Arabic strings for the bilingual AI training quote request page (`/quote`).
 *
 * Keys are the exact English labels rendered by the page, so the component can
 * call `t('Company')` and fall back to English when a key is missing. Option
 * lists in `quoteForm.ts` use the same English labels as their keys, which
 * keeps the values stored in Firestore language independent.
 */

import type { QuoteLanguage } from '../types';

export const ARABIC_STRINGS: Readonly<Record<string, string>> = {
  // Hero / page chrome
  'Request an AI training quote': 'اطلب عرض سعر لتدريب الذكاء الاصطناعي',
  'Bring an AI educator to your team or classroom': 'استضف مدرّب ذكاء اصطناعي لفريقك أو فصلك',
  "Tell us what you'd like taught, to whom, and when. We'll reply with a tailored quote.":
    'أخبرنا بما تريد تدريسه ولمن ومتى، وسنرسل لك عرض سعر مخصصاً.',
  'Your request': 'طلبك',
  'Request my quote': 'اطلب عرض السعر',
  "No payment now. We'll confirm availability and pricing by email.":
    'لا دفع الآن. سنؤكد التوافر والسعر عبر البريد الإلكتروني.',
  'Sending…': 'جارٍ الإرسال…',
  'Request received': 'تم استلام الطلب',
  "Thanks. We'll email you a tailored quote shortly.": 'شكراً لك. سنرسل لك عرض سعر مخصصاً قريباً.',
  'Your reference:': 'رقمك المرجعي:',
  'Submit another request': 'إرسال طلب آخر',
  'Back to home': 'العودة إلى الصفحة الرئيسية',
  'Privacy Policy': 'سياسة الخصوصية',
  'Terms of Service': 'شروط الخدمة',
  'Optional': 'اختياري',
  'Show the form in Arabic': 'اعرض النموذج بالعربية',
  'Show the form in English': 'اعرض النموذج بالإنجليزية',

  // Who is this for
  'Who is this for?': 'لمن هذا الطلب؟',
  Company: 'شركة',
  'RAKEZ member': 'عضو راكز',
  School: 'مدرسة',
  Other: 'أخرى',
  'Organisation name': 'اسم المؤسسة',
  'RAKEZ licence number (optional)': 'رقم رخصة راكز (اختياري)',
  'Contact name': 'اسم المسؤول',
  Email: 'البريد الإلكتروني',
  'Phone / WhatsApp (optional)': 'الهاتف / واتساب (اختياري)',

  // Topics
  'What should we teach?': 'ماذا نُدرّس؟',
  'Pick as many as you like.': 'اختر ما تشاء من المواضيع.',
  'AI fundamentals': 'أساسيات الذكاء الاصطناعي',
  'Generative AI & ChatGPT': 'الذكاء الاصطناعي التوليدي وChatGPT',
  'Prompt engineering': 'هندسة الأوامر (Prompts)',
  'AI for business productivity': 'الذكاء الاصطناعي لرفع الإنتاجية',
  'AI for marketing & content': 'الذكاء الاصطناعي للتسويق والمحتوى',
  'AI in education & lesson planning': 'الذكاء الاصطناعي في التعليم وتخطيط الدروس',
  'AI for teachers': 'الذكاء الاصطناعي للمعلمين',
  'AI ethics & safety': 'أخلاقيات وسلامة الذكاء الاصطناعي',
  'Data & analytics with AI': 'البيانات والتحليل بالذكاء الاصطناعي',
  'Automation & AI agents': 'الأتمتة ووكلاء الذكاء الاصطناعي',
  'AI strategy for leaders': 'استراتيجية الذكاء الاصطناعي للقادة',
  'Coding with AI': 'البرمجة بالذكاء الاصطناعي',
  'Something else?': 'موضوع آخر؟',
  'e.g. AI for our customer support team': 'مثال: الذكاء الاصطناعي لفريق خدمة العملاء',

  // Attendees
  'Who is attending?': 'من سيحضر؟',
  'Number of learners': 'عدد المتدرّبين',
  'Fewer learners': 'تقليل عدد المتدرّبين',
  'More learners': 'زيادة عدد المتدرّبين',
  'Current AI experience': 'الخبرة الحالية بالذكاء الاصطناعي',
  Beginners: 'مبتدئون',
  'Some experience': 'خبرة متوسطة',
  Advanced: 'متقدمون',
  'Mixed levels': 'مستويات مختلطة',
  Audience: 'الفئة',
  'Leadership / managers': 'القيادات / المديرون',
  'Staff / professionals': 'الموظفون / المهنيون',
  'Teachers / educators': 'المعلمون / التربويون',
  Students: 'الطلاب',
  Mixed: 'مختلطة',
  Delivery: 'طريقة التقديم',
  'On-site at our location': 'في موقعنا',
  Online: 'عن بُعد',
  'Either works': 'كلاهما مناسب',
  'Location (emirate / venue)': 'الموقع (الإمارة / المكان)',
  'e.g. RAKEZ, Ras Al Khaimah': 'مثال: راكز، رأس الخيمة',

  // When
  'When would you like it?': 'متى تفضّل الموعد؟',
  'Pick up to 5 preferred dates, then the times that suit you.':
    'اختر حتى 5 تواريخ مفضلة ثم الأوقات المناسبة.',
  'Start time': 'وقت البدء',
  'End time': 'وقت الانتهاء',
  'Session length': 'مدة الجلسة',
  'Half day (3–4 hours)': 'نصف يوم (3–4 ساعات)',
  'Full day': 'يوم كامل',
  'Multi-day programme': 'برنامج متعدد الأيام',
  'Short talk (1–2 hours)': 'محاضرة قصيرة (1–2 ساعة)',
  'Not sure yet': 'لم أحدد بعد',
  'Anything else we should know?': 'هل من ملاحظات أخرى؟',
  'Previous month': 'الشهر السابق',
  'Next month': 'الشهر التالي',
  'Preferred date': 'تاريخ مفضل',

  // Summary
  For: 'الجهة',
  Topics: 'المواضيع',
  Learners: 'المتدرّبون',
  'Preferred dates': 'التواريخ المفضلة',
  Length: 'المدة',
  'Your organisation': 'مؤسستك',
  'None chosen yet': 'لم يُحدد بعد',
  'Not set': 'غير محدد',

  // Validation / errors
  'Enter your organisation name.': 'أدخل اسم المؤسسة.',
  'Enter a contact name.': 'أدخل اسم المسؤول.',
  'Enter a valid email address.': 'أدخل بريداً إلكترونياً صحيحاً.',
  'Please choose at least one topic or describe your own.':
    'اختر موضوعاً واحداً على الأقل أو اكتب موضوعك.',
  "We couldn't send your request. Please try again, or email us at":
    'تعذّر إرسال طلبك. حاول مجدداً أو راسلنا على',
};

/** Translates a page label, falling back to the English source string. */
export function translate(lang: QuoteLanguage, text: string): string {
  if (lang === 'ar') {
    return ARABIC_STRINGS[text] ?? text;
  }
  return text;
}

/** Returns a `t()` helper bound to one language for the quote request page. */
export function createTranslator(lang: QuoteLanguage): (text: string) => string {
  return (text: string) => translate(lang, text);
}

/** Locale string used for dates and month names (`ar-AE` gets Arabic months). */
export function localeFor(lang: QuoteLanguage): string {
  return lang === 'ar' ? 'ar-AE' : 'en-GB';
}
