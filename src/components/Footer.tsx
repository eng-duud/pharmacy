import Link from "next/link";
import { Phone, MapPin, Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                ق
              </div>
              <span className="text-2xl font-black tracking-tight">صيدلية <span className="text-teal-light">القدس</span></span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              صيدلية القدس.. شريككم في الصحة والعافية. نقدم خدماتنا في قلب صنعاء بأعلى معايير الجودة والاحترافية الطبية.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-teal-light rounded-full" />
              روابط سريعة
            </h3>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">تصفح المنتجات</Link></li>
              <li><Link href="/upload-prescription" className="hover:text-white transition-colors">إرسال وصفة طبية</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">تواصل معنا</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-teal-light rounded-full" />
              تواصل معنا
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold mb-1">اتصل بنا</div>
                  <div className="flex flex-col font-bold">
                    <a href="tel:770709062" className="hover:text-primary transition-colors">770709062</a>
                    <a href="tel:781116769" className="hover:text-primary transition-colors">781116769</a>
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold mb-1">البريد الإلكتروني</div>
                  <div className="font-bold">info@quds-pharma.com</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-teal-light rounded-full" />
              موقعنا
            </h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                صنعاء - دار سلم - نهاية الجسر باتجاه الحثيلي
              </p>
            </div>
            <div className="mt-6 rounded-2xl overflow-hidden grayscale contrast-125 opacity-50 hover:opacity-100 transition-opacity h-32 bg-slate-800 flex items-center justify-center">
               <span className="text-xs text-slate-500 italic">خريطة الموقع قريباً...</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-10 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} صيدلية القدس. جميع الحقوق محفوظة. صنعاء، اليمن.</p>
        </div>
      </div>
    </footer>
  );
}
