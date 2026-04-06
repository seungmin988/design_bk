/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail,
  ChevronRight,
  ChevronLeft,
  Play,
  ArrowUpRight,
  Home,
  Sparkles,
  Heart,
  Coffee
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  description: string;
}

// --- Mock Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "청담 자이 하이엔드 펜트하우스",
    category: "Full Remodeling",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    location: "서울 강남구 청담동",
    description: "미니멀리즘과 럭셔리의 조화. 최고급 대리석과 원목을 사용하여 시대를 초월한 우아함을 완성했습니다."
  },
  {
    id: 2,
    title: "한남 더 힐 모던 클래식 하우스",
    category: "Interior Styling",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop",
    location: "서울 용산구 한남동",
    description: "자연 채광을 극대화한 설계와 부드러운 곡선미가 돋보이는 가구 배치로 아늑한 휴식처를 제안합니다."
  },
  {
    id: 3,
    title: "반포 래미안 원베일리 키친 & 다이닝",
    category: "Kitchen Reform",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    location: "서울 서초구 반포동",
    description: "요리가 즐거워지는 스마트한 동선과 프리미엄 빌트인 가전의 완벽한 조화를 구현했습니다."
  },
  {
    id: 4,
    title: "성수 아크로서울포레스트 리빙룸",
    category: "Living Room",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
    location: "서울 성동구 성수동",
    description: "탁 트인 시티뷰와 어우러지는 모던한 인테리어. 갤러리 같은 거실 공간을 완성했습니다."
  }
];

const SERVICES = [
  {
    title: "전체 리모델링",
    description: "노후된 공간을 완전히 새로운 분위기로 탈바꿈시키는 종합 인테리어 솔루션입니다.",
    icon: <Home className="w-6 h-6" />
  },
  {
    title: "부분 스타일링",
    description: "가구 배치와 소품 큐레이션만으로도 공간에 새로운 생명력을 불어넣습니다.",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    title: "친환경 자재 시공",
    description: "가족의 건강을 생각하여 엄선된 친환경 자재만을 사용하여 안전하게 시공합니다.",
    icon: <Heart className="w-6 h-6" />
  }
];

// --- Components ---

const Logo = () => (
  <div className="flex flex-col items-start leading-none">
    <span className="text-[10px] tracking-[0.2em] font-sans font-medium text-charcoal/60 mb-1 uppercase">Total Interior Design</span>
    <span className="text-2xl font-sans font-light tracking-tight text-charcoal">DESIGN <span className="font-bold">BK</span></span>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Logo />
        
        <div className="hidden md:flex space-x-12 items-center">
          {[
            { name: '포트폴리오', link: '#portfolio' },
            { name: '서비스', link: '#services' },
            { name: '스튜디오', link: '#about' },
            { name: '문의하기', link: '#contact' }
          ].map((item) => (
            <a key={item.name} href={item.link} className="text-[12px] tracking-widest luxury-underline font-medium text-charcoal/80 hover:text-charcoal transition-colors">
              {item.name}
            </a>
          ))}
        </div>

        <button className="md:hidden text-charcoal" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-warm-white z-50 p-12 flex flex-col justify-center items-center space-y-10 md:hidden"
          >
            <button className="absolute top-8 right-6 text-charcoal" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
            {[
              { name: 'PORTFOLIO', link: '#portfolio' },
              { name: 'SERVICES', link: '#services' },
              { name: 'STUDIO', link: '#about' },
              { name: 'CONTACT', link: '#contact' }
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.link} 
                onClick={() => setIsOpen(false)} 
                className="text-3xl font-serif tracking-widest hover:text-wood transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-beige/20">
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
          alt="Cozy Home" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-white/80 via-warm-white/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-[1px] bg-wood" />
            <span className="text-wood text-[11px] uppercase tracking-[0.4em] font-semibold">
              COZY & WARM REMODELING
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl text-charcoal leading-[1.2] mb-8 font-serif">
            당신의 일상이 <br />
            <span className="italic font-light text-clay">더 아늑해지는 순간</span>
          </h1>
          <p className="text-charcoal/70 text-base md:text-lg font-light mb-10 max-w-lg leading-relaxed break-keep">
            디자인 BK는 단순히 예쁜 집을 넘어, 그곳에 머무는 사람의 온기가 느껴지는 공간을 만듭니다. 
            매일 아침 눈을 뜰 때 행복해지는 집, 디자인 BK와 함께 시작하세요.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="px-10 py-4 bg-wood text-warm-white text-[11px] tracking-widest hover:bg-charcoal transition-all duration-500 rounded-full shadow-lg shadow-wood/20">
              상담 예약하기
            </button>
            <button className="group flex items-center space-x-4 text-charcoal text-[11px] tracking-widest px-10 py-4 border border-charcoal/10 rounded-full hover:bg-white transition-all">
              <span>시공 사례 보기</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-6 z-10 hidden md:flex items-center space-x-6">
        <div className="flex space-x-4">
          <Instagram size={18} className="text-charcoal/40 hover:text-wood transition-colors cursor-pointer" />
          <Facebook size={18} className="text-charcoal/40 hover:text-wood transition-colors cursor-pointer" />
        </div>
        <div className="w-12 h-[1px] bg-charcoal/10" />
        <span className="text-[10px] tracking-widest text-charcoal/40">DESIGN BK ATELIER</span>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "공감과 소통",
      description: "고객님의 라이프스타일과 취향을 깊이 있게 이해하는 첫 만남입니다."
    },
    {
      number: "02",
      title: "감성적 기획",
      description: "단순한 도면을 넘어, 공간의 공기와 온도를 설계하는 과정입니다."
    },
    {
      number: "03",
      title: "정교한 시공",
      description: "숙련된 전문가들이 보이지 않는 곳까지 세심하게 완성합니다."
    },
    {
      number: "04",
      title: "따뜻한 입주",
      description: "완성된 공간에서 새로운 일상이 시작되는 설레는 순간입니다."
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-clay text-[11px] uppercase tracking-[0.4em] mb-4 block font-bold">OUR PROCESS</span>
          <h2 className="text-4xl md:text-5xl font-serif italic">공간이 완성되는 따뜻한 여정</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="text-8xl font-serif text-beige/40 absolute -top-10 -left-4 group-hover:text-wood/10 transition-colors duration-700">
                {step.number}
              </div>
              <div className="relative z-10 pt-8">
                <h4 className="text-xl font-serif mb-4 group-hover:text-wood transition-colors">{step.title}</h4>
                <p className="text-sm text-charcoal/50 leading-relaxed break-keep font-light">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[1px] bg-beige/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <span className="text-clay text-[11px] uppercase tracking-[0.3em] mb-4 block font-bold">PORTFOLIO</span>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">디자인 BK의 손길이 닿은 공간</h2>
            <p className="text-charcoal/50 text-sm font-light">우리는 각자의 이야기가 담긴 따뜻한 공간을 지향합니다.</p>
          </div>
          <div className="mt-8 md:mt-0">
            <button className="soft-pill">전체 보기</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="cozy-card group"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] px-3 py-1 rounded-full text-wood font-bold tracking-widest">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif mb-2 group-hover:text-wood transition-colors">{project.title}</h3>
                    <p className="text-xs text-charcoal/40 flex items-center">
                      <MapPin size={12} className="mr-1" /> {project.location}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-beige flex items-center justify-center group-hover:bg-wood group-hover:text-white transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <p className="text-sm text-charcoal/60 leading-relaxed break-keep font-light">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-beige/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-wood text-[11px] uppercase tracking-[0.3em] mb-6 block font-bold">OUR SERVICES</span>
            <h2 className="text-4xl md:text-5xl mb-12 font-serif leading-tight">더 나은 일상을 위한 <br /> <span className="italic text-clay">공간의 재구성</span></h2>
            
            <div className="grid grid-cols-1 gap-8">
              {SERVICES.map((service, index) => (
                <motion.div 
                  key={service.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-8 rounded-2xl border border-beige/50 flex items-start space-x-6 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-beige flex items-center justify-center text-wood shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-serif mb-2">{service.title}</h4>
                    <p className="text-sm text-charcoal/50 leading-relaxed break-keep font-light">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] overflow-hidden oval-mask shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" 
                alt="Cozy Interior" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl max-w-xs border border-beige/50 hidden md:block">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-wood">
                  <Coffee size={20} />
                </div>
                <span className="text-xs font-bold tracking-widest">DESIGN BK PHILOSOPHY</span>
              </div>
              <p className="text-sm italic text-charcoal/70 leading-relaxed font-serif">
                "우리는 집이 세상에서 가장 편안한 안식처가 되어야 한다고 믿습니다."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1618219944342-824e40a13255?auto=format&fit=crop&q=80&w=1200" 
                alt="Interior Design Studio" 
                className="w-full aspect-[4/3] object-cover rounded-3xl shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-wood rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-xl">
                Since 1998
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <span className="text-clay text-[11px] uppercase tracking-[0.3em] mb-6 block font-bold">THE STUDIO</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">공간에 온기를 더하는 사람들</h2>
            <p className="text-charcoal/70 text-lg leading-relaxed mb-6 break-keep font-light">
              디자인 BK는 20년 넘게 한결같은 마음으로 고객의 공간을 연구해 왔습니다. 
              우리는 화려한 장식보다는 거주자의 편의와 심리적 안정을 우선으로 생각합니다.
            </p>
            <p className="text-charcoal/60 leading-relaxed mb-10 break-keep font-light">
              작은 소품 하나, 조명의 각도 하나까지 세심하게 고민하여 당신만의 아늑한 보금자리를 완성해 드립니다. 
              디자인 BK와 함께라면 평범했던 일상이 특별한 휴식이 됩니다.
            </p>
            
            <div className="flex space-x-12">
              <div>
                <p className="text-3xl font-serif mb-1 text-wood">2,000+</p>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-serif mb-1 text-wood">25</p>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Years Heritage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-beige/20 rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-wood/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
            <div>
              <span className="text-wood text-[11px] uppercase tracking-[0.3em] mb-6 block font-bold">CONTACT US</span>
              <h2 className="text-4xl md:text-6xl mb-12 font-serif italic leading-tight">아늑한 변화의 시작, <br /> 지금 문의하세요</h2>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-wood shadow-sm">
                    <Phone size={18} />
                  </div>
                  <p className="text-lg font-light">02-1234-5678</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-wood shadow-sm">
                    <Mail size={18} />
                  </div>
                  <p className="text-lg font-light">designbk@interior.com</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-wood shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <p className="text-lg font-light">서울시 강남구 테헤란로 123</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-beige/50">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-charcoal/40">성함</label>
                    <input type="text" className="w-full bg-warm-white border border-beige/50 rounded-xl px-4 py-3 focus:outline-none focus:border-wood transition-colors font-light" placeholder="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-charcoal/40">연락처</label>
                    <input type="text" className="w-full bg-warm-white border border-beige/50 rounded-xl px-4 py-3 focus:outline-none focus:border-wood transition-colors font-light" placeholder="010-0000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal/40">문의 내용</label>
                  <textarea rows={4} className="w-full bg-warm-white border border-beige/50 rounded-xl px-4 py-3 focus:outline-none focus:border-wood transition-colors resize-none font-light" placeholder="어떤 공간을 꿈꾸시나요?" />
                </div>
                <button className="w-full py-4 bg-wood text-warm-white text-[11px] uppercase tracking-[0.3em] hover:bg-charcoal transition-all duration-500 font-bold rounded-xl shadow-lg shadow-wood/20">
                  상담 신청하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-charcoal text-warm-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <Logo />
          <div className="flex space-x-8 mt-8 md:mt-0">
            {['Instagram', 'Blog', 'YouTube', 'Pinterest'].map((social) => (
              <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-warm-white/40 hover:text-wood transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
        <div className="h-[1px] w-full bg-warm-white/5 mb-12" />
        <div className="flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.3em] text-warm-white/20">
          <p>© 2026 DESIGN BK. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-warm-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-warm-white transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Process />
      <Portfolio />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
