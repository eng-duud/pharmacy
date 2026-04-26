import PrescriptionForm from "@/components/PrescriptionForm";
import { ShieldCheck, Truck, Clock } from "lucide-react";

export default function UploadPrescriptionPage() {
  return (
    <main className="min-h-screen flex flex-col bg-medical-clean dark:bg-slate-950 transition-colors duration-300">
      <section className="py-12 md:py-20 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Info Side */}
            <div className="lg:w-1/3 space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                   خدمة إرسال <span className="text-primary dark:text-primary-light">الوصفة الطبية</span>
                 </h1>
                 <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                   وفر وقتك وجهدك.. قم بتصوير وصفتك الطبية وسنقوم بتوفير كافة الأدوية المذكورة وتوصيلها لباب منزلك في أسرع وقت.
                 </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-teal dark:text-teal-light shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">خصوصية تامة</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">نتعامل مع بياناتكم الطبية والوصفات بمنتهى السرية والأمان.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-teal dark:text-teal-light shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">توصيل سريع</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">خدمة التوصيل تغطي كافة مناطق صنعاء خلال 30-60 دقيقة.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-teal dark:text-teal-light shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">متواجدون دائماً</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">نستقبل طلباتكم على مدار الساعة طوال أيام الأسبوع.</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-3xl border border-primary/10 dark:border-primary/20">
                <h4 className="font-bold text-primary dark:text-primary-light mb-2">هل تحتاج لمساعدة؟</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">يمكنك التواصل مع الصيدلي مباشرة عبر الهاتف:</p>
                <div className="flex flex-col gap-2 font-bold text-primary">
                  <a href="tel:770709062" className="hover:underline">770709062</a>
                  <a href="tel:781116769" className="hover:underline">781116769</a>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-2/3 w-full">
              <PrescriptionForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
