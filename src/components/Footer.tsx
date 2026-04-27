import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo.jpg" 
                alt="صيدلية القدس" 
                width={48} 
                height={48} 
                className="w-12 h-12 rounded-full object-cover shadow-lg border-2 border-slate-700"
              />
              <span className="text-2xl font-black tracking-tight">صيدلية <span className="text-teal-light">القدس</span></span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              صيدلية القدس.. شريككم في الصحة والعافية. نقدم خدماتنا في قلب صنعاء بأعلى معايير الجودة والاحترافية الطبية.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1E1m9XYrMs/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
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
              <a 
                href="https://maps.app.goo.gl/69CLAtYuntC72XWz9?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 font-medium leading-relaxed hover:text-primary transition-colors"
              >
                صنعاء - دار سلم - نهاية الجسر باتجاه الحثيلي
              </a>
            </div>
            <a 
              href="https://maps.app.goo.gl/69CLAtYuntC72XWz9?g_st=aw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 rounded-2xl overflow-hidden relative group h-32 bg-slate-800 border border-slate-700 hover:border-primary/50 transition-all shadow-inner flex flex-col items-center justify-center"
            >
               {/* Decorative map-like background */}
               <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" 
                    style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
               
               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                   <MapPin className="w-6 h-6 text-primary" />
                 </div>
                 <span className="text-xs text-slate-300 font-bold tracking-wider">فتح الخريطة التفاعلية</span>
               </div>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-10 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} صيدلية القدس. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
