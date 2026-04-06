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
  MapPin, 
  Phone, 
  Mail,
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

const NAV_ITEMS = [
  { name: '포트폴리오', link: '#portfolio' },
  { name: '서비스', link: '#services' },
  { name: '스튜디오', link: '#about' },
  { name: '문의하기', link: '#contact' }
];

const HERO_METRICS = [
  { value: '25+', label: 'years of experience' },
  { value: '2,000+', label: 'completed homes' },
  { value: '98%', label: 'client satisfaction' }
];

const useLightMotion = () => {
  const [lightMotion, setLightMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      setLightMotion(mobileQuery.matches || reducedQuery.matches);
    };

    sync();
    mobileQuery.addEventListener('change', sync);
    reducedQuery.addEventListener('change', sync);

    return () => {
      mobileQuery.removeEventListener('change', sync);
      reducedQuery.removeEventListener('change', sync);
    };
  }, []);

  return lightMotion;
};

// --- Components ---

const Logo = () => (
  <div className="flex flex-col items-start leading-none">
    <span className="text-[10px] tracking-[0.2em] font-sans font-medium text-charcoal/60 mb-1 uppercase">Total Interior Design</span>
    <span className="text-2xl font-sans font-light tracking-tight text-charcoal">DESIGN <span className="font-bold">BK</span></span>
  </div>
);

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left'
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <span className="text-clay text-[11px] uppercase tracking-[0.35em] mb-4 block font-bold">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-[1.1] text-balance">{title}</h2>
      {description && (
        <p className="mt-4 text-sm md:text-base text-charcoal/60 leading-relaxed break-keep font-light">
          {description}
        </p>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'glass-nav py-3 md:py-4' : 'bg-transparent py-5 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <Logo />
        
        <div className="hidden md:flex items-center gap-8 rounded-full border border-white/60 bg-white/70 px-5 py-3 shadow-sm backdrop-blur-md">
          {NAV_ITEMS.map((item) => (
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
            className="fixed inset-0 bg-warm-white z-50 p-8 flex flex-col justify-center items-center space-y-8 md:hidden"
          >
            <button className="absolute top-8 right-6 text-charcoal" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.name}
                href={item.link} 
                onClick={() => setIsOpen(false)} 
                className="text-2xl sm:text-3xl font-serif tracking-widest hover:text-wood transition-colors"
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
  const lightMotion = useLightMotion();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-beige/20 py-24 md:py-0">
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={lightMotion ? false : { scale: 1.03 }}
          animate={lightMotion ? undefined : { scale: 1 }}
          transition={lightMotion ? undefined : { duration: 4, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
          alt="Cozy Home" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-white/80 via-warm-white/40 to-transparent" />
      </div>

      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <motion.div
          initial={lightMotion ? false : { opacity: 0, x: -20 }}
          animate={lightMotion ? undefined : { opacity: 1, x: 0 }}
          transition={lightMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]"
        >
          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 mb-5 md:mb-6">
              <div className="w-8 h-[1px] bg-wood" />
              <span className="text-wood text-[11px] uppercase tracking-[0.4em] font-semibold">
                COZY & WARM REMODELING
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl text-charcoal leading-[1.05] md:leading-[1.08] mb-6 md:mb-8 font-serif text-balance">
              살고 싶은 집이 아니라<br />
              <span className="italic font-light text-clay">머물고 싶은 집을 만듭니다</span>
            </h1>
            <p className="text-charcoal/70 text-sm sm:text-base md:text-lg font-light mb-8 md:mb-10 max-w-xl leading-relaxed break-keep">
              디자인 BK는 과한 장식보다 생활의 밀도와 감정을 우선합니다.
              따뜻한 재료, 정돈된 동선, 오래 봐도 질리지 않는 균형으로 일상에 자연스럽게 스며드는 공간을 설계합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a href="#contact" className="w-full sm:w-auto text-center px-8 md:px-10 py-4 bg-wood text-warm-white text-[11px] tracking-widest hover:bg-charcoal transition-all duration-500 rounded-full shadow-lg shadow-wood/20">
                상담 예약하기
              </a>
              <a href="#portfolio" className="group w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-4 text-charcoal text-[11px] tracking-widest px-8 md:px-10 py-4 border border-charcoal/10 rounded-full bg-white/70 hover:bg-white transition-all">
                <span>시공 사례 보기</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {HERO_METRICS.map((metric) => (
                <div key={metric.label} className="hero-metric-card">
                  <p className="text-2xl md:text-3xl font-serif text-charcoal">{metric.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-charcoal/45">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="editorial-panel">
              <span className="text-[10px] uppercase tracking-[0.35em] text-charcoal/45">Signature Mood</span>
              <h3 className="mt-5 text-3xl font-serif leading-tight text-charcoal">
                차분한 결, 포근한 빛, 오래 머무는 균형
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/60 font-light break-keep">
                고객의 취향을 공간 언어로 정리해 소재와 조명, 수납과 동선을 하나의 감도로 맞춥니다.
              </p>
              <div className="mt-8 space-y-4 text-sm text-charcoal/70">
                <div className="flex items-center justify-between border-b border-charcoal/8 pb-3">
                  <span>Residential Remodeling</span>
                  <span>Seoul Based</span>
                </div>
                <div className="flex items-center justify-between border-b border-charcoal/8 pb-3">
                  <span>Planning to Styling</span>
                  <span>1:1 Direction</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Warm Minimal Mood</span>
                  <span>Since 1998</span>
                </div>
              </div>
            </div>
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
  const lightMotion = useLightMotion();

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
    <section className="defer-section py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-14 md:mb-20">
          <SectionHeading
            eyebrow="OUR PROCESS"
            title={<>공간이 완성되는<br className="hidden sm:block" /> 따뜻한 여정</>}
            description="첫 상담부터 입주 직전 마감까지, 고객이 지금 무엇을 알고 있어야 하는지 분명하게 전달하는 프로세스로 진행합니다."
            align="center"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              initial={lightMotion ? false : { opacity: 0, y: 20 }}
              whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={lightMotion ? undefined : { delay: index * 0.12 }}
              className="process-card relative group"
            >
              <div className="text-7xl md:text-8xl font-serif text-beige/50 absolute -top-8 md:-top-10 -left-1 md:-left-2 group-hover:text-wood/10 transition-colors duration-700">
                {step.number}
              </div>
              <div className="relative z-10 pt-12">
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
  const lightMotion = useLightMotion();

  return (
    <section id="portfolio" className="defer-section py-20 md:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 md:mb-20">
          <SectionHeading
            eyebrow="PORTFOLIO"
            title={<>디자인 BK의 손길이 닿은<br className="hidden sm:block" /> 따뜻한 공간</>}
            description="보는 순간 강한 인상보다, 살아갈수록 만족이 커지는 집을 목표로 설계했습니다."
          />
          <div className="mt-8 md:mt-0">
            <button className="soft-pill">전체 보기</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={lightMotion ? false : { opacity: 0, y: 20 }}
              whileInView={lightMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={lightMotion ? undefined : { duration: 0.5, delay: index * 0.06 }}
              className="cozy-card group"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] px-3 py-1 rounded-full text-wood font-bold tracking-widest">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start gap-6 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif mb-2 group-hover:text-wood transition-colors">{project.title}</h3>
                    <p className="text-xs text-charcoal/40 flex items-center tracking-[0.12em] uppercase">
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
  const lightMotion = useLightMotion();

  return (
    <section id="services" className="defer-section py-20 md:py-32 bg-beige/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="OUR SERVICES"
              title={<>더 나은 일상을 위한<br /> <span className="italic text-clay">공간의 재구성</span></>}
              description="전체 리모델링부터 부분 스타일링까지, 생활 패턴에 맞춘 해법을 제안합니다."
            />
            
            <div className="grid grid-cols-1 gap-5 mt-10 md:mt-12">
              {SERVICES.map((service, index) => (
                <motion.div 
                  key={service.title}
                  initial={lightMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={lightMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={lightMotion ? undefined : { delay: index * 0.12 }}
                  className="service-panel bg-white p-6 md:p-8 rounded-[1.75rem] border border-beige/60 flex items-start space-x-4 md:space-x-6 transition-all"
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
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute -bottom-6 md:-bottom-10 left-3 md:-left-10 bg-white/95 p-4 md:p-8 rounded-2xl shadow-xl max-w-[14rem] md:max-w-xs border border-beige/50 backdrop-blur-sm">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-wood">
                  <Coffee size={20} />
                </div>
                <span className="text-xs font-bold tracking-widest">DESIGN BK PHILOSOPHY</span>
              </div>
              <p className="text-xs md:text-sm italic text-charcoal/70 leading-relaxed font-serif">
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
    <section id="about" className="defer-section py-20 md:py-32 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Interior Design Studio" 
                className="w-full aspect-[4/3] object-cover rounded-3xl shadow-lg"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  const img = event.currentTarget;
                  img.onerror = null;
                  img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6o4hwETfgGChbjM8ZPklPkFYvOcZUumP-Q&s";
                }}
              />
              <div className="absolute -bottom-4 md:-bottom-6 -right-2 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-wood rounded-full flex items-center justify-center text-white font-serif italic text-base md:text-xl shadow-xl">
                Since 1998
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <SectionHeading
              eyebrow="THE STUDIO"
              title={<>공간에 온기를 더하는<br /> 사람들</>}
              description="유행보다 지속성을, 장식보다 사용감을 먼저 보는 팀입니다."
            />
            <p className="text-charcoal/70 text-base md:text-lg leading-relaxed mb-5 md:mb-6 break-keep font-light">
              디자인 BK는 20년 넘게 한결같은 마음으로 고객의 공간을 연구해 왔습니다. 
              우리는 화려한 장식보다는 거주자의 편의와 심리적 안정을 우선으로 생각합니다.
            </p>
            <p className="text-charcoal/60 leading-relaxed mb-8 md:mb-10 break-keep font-light">
              작은 소품 하나, 조명의 각도 하나까지 세심하게 고민하여 당신만의 아늑한 보금자리를 완성해 드립니다. 
              디자인 BK와 함께라면 평범했던 일상이 특별한 휴식이 됩니다.
            </p>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6 sm:max-w-md">
              <div className="rounded-[1.5rem] border border-beige/70 bg-white/80 p-5">
                <p className="text-3xl font-serif mb-1 text-wood">2,000+</p>
                <p className="text-[10px] uppercase tracking-widest text-charcoal/40">Happy Clients</p>
              </div>
              <div className="rounded-[1.5rem] border border-beige/70 bg-white/80 p-5">
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
    <section id="contact" className="defer-section py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="contact-shell bg-beige/25 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-wood/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 relative z-10">
            <div>
              <SectionHeading
                eyebrow="CONTACT US"
                title={<>아늑한 변화의 시작,<br /> 지금 문의하세요</>}
                description="상담 단계에서 예산, 일정, 우선순위를 함께 정리해 드립니다. 부담 없이 현재 공간 이야기를 들려주세요."
              />
              
              <div className="space-y-5 md:space-y-8 mt-8 md:mt-12">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-wood shadow-sm">
                    <Phone size={18} />
                  </div>
                  <p className="text-base md:text-lg font-light">02-1234-5678</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-wood shadow-sm">
                    <Mail size={18} />
                  </div>
                  <p className="text-base md:text-lg font-light break-all">designbk@interior.com</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-wood shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <p className="text-base md:text-lg font-light">서울시 강남구 테헤란로 123</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-beige/50">
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
    <footer className="defer-section bg-charcoal text-warm-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
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
