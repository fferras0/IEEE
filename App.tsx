import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStream } from './components/TechStream';
import { NewsSection } from './components/NewsSection';
import { NeoCard } from './components/ui/NeoCard';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { Chatbot } from './components/Chatbot';
import { Globe, Shield, Zap, Database, ArrowUp, Users, Target, History, Mail, Send, CheckCircle, Github, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
          const newLang = document.documentElement.getAttribute('lang') as 'en' | 'ar';
          setLang(newLang || 'en');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const t = {
    en: {
      coreDivisions: "CORE DIVISIONS",
      sector: "/ACCESSING_DATABASE/SECTOR_01",
      subtitle: "Exploring the pillars of modern engineering.",
      globalConn: "Global Connectivity",
      globalDesc: "Connecting engineers across 160+ countries to foster technological innovation.",
      standardization: "Standardization",
      standardDesc: "Setting the industry standards for telecommunications, IT, and power generation.",
      emerging: "Emerging Tech",
      emergingDesc: "Leading research in Quantum Computing, IoT, and Artificial Intelligence.",
      library: "Digital Library",
      libraryDesc: "Access to over 5 million documents in the IEEE Xplore digital library.",
      historyTitle: "SYSTEM LEGACY",
      historySub: "ARCHIVED DATA LOGS",
      milestone1Year: "1884",
      milestone1Title: "AIEE INITIALIZED",
      milestone1Desc: "American Institute of Electrical Engineers founded by Thomas Edison and Alexander Graham Bell.",
      milestone2Year: "1912",
      milestone2Title: "IRE PROTOCOL",
      milestone2Desc: "Institute of Radio Engineers established to govern wireless transmission standards.",
      milestone3Year: "1963",
      milestone3Title: "SYSTEM MERGE: IEEE",
      milestone3Desc: "AIEE and IRE fuse to form the Institute of Electrical and Electronics Engineers.",
      milestone4Year: "2025",
      milestone4Title: "GLOBAL NETWORK",
      milestone4Desc: "The world's largest technical professional organization dedicated to advancing technology.",
      missionTitle: "OUR MISSION",
      missionSub: "ADVANCING TECHNOLOGY FOR HUMANITY",
      missionDesc: "IEEE and its members inspire a global community to innovate for a better tomorrow through its more than 423,000 members in over 160 countries.",
      stat1: "Members",
      stat2: "Countries",
      stat3: "Conferences",
      stat4: "Standards",
      teamTitle: "SYSTEM ARCHITECTS",
      teamSub: "THE MINDS BEHIND THE GRID",
      role1: "Lead Architect",
      role2: "Quantum Engineer",
      role3: "Network Ops",
      role4: "AI Specialist",
      bio1: "Pioneering the next generation of neural interfaces.",
      bio2: "Specializing in entanglement and superposition.",
      bio3: "Ensuring 99.999% uptime across the global mesh.",
      bio4: "Developing ethical synthetic consciousness.",
      joinTitle: "GLOBAL NEXUS",
      joinSub: "INITIATE MEMBERSHIP PROTOCOL",
      joinText1: "We are building the infrastructure for the next century. IEEE is not merely an organization; it is a collective intelligence engine powering the advancement of humanity.",
      joinText2: "By joining the grid, you gain access to unrestricted knowledge streams, global networking protocols, and the ability to shape the standards that will define our digital reality.",
      joinBenefit1: "Access to IEEE Xplore Digital Library",
      joinBenefit2: "Professional Networking & Mentorship",
      joinBenefit3: "Discounts on Conferences & Certifications",
      joinBtn: "INITIALIZE ACCESS",
      contactTitle: "SECURE TRANSMISSION",
      contactSub: "ESTABLISH UPLINK",
      labelName: "IDENTIFIER // NAME",
      labelEmail: "DIGITAL_ID // EMAIL",
      labelMsg: "DATA_PACKET // MESSAGE",
      btnSubmit: "TRANSMIT DATA",
      btnSending: "TRANSMITTING...",
      btnSuccess: "TRANSMISSION COMPLETE"
    },
    ar: {
      coreDivisions: "الأقسام الرئيسية",
      sector: "/الوصول_إلى_قاعدة_البيانات/قطاع_01",
      subtitle: "استكشاف ركائز الهندسة الحديثة.",
      globalConn: "الاتصال العالمي",
      globalDesc: "ربط المهندسين في أكثر من 160 دولة لتعزيز الابتكار التكنولوجي.",
      standardization: "المعايير القياسية",
      standardDesc: "وضع معايير الصناعة للاتصالات وتكنولوجيا المعلومات وتوليد الطاقة.",
      emerging: "التقنيات الناشئة",
      emergingDesc: "ريادة الأبحاث في الحوسبة الكمومية، إنترنت الأشياء، والذكاء الاصطناعي.",
      library: "المكتبة الرقمية",
      libraryDesc: "الوصول إلى أكثر من 5 ملايين وثيقة في مكتبة IEEE الرقمية.",
      historyTitle: "تاريخ النظام",
      historySub: "سجلات البيانات المؤرشفة",
      milestone1Year: "1884",
      milestone1Title: "تأسيس AIEE",
      milestone1Desc: "تأسيس المعهد الأمريكي لمهندسي الكهرباء من قبل توماس إديسون وألكسندر جراهام بيل.",
      milestone2Year: "1912",
      milestone2Title: "بروتوكول IRE",
      milestone2Desc: "تأسيس معهد مهندسي الراديو لحكم معايير البث اللاسلكي.",
      milestone3Year: "1963",
      milestone3Title: "اندماج النظام: IEEE",
      milestone3Desc: "اندماج AIEE و IRE لتشكيل معهد مهندسي الكهرباء والإلكترونيات.",
      milestone4Year: "2025",
      milestone4Title: "الشبكة العالمية",
      milestone4Desc: "أكبر منظمة مهنية فنية في العالم مكرسة لتعزيز التكنولوجيا.",
      missionTitle: "رسالتنا",
      missionSub: "تعزيز التكنولوجيا من أجل الإنسانية",
      missionDesc: "تلهم IEEE وأعضاؤها مجتمعاً عالمياً للابتكار من أجل غد أفضل من خلال أكثر من 423,000 عضو في أكثر من 160 دولة.",
      stat1: "عضو",
      stat2: "دولة",
      stat3: "مؤتمر",
      stat4: "معيار",
      teamTitle: "مهندسو النظام",
      teamSub: "العقول خلف الشبكة",
      role1: "كبير المهندسين",
      role2: "مهندس كمي",
      role3: "عمليات الشبكة",
      role4: "اخصائي ذكاء اصطناعي",
      bio1: "ريادة الجيل القادم من الواجهات العصبية.",
      bio2: "مختص في التشابك والتراكب الكمي.",
      bio3: "ضمان استقرار الشبكة بنسبة 99.999٪ عالمياً.",
      bio4: "تطوير الوعي الاصطناعي الأخلاقي.",
      joinTitle: "الرابطة العالمية",
      joinSub: "بدء بروتوكول العضوية",
      joinText1: "نحن نبني البنية التحتية للقرن القادم. IEEE ليست مجرد منظمة؛ إنها محرك ذكاء جماعي يغذي تقدم البشرية.",
      joinText2: "من خلال الانضمام إلى الشبكة، يمكنك الوصول إلى تدفقات المعرفة غير المقيدة، وبروتوكولات التواصل العالمية، والقدرة على صياغة المعايير التي ستحدد واقعنا الرقمي.",
      joinBenefit1: "الوصول إلى مكتبة IEEE Xplore الرقمية",
      joinBenefit2: "التواصل المهني والإرشاد",
      joinBenefit3: "خصومات على المؤتمرات والشهادات",
      joinBtn: "بدء الوصول",
      contactTitle: "إرسال آمن",
      contactSub: "إنشاء اتصال",
      labelName: "المعرف // الاسم",
      labelEmail: "البريد الإلكتروني // المعرف",
      labelMsg: "الرسالة // حزمة البيانات",
      btnSubmit: "إرسال البيانات",
      btnSending: "جاري الإرسال...",
      btnSuccess: "تم الإرسال بنجاح"
    }
  };

  const content = lang === 'en' ? t.en : t.ar;
  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen bg-neo-black text-neo-white selection:bg-neo-blue selection:text-black ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Navbar />
      <main>
        <Hero />
        <section id="about" className="py-24 bg-neo-black scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
                            {lang === 'en' ? <>CORE <span className="text-neo-blue">DIVISIONS</span></> : <>الأقسام <span className="text-neo-blue">الرئيسية</span></>}
                        </h2>
                        <div className="h-1 w-24 bg-neo-blue"></div>
                    </div>
                    <p className="text-neo-gray max-w-md text-right font-mono mt-4 md:mt-0">
                        {content.sector}<br/>{content.subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: content.globalConn, desc: content.globalDesc, icon: <Globe className="w-8 h-8 text-neo-blue"/> },
                        { title: content.standardization, desc: content.standardDesc, icon: <Shield className="w-8 h-8 text-neo-blue"/> },
                        { title: content.emerging, desc: content.emergingDesc, icon: <Zap className="w-8 h-8 text-neo-blue"/> },
                        { title: content.library, desc: content.libraryDesc, icon: <Database className="w-8 h-8 text-neo-blue"/> }
                    ].map((feature, i) => (
                        <ScrollReveal key={i} delay={i * 100}>
                            <NeoCard className="h-full">
                                <div className="mb-4 p-3 bg-neo-blue/10 w-fit rounded border border-neo-blue/20">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold font-sans mb-2 tracking-wide group-hover:text-neo-blue transition-colors">{feature.title}</h3>
                                <p className="text-neo-gray text-sm leading-relaxed">{feature.desc}</p>
                            </NeoCard>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>

        <TechStream />

        <section id="mission" className="py-24 bg-neo-dark relative border-y border-neo-gray/5">
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
             <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2">
                   <ScrollReveal>
                       <div className="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-3 py-1 rounded-full text-xs font-mono mb-6">
                          <Target className="w-4 h-4" />
                          <span>{content.missionTitle}</span>
                       </div>
                       <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-neo-white mb-6 leading-tight">
                           {lang === 'en' ? <>ENGINEERING THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-blue to-white">FUTURE REALITY</span></> : <>هندسة <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-blue to-white">واقع المستقبل</span></>}
                       </h2>
                       <p className="text-neo-gray text-lg leading-relaxed mb-8 border-l-2 border-neo-blue pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
                           {content.missionDesc}
                       </p>
                       <div className="grid grid-cols-2 gap-4">
                           {[
                               { l: content.stat1, v: "423K+" },
                               { l: content.stat2, v: "160+" },
                               { l: content.stat3, v: "2,000+" },
                               { l: content.stat4, v: "1,300+" }
                           ].map((s, i) => (
                               <div key={i} className="bg-neo-card border border-neo-gray/10 p-4 hover:border-neo-blue/30 transition-colors">
                                   <div className="flex items-center gap-2 text-neo-blue mb-2">
                                       <Users className="w-5 h-5" />
                                       <span className="font-bold font-orbitron text-2xl text-white">{s.v}</span>
                                   </div>
                                   <p className="text-xs font-mono text-neo-gray uppercase tracking-wider">{s.l}</p>
                               </div>
                           ))}
                       </div>
                   </ScrollReveal>
                </div>
                <div className="lg:w-1/2 relative">
                   <ScrollReveal delay={200}>
                       <div className="relative z-10 bg-neo-card p-2 border border-neo-blue/20 rotate-2 hover:rotate-0 transition-transform duration-500">
                          <div className="absolute -inset-1 bg-neo-blue/20 blur-lg opacity-50"></div>
                          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" alt="IEEE Tech" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500 relative z-10 border border-neo-gray/20" />
                          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur border border-neo-blue/30 p-3 z-20">
                              <p className="font-mono text-xs text-neo-blue">SYS.IMG_884 // LAB_01</p>
                          </div>
                       </div>
                   </ScrollReveal>
                </div>
              </div>
            </div>
        </section>

        <section id="history" className="py-24 bg-neo-black relative scroll-mt-20 overflow-hidden">
             <div className="absolute inset-0 bg-grid-bg opacity-10 pointer-events-none"></div>
             <div className="container mx-auto px-6 relative z-10">
                <div className="flex items-end justify-between mb-20">
                    <ScrollReveal>
                        <div>
                           <div className="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-3 py-1 rounded-full text-xs font-mono mb-4">
                              <History className="w-4 h-4" />
                              <span className="tracking-widest uppercase">{content.historySub}</span>
                           </div>
                           <h2 className="text-4xl font-orbitron font-bold text-neo-white">{content.historyTitle}</h2>
                        </div>
                    </ScrollReveal>
                </div>
                <div className="flex flex-col gap-6">
                    {[
                        { y: content.milestone1Year, t: content.milestone1Title, d: content.milestone1Desc },
                        { y: content.milestone2Year, t: content.milestone2Title, d: content.milestone2Desc },
                        { y: content.milestone3Year, t: content.milestone3Title, d: content.milestone3Desc },
                        { y: content.milestone4Year, t: content.milestone4Title, d: content.milestone4Desc },
                    ].map((item, index) => (
                        <ScrollReveal key={index} delay={index * 100}>
                            <div className="group relative w-full bg-neo-dark border-y border-neo-gray/10 hover:border-neo-blue hover:bg-neo-blue/5 transition-all duration-300 py-8 px-6 flex flex-col md:flex-row items-start md:items-center gap-8 overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-neo-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="md:w-1/4 flex-shrink-0 relative">
                                    <span className="text-6xl md:text-8xl font-orbitron font-black text-transparent stroke-white opacity-20 group-hover:opacity-40 group-hover:text-neo-blue transition-all duration-300 select-none" style={{WebkitTextStroke: '1px rgba(255,255,255,0.3)'}}>{item.y}</span>
                                </div>
                                <div className="hidden md:block h-[1px] w-12 bg-neo-gray/30 group-hover:bg-neo-blue transition-colors"></div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-bold text-neo-white font-mono uppercase group-hover:text-neo-blue transition-colors mb-2">{item.t}</h3>
                                    <p className="text-neo-gray font-mono text-sm leading-relaxed max-w-2xl">{item.d}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
             </div>
        </section>

        <section id="join" className="py-24 bg-neo-black relative scroll-mt-20">
             <div className="container mx-auto px-6">
                 <ScrollReveal>
                    <div className="text-center mb-16">
                      <h2 className="text-4xl font-orbitron font-bold mb-2 text-neo-white">{content.teamTitle}</h2>
                      <p className="text-neo-blue font-mono text-sm tracking-widest uppercase">{content.teamSub}</p>
                    </div>
                 </ScrollReveal>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[
                         { n: "Dr. Sarah Connor", r: content.role1, b: content.bio1 },
                         { n: "James T. Kirk", r: content.role2, b: content.bio2 },
                         { n: "Ada Lovelace", r: content.role3, b: content.bio3 },
                         { n: "Alan Turing", r: content.role4, b: content.bio4 },
                     ].map((m, i) => (
                         <ScrollReveal key={i} delay={i * 150}>
                             <NeoCard className="h-full text-center group">
                                 <div className="relative w-24 h-24 mx-auto mb-6 rounded-full border-2 border-neo-blue/30 flex items-center justify-center bg-neo-black group-hover:border-neo-blue group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all">
                                     <Users className="w-12 h-12 text-neo-gray group-hover:text-neo-blue transition-colors" />
                                 </div>
                                 <h3 className="text-xl font-bold text-neo-white font-orbitron mb-1 group-hover:text-neo-blue transition-colors">{m.n}</h3>
                                 <p className="text-xs font-mono text-neo-gray uppercase mb-4 pb-2 border-b border-neo-gray/10">{m.r}</p>
                                 <p className="text-sm text-neo-gray/80 leading-relaxed font-sans">{m.b}</p>
                             </NeoCard>
                         </ScrollReveal>
                     ))}
                 </div>
             </div>
        </section>

        <div className="w-full bg-neo-blue py-2 overflow-hidden transform -rotate-1 scroll-mt-24">
            <div className="whitespace-nowrap animate-marquee flex gap-8 text-black font-bold font-mono">
                {Array(10).fill(lang === 'en' ? "IEEE INNOVATION // ADVANCING TECHNOLOGY // FUTURE FORWARD // " : "IEEE ابتكار // تقدم تكنولوجي // نحو المستقبل // ").map((t, i) => (
                    <span key={i}>{t}</span>
                ))}
            </div>
        </div>

         <section className="py-24 bg-neo-blue/5 border-t border-neo-blue/10">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <ScrollReveal>
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-neo-white mb-6">{content.joinTitle}</h2>
                    <p className="text-neo-gray text-lg mb-8">{content.joinText1}</p>
                    <div className="grid md:grid-cols-3 gap-4 mb-10 text-left">
                        {[content.joinBenefit1, content.joinBenefit2, content.joinBenefit3].map((b, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm font-mono text-neo-white">
                                <CheckCircle className="w-4 h-4 text-neo-blue flex-shrink-0" />
                                <span>{b}</span>
                            </div>
                        ))}
                    </div>
                    <button className="bg-neo-blue text-black font-bold font-mono px-8 py-4 rounded hover:bg-white transition-all uppercase tracking-widest">
                        {content.joinBtn}
                    </button>
                </ScrollReveal>
            </div>
         </section>

        <NewsSection />

        <section id="contact" className="py-24 bg-neo-dark relative border-t border-neo-gray/10">
           <div className="container mx-auto px-6 max-w-2xl">
              <ScrollReveal>
                  <div className="text-center mb-12">
                     <div className="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-3 py-1 rounded-full text-xs font-mono mb-4">
                        <Mail className="w-4 h-4" />
                        <span>{content.contactSub}</span>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-neo-white">{content.contactTitle}</h2>
                  </div>
              </ScrollReveal>
              <form onSubmit={handleContactSubmit} className="space-y-6 bg-neo-card p-8 border border-neo-gray/20 shadow-lg relative overflow-hidden group hover:border-neo-blue/50 transition-all duration-300">
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neo-blue to-transparent opacity-50"></div>
                 <div className="space-y-2">
                    <label className="text-xs font-mono text-neo-blue tracking-widest uppercase">{content.labelName}</label>
                    <input type="text" required className="w-full bg-neo-black border border-neo-gray/30 p-3 text-neo-white focus:outline-none focus:border-neo-blue transition-colors font-mono" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-mono text-neo-blue tracking-widest uppercase">{content.labelEmail}</label>
                    <input type="email" required className="w-full bg-neo-black border border-neo-gray/30 p-3 text-neo-white focus:outline-none focus:border-neo-blue transition-colors font-mono" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-mono text-neo-blue tracking-widest uppercase">{content.labelMsg}</label>
                    <textarea rows={4} className="w-full bg-neo-black border border-neo-gray/30 p-3 text-neo-white focus:outline-none focus:border-neo-blue transition-colors font-mono"></textarea>
                 </div>
                 <button 
                    type="submit" 
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                    className={`w-full font-mono font-bold uppercase tracking-widest py-4 transition-all flex items-center justify-center gap-2 ${
                        formStatus === 'success' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-neo-blue text-black hover:bg-white'
                    }`}
                 >
                    {formStatus === 'idle' && (
                        <><span>{content.btnSubmit}</span> <Send className="w-4 h-4" /></>
                    )}
                    {formStatus === 'submitting' && (
                        <><span>{content.btnSending}</span> <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div></>
                    )}
                    {formStatus === 'success' && (
                        <><span>{content.btnSuccess}</span> <CheckCircle className="w-4 h-4" /></>
                    )}
                 </button>
              </form>
           </div>
        </section>

        <footer className="bg-neo-dark pt-16 pb-8 border-t border-neo-gray/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                   <div class="col-span-1 md:col-span-2">
                      <h2 className="text-2xl font-orbitron font-bold text-neo-white mb-4">IEEE</h2>
                      <p className="text-neo-gray max-w-sm mb-6">{content.globalDesc}</p>
                      <div className="flex gap-4">
                         {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map(social => (
                             <a key={social} href="#" className="text-xs font-mono text-neo-blue border border-neo-blue/30 px-3 py-1 hover:text-neo-white hover:bg-neo-blue/10 transition-colors uppercase rounded">
                                 {social}
                             </a>
                         ))}
                         <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-neo-blue border border-neo-blue/30 px-3 py-1 hover:text-neo-white hover:bg-neo-blue/10 transition-colors uppercase rounded flex items-center gap-1">
                             <Github className="w-3 h-3" />
                             GitHub
                         </a>
                      </div>
                   </div>
                   <div>
                      <h4 className="font-bold text-neo-white mb-4 text-sm uppercase tracking-widest">Navigation</h4>
                      <ul className="space-y-2 text-neo-gray font-mono text-sm">
                          {['Home', 'Societies', 'Conferences', 'Standards', 'Careers'].map(item => (
                              <li key={item}>
                                  <a href="#" className="hover:text-neo-blue transition-colors flex items-center gap-1">
                                      <ChevronRight className="w-3 h-3 text-neo-blue" />
                                      {item}
                                  </a>
                              </li>
                          ))}
                      </ul>
                   </div>
                   <div>
                      <h4 className="font-bold text-neo-white mb-4 text-sm uppercase tracking-widest">Contact</h4>
                      <p className="text-neo-gray text-sm font-mono">3 Park Avenue, 17th Floor<br/>New York, NY 10016-5997<br/>USA<br/><br/><span className="text-neo-blue">contact@ieee.org</span></p>
                   </div>
                </div>
                <div className="border-t border-neo-gray/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neo-gray font-mono">
                    <div className="flex flex-col md:flex-row gap-4 items-center mb-4 md:mb-0">
                       <p>&copy; 2025 IEEE. All rights reserved.</p>
                       <span className="hidden md:inline text-neo-blue/50">|</span>
                       <p className="text-neo-blue animate-pulse">Made by Hussain</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-neo-white">Privacy Policy</a>
                        <a href="#" className="hover:text-neo-white">Terms & Conditions</a>
                        <a href="#" className="hover:text-neo-white">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>

      </main>

      <AccessibilityWidget />
      <Chatbot />

      <button 
        onClick={() => window.scrollTo({top:0,behavior:'smooth'})} 
        className={`fixed bottom-40 right-8 bg-neo-blue text-black p-3 z-40 hover:bg-neo-white transition-all duration-500 shadow-lg shadow-neo-blue/30 rounded-full ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default App;
