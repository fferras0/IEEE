import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TechStream } from './components/TechStream';
import { NewsSection } from './components/NewsSection';
import { NeoCard } from './components/ui/NeoCard';
import { ScrollReveal } from './components/ui/ScrollReveal';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { Chatbot } from './components/Chatbot';
import { Globe, Shield, Zap, Database, ArrowUp, Users, Target, History, Award, User, CircleUser, CheckCircle, ChevronRight, Mail, Send, Clock, CircleDot, Check, Server, Code } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Listen for language changes triggered by AccessibilityWidget
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

  // Handle Scroll for Back To Top Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
      // Reset after a delay
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
      // History Section
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
      // Mission Section
      missionTitle: "OUR MISSION",
      missionSub: "ADVANCING TECHNOLOGY FOR HUMANITY",
      missionDesc: "IEEE and its members inspire a global community to innovate for a better tomorrow through its more than 423,000 members in over 160 countries.",
      stat1: "Members",
      stat2: "Countries",
      stat3: "Conferences",
      stat4: "Standards",
      // Team Section
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
      // Join/Vision Section
      joinTitle: "GLOBAL NEXUS",
      joinSub: "INITIATE MEMBERSHIP PROTOCOL",
      joinText1: "We are building the infrastructure for the next century. IEEE is not merely an organization; it is a collective intelligence engine powering the advancement of humanity.",
      joinText2: "By joining the grid, you gain access to unrestricted knowledge streams, global networking protocols, and the ability to shape the standards that will define our digital reality.",
      joinBenefit1: "Access to IEEE Xplore Digital Library",
      joinBenefit2: "Professional Networking & Mentorship",
      joinBenefit3: "Discounts on Conferences & Certifications",
      joinBtn: "INITIALIZE ACCESS",
      // Contact Section
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
      // History Section
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
      // Mission Section
      missionTitle: "رسالتنا",
      missionSub: "تعزيز التكنولوجيا من أجل الإنسانية",
      missionDesc: "تلهم IEEE وأعضاؤها مجتمعاً عالمياً للابتكار من أجل غد أفضل من خلال أكثر من 423,000 عضو في أكثر من 160 دولة.",
      stat1: "عضو",
      stat2: "دولة",
      stat3: "مؤتمر",
      stat4: "معيار",
      // Team Section
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
      // Join/Vision Section
      joinTitle: "الرابطة العالمية",
      joinSub: "بدء بروتوكول العضوية",
      joinText1: "نحن نبني البنية التحتية للقرن القادم. IEEE ليست مجرد منظمة؛ إنها محرك ذكاء جماعي يغذي تقدم البشرية.",
      joinText2: "من خلال الانضمام إلى الشبكة، يمكنك الوصول إلى تدفقات المعرفة غير المقيدة، وبروتوكولات التواصل العالمية، والقدرة على صياغة المعايير التي ستحدد واقعنا الرقمي.",
      joinBenefit1: "الوصول إلى مكتبة IEEE Xplore الرقمية",
      joinBenefit2: "التواصل المهني والإرشاد",
      joinBenefit3: "خصومات على المؤتمرات والشهادات",
      joinBtn: "بدء الوصول",
      // Contact Section
      contactTitle: "إرسال آمن",
      contactSub: "إنشاء اتصال",
      labelName: "المعرف // الاسم",
      labelEmail: "الهوية الرقمية // البريد الإلكتروني",
      labelMsg: "حزمة البيانات // الرسالة",
      btnSubmit: "إرسال البيانات",
      btnSending: "جاري الإرسال...",
      btnSuccess: "تم الإرسال بنجاح"
    }
  };

  const text = t[lang];

  const features = [
    { title: text.globalConn, desc: text.globalDesc, icon: <Globe className="w-8 h-8 text-neo-blue" /> },
    { title: text.standardization, desc: text.standardDesc, icon: <Shield className="w-8 h-8 text-neo-blue" /> },
    { title: text.emerging, desc: text.emergingDesc, icon: <Zap className="w-8 h-8 text-neo-blue" /> },
    { title: text.library, desc: text.libraryDesc, icon: <Database className="w-8 h-8 text-neo-blue" /> }
  ];

  const historyEvents = [
    { year: text.milestone1Year, title: text.milestone1Title, desc: text.milestone1Desc },
    { year: text.milestone2Year, title: text.milestone2Title, desc: text.milestone2Desc },
    { year: text.milestone3Year, title: text.milestone3Title, desc: text.milestone3Desc },
    { year: text.milestone4Year, title: text.milestone4Title, desc: text.milestone4Desc },
  ];

  const team = [
    { name: "Dr. Sarah Connor", role: text.role1, bio: text.bio1 },
    { name: "James T. Kirk", role: text.role2, bio: text.bio2 },
    { name: "Ada Lovelace", role: text.role3, bio: text.bio3 },
    { name: "Alan Turing", role: text.role4, bio: text.bio4 }
  ];

  const stats = [
    { label: text.stat1, value: "423K+", icon: <Users className="w-5 h-5" /> },
    { label: text.stat2, value: "160+", icon: <Globe className="w-5 h-5" /> },
    { label: text.stat3, value: "2,000+", icon: <History className="w-5 h-5" /> },
    { label: text.stat4, value: "1,300+", icon: <Award className="w-5 h-5" /> }
  ];

  const benefits = [text.joinBenefit1, text.joinBenefit2, text.joinBenefit3];

  const footerLinkClass = "text-xs font-mono text-neo-blue border border-neo-blue/30 px-3 py-1 hover:text-neo-white hover:bg-neo-blue/10 transition-colors uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-neo-blue focus-visible:ring-offset-2 focus-visible:ring-offset-neo-black rounded";
  const navLinkClass = "hover:text-neo-blue transition-colors focus:outline-none focus-visible:text-neo-blue focus-visible:underline focus-visible:underline-offset-4 rounded p-1";

  return (
    <div className={`min-h-screen bg-neo-black text-neo-white selection:bg-neo-blue selection:text-black transition-colors duration-300 relative`}>
      <Navbar />
      
      <main>
        <Hero />
        
        {/* About / Features Section */}
        <section id="about" className="py-24 relative overflow-hidden scroll-mt-20">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                  <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
                     {lang === 'ar' ? (
                       <>الأقسام <span className="text-neo-blue">الرئيسية</span></>
                     ) : (
                       <>CORE <span className="text-neo-blue">DIVISIONS</span></>
                     )}
                  </h2>
                  <div className="h-1 w-24 bg-neo-blue"></div>
                </div>
                <p className="text-neo-gray max-w-md text-right font-mono mt-4 md:mt-0">
                  {text.sector}<br/>
                  {text.subtitle}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <ScrollReveal key={i} delay={i * 100} className="h-full">
                  <NeoCard className="h-full">
                    <div className="group/icon relative mb-4 p-3 bg-neo-blue/10 w-fit rounded border border-neo-blue/20">
                      {f.icon}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-neo-black border border-neo-blue text-[10px] font-mono text-neo-blue uppercase opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                        {f.title}
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neo-black border-r border-b border-neo-blue rotate-45"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold font-sans mb-2 tracking-wide text-neo-white group-hover:text-neo-blue transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-neo-gray text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </NeoCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* AI Tech Stream */}
        <TechStream />

        {/* MISSION SECTION */}
        <section id="mission" className="py-24 bg-neo-dark relative border-y border-neo-gray/5">
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2">
                   <div className="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-3 py-1 rounded-full text-xs font-mono mb-6">
                      <Target className="w-4 h-4" />
                      <span>{text.missionTitle}</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-neo-white mb-6 leading-tight">
                     {lang === 'ar' ? "بناء المستقبل" : "ENGINEERING THE"} <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-blue to-white">
                        {lang === 'ar' ? "التكنولوجي" : "FUTURE REALITY"}
                     </span>
                   </h2>
                   <p className="text-neo-gray text-lg leading-relaxed mb-8 border-l-2 border-neo-blue pl-6">
                      {text.missionDesc}
                   </p>
                   
                   <div className="grid grid-cols-2 gap-4">
                      {stats.map((stat, i) => (
                        <div key={i} className="bg-neo-card border border-neo-gray/10 p-4 hover:border-neo-blue/30 transition-colors">
                           <div className="flex items-center gap-2 text-neo-blue mb-2">
                             {stat.icon}
                             <span className="font-bold font-orbitron text-2xl text-white">{stat.value}</span>
                           </div>
                           <p className="text-xs font-mono text-neo-gray uppercase tracking-wider">{stat.label}</p>
                        </div>
                      ))}
                   </div>
                </div>
                
                <div className="lg:w-1/2 relative">
                   <div className="relative z-10 bg-neo-card p-2 border border-neo-blue/20 rotate-2 hover:rotate-0 transition-transform duration-500">
                      <div className="absolute -inset-1 bg-neo-blue/20 blur-lg opacity-50"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                        alt="IEEE Tech" 
                        className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500 relative z-10 border border-neo-gray/20"
                      />
                      <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur border border-neo-blue/30 p-3 z-20">
                         <p className="font-mono text-xs text-neo-blue">SYS.IMG_884 // LAB_01</p>
                      </div>
                   </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* HISTORY SECTION */}
        <section id="history" className="py-24 bg-neo-black relative scroll-mt-20 overflow-hidden">
          <div class="absolute inset-0 bg-grid-bg opacity-10 pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-20">
                <div>
                   <div className="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-3 py-1 rounded-full text-xs font-mono mb-4">
                      <Server className="w-4 h-4" />
                      <span className="tracking-widest uppercase">{text.historySub}</span>
                   </div>
                   <h2 className="text-4xl font-orbitron font-bold text-neo-white">{text.historyTitle}</h2>
                </div>
                <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-neo-blue to-transparent"></div>
              </div>
            </ScrollReveal>

            {/* Blocks Layout */}
            <div className="flex flex-col gap-6">
                {historyEvents.map((item, index) => (
                     <ScrollReveal key={index} delay={index * 100} className="w-full">
                        <div className="group relative w-full bg-neo-dark border-y border-neo-gray/10 hover:border-neo-blue hover:bg-neo-blue/5 transition-all duration-300 py-8 px-6 flex flex-col md:flex-row items-start md:items-center gap-8 overflow-hidden">
                           
                           {/* Hover Effect Bar */}
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-neo-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           
                           {/* Year Block */}
                           <div className="md:w-1/4 flex-shrink-0 relative">
                              <span className="text-6xl md:text-8xl font-orbitron font-black text-transparent text-stroke-white opacity-20 group-hover:opacity-40 group-hover:text-neo-blue transition-all duration-300 select-none">
                                {item.year}
                              </span>
                              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neo-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                 INDEX_0{index + 1}
                              </div>
                           </div>

                           {/* Connector Line (Mobile hidden) */}
                           <div className="hidden md:block h-[1px] w-12 bg-neo-gray/30 group-hover:bg-neo-blue transition-colors"></div>

                           {/* Content Block */}
                           <div className="flex-grow">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-bold text-neo-white font-mono uppercase group-hover:text-neo-blue transition-colors">
                                   {item.title}
                                </h3>
                                <div className="hidden md:block px-2 py-0.5 border border-neo-blue/30 text-[10px] text-neo-blue font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                   SAVED
                                </div>
                              </div>
                              <p className="text-neo-gray font-mono text-sm leading-relaxed max-w-2xl">
                                 {item.desc}
                              </p>
                           </div>

                           {/* Icon Status */}
                           <div className="md:ml-auto opacity-20 group-hover:opacity-100 transition-opacity text-neo-blue">
                              <CircleDot className="w-8 h-8 animate-spin-slow" />
                           </div>

                        </div>
                     </ScrollReveal>
                ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="team" className="py-24 bg-neo-black relative scroll-mt-20">
           <div className="container mx-auto px-6">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-orbitron font-bold mb-2 text-neo-white">{text.teamTitle}</h2>
                  <p className="text-neo-blue font-mono text-sm tracking-widest uppercase">{text.teamSub}</p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {team.map((member, i) => (
                   <ScrollReveal key={i} delay={i * 150} className="h-full">
                      <div className="group h-full bg-neo-card border border-neo-gray/20 relative overflow-hidden hover:border-neo-blue transition-colors duration-300">
                         {/* Placeholder Avatar */}
                         <div className="relative h-48 bg-neo-dark flex items-center justify-center border-b border-neo-gray/10 group-hover:bg-neo-blue/5 transition-colors">
                             <div className="absolute inset-0 grid-bg opacity-30"></div>
                             <div className="relative z-10 w-24 h-24 rounded-full border-2 border-neo-blue/30 flex items-center justify-center bg-neo-black group-hover:border-neo-blue group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all">
                                 <CircleUser className="w-12 h-12 text-neo-gray group-hover:text-neo-blue transition-colors" />
                             </div>
                             {/* Corner accents */}
                             <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neo-blue/50"></div>
                             <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neo-blue/50"></div>
                         </div>
                         
                         {/* Content */}
                         <div className="p-6 relative text-center">
                            <h3 className="text-xl font-bold text-neo-white font-orbitron mb-1 group-hover:text-neo-blue transition-colors">{member.name}</h3>
                            <p className="text-xs font-mono text-neo-gray uppercase mb-4 pb-2">{member.role}</p>
                            <p className="text-sm text-neo-gray/80 leading-relaxed font-sans">{member.bio}</p>
                            
                            <div className="mt-4 flex justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                               <div className="w-1 h-1 bg-neo-blue rounded-full"></div>
                               <div className="w-1 h-1 bg-neo-blue rounded-full animate-pulse"></div>
                               <div className="w-1 h-1 bg-neo-blue rounded-full"></div>
                            </div>
                         </div>
                      </div>
                   </ScrollReveal>
                 ))}
              </div>
           </div>
        </section>

        {/* Marquee Separator */}
        <div className="w-full bg-neo-blue py-2 overflow-hidden transform -rotate-1 scroll-mt-24">
          <div className="whitespace-nowrap animate-marquee flex gap-8 text-black font-bold font-mono">
             {Array(10).fill(lang === 'ar' ? "IEEE ابتكار // تقدم تكنولوجي // نحو المستقبل // " : "IEEE INNOVATION // ADVANCING TECHNOLOGY // FUTURE FORWARD // ").map((t, i) => (
               <span key={i}>{t}</span>
             ))}
          </div>
        </div>

        {/* News Section */}
        <NewsSection />

        {/* MEMBERSHIP Section */}
        <section id="join" className="py-24 bg-neo-black relative border-t border-neo-gray/10 scroll-mt-20 overflow-hidden">
           <div className="absolute inset-0 bg-neo-blue/5 grid-bg opacity-20 pointer-events-none"></div>
           <div className="container mx-auto px-6 relative z-10">
              <ScrollReveal>
                 <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-4 py-1 rounded-full text-xs font-mono mb-8">
                       <Shield className="w-4 h-4" />
                       <span className="tracking-widest uppercase">{text.joinSub}</span>
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-8 leading-tight">
                       {text.joinTitle}
                    </h2>
                    
                    <div className="bg-neo-card border border-neo-blue/30 p-8 md:p-12 relative overflow-hidden group hover:border-neo-blue transition-all duration-500">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-neo-blue/10 rounded-full blur-[60px] group-hover:bg-neo-blue/20 transition-all"></div>
                       
                       <p className="text-xl md:text-2xl text-neo-white leading-relaxed font-sans mb-6">
                          {text.joinText1}
                       </p>
                       <p className="text-neo-gray text-lg leading-relaxed font-mono mb-10">
                          {text.joinText2}
                       </p>
                       
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
                          {benefits.map((benefit, i) => (
                             <div key={i} className="flex items-center gap-3 text-sm font-mono text-neo-white">
                                <CheckCircle className="w-5 h-5 text-neo-blue flex-shrink-0" />
                                <span>{benefit}</span>
                             </div>
                          ))}
                       </div>
                       
                       <button className="relative group inline-flex items-center gap-3 bg-neo-blue text-black font-mono font-bold uppercase tracking-widest px-8 py-4 clip-path-slant hover:bg-white transition-all transform hover:-translate-y-1">
                          <span>{text.joinBtn}</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                       </button>
                    </div>
                 </div>
              </ScrollReveal>
           </div>
        </section>

        {/* NEW: Contact Section (Updated to be interactive) */}
        <section id="contact" className="py-24 bg-neo-dark relative border-t border-neo-gray/10">
           <div className="container mx-auto px-6 max-w-2xl">
              <ScrollReveal>
                 <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 text-neo-blue border border-neo-blue/30 bg-neo-blue/5 px-3 py-1 rounded-full text-xs font-mono mb-4">
                       <Mail className="w-4 h-4" />
                       <span>{text.contactSub}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-neo-white">
                       {text.contactTitle}
                    </h2>
                 </div>

                 <form onSubmit={handleContactSubmit} className="space-y-6 bg-neo-card p-8 border border-neo-gray/20 shadow-lg relative overflow-hidden group hover:border-neo-blue/50 transition-all duration-300 reveal-on-scroll">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neo-blue to-transparent opacity-50"></div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-neo-blue tracking-widest uppercase">{text.labelName}</label>
                       <input required type="text" className="w-full bg-neo-black border border-neo-gray/30 p-3 text-neo-white focus:outline-none focus:border-neo-blue transition-colors font-mono" placeholder="Ex: John Doe" />
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-neo-blue tracking-widest uppercase">{text.labelEmail}</label>
                       <input required type="email" className="w-full bg-neo-black border border-neo-gray/30 p-3 text-neo-white focus:outline-none focus:border-neo-blue transition-colors font-mono" placeholder="Ex: unit@ieee.org" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-mono text-neo-blue tracking-widest uppercase">{text.labelMsg}</label>
                       <textarea rows={4} className="w-full bg-neo-black border border-neo-gray/30 p-3 text-neo-white focus:outline-none focus:border-neo-blue transition-colors font-mono" placeholder="..."></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                      className={`w-full font-mono font-bold uppercase tracking-widest py-4 transition-all flex items-center justify-center gap-2 group/btn ${
                        formStatus === 'success' 
                          ? 'bg-green-500 text-black' 
                          : 'bg-neo-blue text-black hover:bg-white'
                      }`}
                    >
                       {formStatus === 'idle' && (
                         <><span>{text.btnSubmit}</span><Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>
                       )}
                       {formStatus === 'submitting' && (
                         <><span>{text.btnSending}</span><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div></>
                       )}
                       {formStatus === 'success' && (
                         <><span>{text.btnSuccess}</span><Check className="w-4 h-4" /></>
                       )}
                    </button>
                 </form>
              </ScrollReveal>
           </div>
        </section>

        {/* Footer */}
        <footer className="bg-neo-black pt-16 pb-8 border-t border-neo-gray/10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-2xl font-orbitron font-bold text-neo-white mb-4">IEEE</h2>
                <p className="text-neo-gray max-w-sm mb-6">
                  {lang === 'ar' 
                    ? "تعزيز الابتكار التكنولوجي والتميز لصالح البشرية."
                    : "Fostering technological innovation and excellence for the benefit of humanity."}
                </p>
                <div className="flex gap-4 flex-wrap">
                  {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map(social => (
                    <a key={social} href="#" className={footerLinkClass}>
                      {social}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-neo-white mb-4 uppercase tracking-widest text-sm">
                  {lang === 'ar' ? "التنقل" : "Navigation"}
                </h4>
                <ul className="space-y-2 text-neo-gray font-mono text-sm">
                  {(lang === 'ar' 
                    ? ['الرئيسية', 'المجتمعات', 'المؤتمرات', 'المعايير', 'الوظائف'] 
                    : ['Home', 'Societies', 'Conferences', 'Standards', 'Careers']
                  ).map(item => (
                    <li key={item}><a href="#" className={navLinkClass}>&gt;&gt; {item}</a></li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-neo-white mb-4 uppercase tracking-widest text-sm">
                  {lang === 'ar' ? "اتصل بنا" : "Contact"}
                </h4>
                <p className="text-neo-gray text-sm font-mono">
                  3 Park Avenue, 17th Floor<br/>
                  New York, NY 10016-5997<br/>
                  USA<br/><br/>
                  <a href="mailto:contact@ieee.org" className="text-neo-blue hover:text-white transition-colors focus:outline-none focus-visible:underline">contact@ieee.org</a>
                </p>
              </div>
            </div>
            
            <div className="border-t border-neo-gray/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neo-gray font-mono">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                 <p>&copy; {new Date().getFullYear()} IEEE. All rights reserved.</p>
                 <span className="hidden md:inline text-neo-blue/50">|</span>
                 <p className="text-neo-blue animate-pulse">Made by Hussain</p>
              </div>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-neo-white focus:outline-none focus-visible:text-neo-blue focus-visible:underline">Privacy Policy</a>
                <a href="#" className="hover:text-neo-white focus:outline-none focus-visible:text-neo-blue focus-visible:underline">Terms & Conditions</a>
                <a href="#" className="hover:text-neo-white focus:outline-none focus-visible:text-neo-blue focus-visible:underline">Accessibility</a>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Back to Top - Moved UP to avoid overlap */}
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          aria-label="Scroll to top"
          className={`fixed bottom-40 right-8 bg-neo-blue text-black p-3 z-40 hover:bg-neo-white shadow-lg shadow-neo-blue/30 group transition-all duration-500 transform rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-neo-white ${
            showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <ArrowUp className="group-hover:-translate-y-1 transition-transform" />
        </button>

        {/* Accessibility Widget (Bottom Most) */}
        <AccessibilityWidget />
        
        {/* Chatbot (Stacked Above Accessibility) */}
        <Chatbot />

      </main>

      <style>{`
        .text-stroke-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }
        html.light .text-stroke-white {
           -webkit-text-stroke: 1px rgba(0,0,0,0.8);
           color: transparent;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .clip-path-slant {
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        /* Custom Scrollbar for Chat */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00f0ff;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default App;
}

{
type: uploaded file
fileName: fferras0/ieee/IEEE-1cbcbfe7563557d0a45f995cfa21c41691122546/package.json
fullContent:
{
  "name": "gemini-studio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@google/genai": "^1.33.0",
    "lucide-react": "^0.454.0",
    "marked": "^12.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5",
    "vite": "^5.2.0"
  }
}
}
