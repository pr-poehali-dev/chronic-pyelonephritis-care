import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const navItems = [
  { id: "intro", label: "Введение" },
  { id: "chapter1", label: "Глава 1" },
  { id: "chapter2", label: "Глава 2" },
  { id: "conclusion", label: "Заключение" },
];

const pathogenesisSteps = [
  {
    step: 1,
    title: "Проникновение возбудителя",
    desc: "Восходящий путь: E. coli и другие грамотрицательные бактерии из нижних мочевых путей достигают почечной лоханки через мочеточник.",
    icon: "ArrowUp",
    color: "var(--med-blue)",
  },
  {
    step: 2,
    title: "Адгезия и инвазия",
    desc: "Бактерии прикрепляются к уроэпителию за счёт пилей типа 1 и P-пилей, преодолевают слизистый барьер и проникают в межклеточное пространство.",
    icon: "Link",
    color: "var(--med-teal)",
  },
  {
    step: 3,
    title: "Воспалительная реакция",
    desc: "Активация нейтрофилов, выброс провоспалительных цитокинов (IL-6, IL-8, TNF-α), развитие острого интерстициального воспаления.",
    icon: "Zap",
    color: "var(--med-amber)",
  },
  {
    step: 4,
    title: "Хронизация процесса",
    desc: "Персистенция инфекции, формирование иммунных комплексов, прогрессирующий фиброз тубулоинтерстициальной ткани почки.",
    icon: "RefreshCw",
    color: "var(--med-slate)",
  },
  {
    step: 5,
    title: "Нефросклероз",
    desc: "Рубцевание паренхимы, снижение функциональной почечной массы, атрофия канальцев. Клинически — прогрессирующая ХБП.",
    icon: "AlertTriangle",
    color: "var(--med-red)",
  },
];

const diagnosticsSteps = [
  {
    stage: "I",
    title: "Клинический осмотр",
    items: ["Жалобы и анамнез заболевания", "Симптом Пастернацкого", "Измерение артериального давления", "Оценка отёков"],
    icon: "Stethoscope",
  },
  {
    stage: "II",
    title: "Лабораторная диагностика",
    items: [
      "ОАМ: лейкоцитурия, бактериурия",
      "Посев мочи + антибиотикограмма",
      "ОАК: лейкоцитоз, ускоренное СОЭ",
      "БАК: креатинин, мочевина, СКФ",
    ],
    icon: "FlaskConical",
  },
  {
    stage: "III",
    title: "Инструментальные методы",
    items: [
      "УЗИ почек и мочевого пузыря",
      "Экскреторная урография",
      "Радиоизотопная ренография",
      "КТ / МРТ по показаниям",
    ],
    icon: "Scan",
  },
  {
    stage: "IV",
    title: "Дифф. диагностика",
    items: [
      "Гломерулонефрит",
      "Интерстициальный нефрит",
      "Туберкулёз почек",
      "Мочекаменная болезнь",
    ],
    icon: "GitBranch",
  },
];

const classificationData = [
  { category: "По течению", items: ["Латентная форма", "Рецидивирующая форма", "Азотемическая форма"] },
  { category: "По локализации", items: ["Односторонний", "Двусторонний", "Тотальный", "Сегментарный"] },
  { category: "По фазе", items: ["Активное воспаление", "Латентное воспаление", "Клиническая ремиссия"] },
  { category: "По этиологии", items: ["Первичный", "Вторичный (обструктивный)", "Калькулёзный"] },
];

const treatmentData = [
  {
    title: "Антибактериальная терапия",
    icon: "Pill",
    content:
      "Фторхинолоны (ципрофлоксацин), цефалоспорины III–IV поколения, карбапенемы при тяжёлом течении. Длительность курса 10–14 дней с учётом антибиотикограммы.",
  },
  {
    title: "Патогенетическая терапия",
    icon: "Target",
    content:
      "Нестероидные противовоспалительные препараты, дезинтоксикационная терапия, иммунокорригирующие средства при частых рецидивах.",
  },
  {
    title: "Физиотерапия",
    icon: "Activity",
    content:
      "Электрофорез, тепловые процедуры в фазу ремиссии. Санаторно-курортное лечение (Трускавец, Железноводск). Диетотерапия — стол №7.",
  },
  {
    title: "Хирургическое лечение",
    icon: "Scissors",
    content:
      "Устранение обструкции мочевых путей, нефростомия при гнойных осложнениях, нефрэктомия при одностороннем нефросклерозе с АГ.",
  },
];

function AnimatedSection({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      id={id}
      ref={ref}
      className={`${className} transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [activeNav, setActiveNav] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePathStep, setActivePathStep] = useState<number | null>(null);
  const [activeDiagStep, setActiveDiagStep] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        });
      },
      { threshold: 0.25 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-sm border-b border-[var(--border-color)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--med-blue)] flex items-center justify-center">
              <Icon name="Microscope" size={16} className="text-white" />
            </div>
            <span className="font-cormorant text-lg font-semibold tracking-wide text-[var(--text-primary)]">
              Хронический пиелонефрит
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 text-sm font-ibm rounded-md transition-all duration-200 ${
                  activeNav === item.id
                    ? "bg-[var(--med-blue)] text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="md:hidden text-[var(--text-secondary)]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-primary)] px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left px-4 py-2 text-sm font-ibm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <div className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, var(--med-blue), transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, var(--med-teal), transparent 70%)" }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--med-blue)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--med-blue)]/30 bg-[var(--med-blue)]/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--med-blue)]" />
              <span className="text-xs font-ibm text-[var(--med-blue)] tracking-widest uppercase">Клиническое руководство</span>
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-[1.1] mb-6 text-[var(--text-primary)]">
              Диагностика <br />
              <em className="text-[var(--med-blue)] not-italic font-light">и лечение</em>
              <br />
              хронического
              <br />
              пиелонефрита
            </h1>
            <p className="font-ibm text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Комплексное клинико-методическое руководство по теоретическим основам, современным
              методам диагностики, принципам лечения и профилактики хронического воспаления почечной
              паренхимы
            </p>
            <div className="mt-10 flex flex-wrap gap-10">
              {[
                { num: "4", label: "Формы классификации" },
                { num: "2", label: "Интерактивные схемы" },
                { num: "8", label: "Разделов руководства" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-cormorant text-4xl font-light text-[var(--med-blue)]">{stat.num}</div>
                  <div className="font-ibm text-xs text-[var(--text-muted)] mt-1 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-28">

        {/* Введение */}
        <AnimatedSection id="intro">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-ibm text-xs text-[var(--text-muted)] tracking-widest uppercase">Введение</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>
          <div className="grid md:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="font-cormorant text-4xl font-light mb-6 leading-tight">
                Актуальность проблемы пиелонефрита в современной нефрологии
              </h2>
              <p className="font-ibm text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                Хронический пиелонефрит (ХП) является одним из наиболее распространённых заболеваний почек
                и занимает ведущее место среди причин хронической болезни почек. По данным эпидемиологических
                исследований, ХП встречается у 0,1–0,4% населения, причём у женщин в 2–5 раз чаще, чем у мужчин.
              </p>
              <p className="font-ibm text-sm text-[var(--text-secondary)] leading-relaxed">
                Медико-социальная значимость заболевания определяется его широкой распространённостью,
                длительным рецидивирующим течением, склонностью к прогрессированию с развитием хронической
                почечной недостаточности и высоким уровнем временной нетрудоспособности.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: "Target",
                  title: "Цель работы",
                  text: "Систематизировать современные данные о диагностике и лечении хронического пиелонефрита",
                },
                {
                  icon: "BookOpen",
                  title: "Задачи",
                  text: "Изучить этиопатогенез, представить классификацию, описать клинику, диагностику и лечение",
                },
                {
                  icon: "Users",
                  title: "Актуальность",
                  text: "ХП — ведущая причина ХПН, высокая распространённость среди работоспособного населения",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--med-blue)]/10 flex items-center justify-center shrink-0">
                    <Icon name={item.icon as any} size={16} className="text-[var(--med-blue)]" />
                  </div>
                  <div>
                    <div className="font-ibm text-sm font-semibold text-[var(--text-primary)] mb-1">{item.title}</div>
                    <div className="font-ibm text-xs text-[var(--text-secondary)] leading-relaxed">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Глава 1 */}
        <AnimatedSection id="chapter1">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-ibm text-xs text-[var(--text-muted)] tracking-widest uppercase">Глава 1</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
            <span className="font-ibm text-xs text-[var(--text-muted)]">Теоретико-методологические основы</span>
          </div>

          {/* 1.1 */}
          <div className="mb-20">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-cormorant text-2xl text-[var(--med-blue)] font-light">1.1</span>
              <h3 className="font-cormorant text-3xl font-light">Определение, этиология и патогенез</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 rounded-xl bg-[var(--med-blue)]/5 border border-[var(--med-blue)]/15">
                <div className="font-ibm text-xs font-semibold text-[var(--med-blue)] tracking-widest uppercase mb-3">Определение</div>
                <p className="font-ibm text-sm text-[var(--text-secondary)] leading-relaxed">
                  Хронический пиелонефрит — неспецифическое инфекционно-воспалительное заболевание с
                  преимущественным поражением тубулоинтерстициальной ткани почки, лоханки и чашечек,
                  приводящее к нефросклерозу при длительном течении.
                </p>
              </div>
              <div className="md:col-span-2">
                <div className="font-ibm text-xs text-[var(--text-muted)] tracking-widest uppercase mb-5">Основные возбудители</div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "E. coli", pct: 80, color: "var(--med-blue)" },
                    { name: "Klebsiella spp.", pct: 8, color: "var(--med-teal)" },
                    { name: "Proteus mirabilis", pct: 6, color: "var(--med-amber)" },
                    { name: "Enterococcus", pct: 4, color: "var(--med-slate)" },
                    { name: "Staphylococcus", pct: 3, color: "var(--med-red)" },
                    { name: "Прочие", pct: 2, color: "var(--text-muted)" },
                  ].map((b) => (
                    <div key={b.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-ibm text-xs text-[var(--text-secondary)]">{b.name}</span>
                        <span className="font-ibm text-xs font-semibold" style={{ color: b.color }}>
                          {b.pct}%
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-[var(--border-color)] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${b.pct}%`, backgroundColor: b.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pathogenesis Scheme */}
            <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--med-blue)]/10 flex items-center justify-center">
                  <Icon name="Network" size={16} className="text-[var(--med-blue)]" />
                </div>
                <div>
                  <div className="font-ibm text-sm font-semibold text-[var(--text-primary)]">
                    Интерактивная схема патогенеза
                  </div>
                  <div className="font-ibm text-xs text-[var(--text-muted)]">
                    Нажмите на этап для подробного описания
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-stretch gap-2 mb-4">
                {pathogenesisSteps.map((s, i) => (
                  <div key={s.step} className="flex md:flex-col items-center gap-2 flex-1">
                    <button
                      onClick={() => setActivePathStep(activePathStep === s.step ? null : s.step)}
                      className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-center cursor-pointer ${
                        activePathStep === s.step ? "shadow-lg scale-[1.03]" : "border-[var(--border-color)] hover:shadow-sm"
                      }`}
                      style={
                        activePathStep === s.step
                          ? { borderColor: s.color, backgroundColor: s.color + "14" }
                          : {}
                      }
                    >
                      <div
                        className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center"
                        style={{
                          backgroundColor: activePathStep === s.step ? s.color : "var(--bg-primary)",
                        }}
                      >
                        <Icon
                          name={s.icon as any}
                          size={14}
                          className={activePathStep === s.step ? "text-white" : "text-[var(--text-muted)]"}
                        />
                      </div>
                      <div
                        className="font-ibm text-[11px] font-semibold leading-tight"
                        style={{
                          color: activePathStep === s.step ? s.color : "var(--text-secondary)",
                        }}
                      >
                        {s.title}
                      </div>
                    </button>
                    {i < pathogenesisSteps.length - 1 && (
                      <Icon
                        name="ChevronRight"
                        size={14}
                        className="text-[var(--text-muted)] shrink-0 hidden md:block"
                      />
                    )}
                  </div>
                ))}
              </div>
              {activePathStep !== null && (
                <div
                  className="p-4 rounded-xl border"
                  style={{
                    borderColor: pathogenesisSteps[activePathStep - 1].color + "40",
                    backgroundColor: pathogenesisSteps[activePathStep - 1].color + "08",
                  }}
                >
                  <div
                    className="font-ibm text-xs font-semibold mb-2 tracking-wide"
                    style={{ color: pathogenesisSteps[activePathStep - 1].color }}
                  >
                    Этап {activePathStep}: {pathogenesisSteps[activePathStep - 1].title}
                  </div>
                  <p className="font-ibm text-sm text-[var(--text-secondary)] leading-relaxed">
                    {pathogenesisSteps[activePathStep - 1].desc}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 1.2 */}
          <div className="mb-20">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-cormorant text-2xl text-[var(--med-blue)] font-light">1.2</span>
              <h3 className="font-cormorant text-3xl font-light">Классификация хронического пиелонефрита</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {classificationData.map((cat) => (
                <div
                  key={cat.category}
                  className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--med-blue)]/40 transition-all duration-200"
                >
                  <div className="font-ibm text-xs text-[var(--med-blue)] font-semibold tracking-widest uppercase mb-4">
                    {cat.category}
                  </div>
                  <ul className="space-y-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[var(--med-blue)] mt-2 shrink-0" />
                        <span className="font-ibm text-xs text-[var(--text-secondary)] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 1.3 */}
          <div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-cormorant text-2xl text-[var(--med-blue)] font-light">1.3</span>
              <h3 className="font-cormorant text-3xl font-light">Клиническая картина</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-ibm text-xs text-[var(--text-muted)] tracking-widest uppercase mb-4">Субъективные симптомы</div>
                <div className="space-y-3">
                  {[
                    {
                      s: "Боли в поясничной области",
                      d: "Тупые, ноющие, одно- или двусторонние, усиливаются при переохлаждении",
                    },
                    {
                      s: "Дизурические расстройства",
                      d: "Учащённое, болезненное мочеиспускание, никтурия, полиурия",
                    },
                    {
                      s: "Астенический синдром",
                      d: "Общая слабость, утомляемость, снижение работоспособности",
                    },
                    { s: "Субфебрилитет", d: "Температура 37,0–37,5°C в периоды обострений" },
                  ].map((item) => (
                    <div
                      key={item.s}
                      className="flex gap-4 p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--med-blue)] mt-2 shrink-0" />
                      <div>
                        <div className="font-ibm text-sm font-medium text-[var(--text-primary)]">{item.s}</div>
                        <div className="font-ibm text-xs text-[var(--text-secondary)] mt-0.5">{item.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-ibm text-xs text-[var(--text-muted)] tracking-widest uppercase mb-4">Объективные симптомы</div>
                <div className="space-y-3">
                  {[
                    {
                      s: "Симптом Пастернацкого",
                      d: "Болезненность при поколачивании по пояснице в проекции почек",
                    },
                    {
                      s: "Артериальная гипертензия",
                      d: "Развивается у 30–70% пациентов вследствие нефросклероза",
                    },
                    {
                      s: "Отёки",
                      d: "Умеренные, преимущественно периорбитальные, нарастающие к вечеру",
                    },
                    {
                      s: "Бледность кожных покровов",
                      d: "Анемический синдром при снижении функции почек",
                    },
                  ].map((item) => (
                    <div
                      key={item.s}
                      className="flex gap-4 p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--med-teal)] mt-2 shrink-0" />
                      <div>
                        <div className="font-ibm text-sm font-medium text-[var(--text-primary)]">{item.s}</div>
                        <div className="font-ibm text-xs text-[var(--text-secondary)] mt-0.5">{item.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Глава 2 */}
        <AnimatedSection id="chapter2">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-ibm text-xs text-[var(--text-muted)] tracking-widest uppercase">Глава 2</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
            <span className="font-ibm text-xs text-[var(--text-muted)]">Диагностика, лечение, осложнения и профилактика</span>
          </div>

          {/* 2.1 */}
          <div className="mb-20">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-cormorant text-2xl text-[var(--med-blue)] font-light">2.1</span>
              <h3 className="font-cormorant text-3xl font-light">Диагностика хронического пиелонефрита</h3>
            </div>
            <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--med-teal)]/10 flex items-center justify-center">
                  <Icon name="Search" size={16} className="text-[var(--med-teal)]" />
                </div>
                <div>
                  <div className="font-ibm text-sm font-semibold text-[var(--text-primary)]">
                    Интерактивная схема диагностики
                  </div>
                  <div className="font-ibm text-xs text-[var(--text-muted)]">Нажмите на этап для просмотра деталей</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {diagnosticsSteps.map((s, i) => (
                  <button
                    key={s.stage}
                    onClick={() => setActiveDiagStep(activeDiagStep === i ? null : i)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 cursor-pointer ${
                      activeDiagStep === i
                        ? "border-[var(--med-teal)] bg-[var(--med-teal)]/8 shadow-md scale-[1.02]"
                        : "border-[var(--border-color)] hover:border-[var(--med-teal)]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-cormorant text-sm font-semibold ${
                          activeDiagStep === i
                            ? "bg-[var(--med-teal)] text-white"
                            : "bg-[var(--bg-primary)] text-[var(--text-muted)]"
                        }`}
                      >
                        {s.stage}
                      </div>
                      <Icon
                        name={s.icon as any}
                        size={16}
                        className={activeDiagStep === i ? "text-[var(--med-teal)]" : "text-[var(--text-muted)]"}
                      />
                    </div>
                    <div
                      className={`font-ibm text-sm font-semibold ${
                        activeDiagStep === i ? "text-[var(--med-teal)]" : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {s.title}
                    </div>
                  </button>
                ))}
              </div>
              {activeDiagStep !== null && (
                <div className="p-5 rounded-xl border border-[var(--med-teal)]/30 bg-[var(--med-teal)]/5">
                  <div className="font-ibm text-xs font-semibold text-[var(--med-teal)] mb-3 tracking-widest uppercase">
                    Этап {diagnosticsSteps[activeDiagStep].stage}: {diagnosticsSteps[activeDiagStep].title}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {diagnosticsSteps[activeDiagStep].items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Icon name="CheckCircle" size={14} className="text-[var(--med-teal)] shrink-0" />
                        <span className="font-ibm text-sm text-[var(--text-secondary)]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2.2 */}
          <div className="mb-20">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-cormorant text-2xl text-[var(--med-blue)] font-light">2.2</span>
              <h3 className="font-cormorant text-3xl font-light">Лечение хронического пиелонефрита</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {treatmentData.map((t) => (
                <div
                  key={t.title}
                  className="p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--med-blue)]/40 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--med-blue)]/10 flex items-center justify-center group-hover:bg-[var(--med-blue)]/20 transition-colors">
                      <Icon name={t.icon as any} size={18} className="text-[var(--med-blue)]" />
                    </div>
                    <div className="font-ibm text-sm font-semibold text-[var(--text-primary)]">{t.title}</div>
                  </div>
                  <p className="font-ibm text-sm text-[var(--text-secondary)] leading-relaxed">{t.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2.3 */}
          <div className="mb-20">
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-cormorant text-2xl text-[var(--med-blue)] font-light">2.3</span>
              <h3 className="font-cormorant text-3xl font-light">Осложнения хронического пиелонефрита</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Хроническая болезнь почек",
                  desc: "Прогрессирующее снижение СКФ вплоть до терминальной ХПН, требующей заместительной почечной терапии",
                  icon: "TrendingDown",
                  severity: "Тяжёлое",
                  color: "var(--med-red)",
                },
                {
                  title: "Нефрогенная гипертензия",
                  desc: "Вторичная АГ, резистентная к лечению, нарастает по мере прогрессирования нефросклероза",
                  icon: "Activity",
                  severity: "Умеренное",
                  color: "var(--med-amber)",
                },
                {
                  title: "Мочекаменная болезнь",
                  desc: "Формирование конкрементов на фоне нарушения уродинамики и хронического инфекционного процесса",
                  icon: "Gem",
                  severity: "Умеренное",
                  color: "var(--med-amber)",
                },
                {
                  title: "Апостематозный нефрит",
                  desc: "Гнойное расплавление паренхимы с множественными абсцессами, требует неотложного хирургического вмешательства",
                  icon: "AlertOctagon",
                  severity: "Тяжёлое",
                  color: "var(--med-red)",
                },
                {
                  title: "Нефрогенная анемия",
                  desc: "Снижение продукции эритропоэтина при прогрессирующем поражении паренхимы почек",
                  icon: "Droplets",
                  severity: "Лёгкое",
                  color: "var(--med-slate)",
                },
                {
                  title: "Паранефрит",
                  desc: "Гнойное воспаление паранефральной клетчатки при прорыве гнойного очага за пределы капсулы почки",
                  icon: "ShieldAlert",
                  severity: "Тяжёлое",
                  color: "var(--med-red)",
                },
              ].map((c) => (
                <div key={c.title} className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: c.color + "18" }}
                    >
                      <Icon name={c.icon as any} size={16} style={{ color: c.color }} />
                    </div>
                    <span
                      className="font-ibm text-[10px] px-2 py-0.5 rounded-full"
                      style={{ color: c.color, backgroundColor: c.color + "14" }}
                    >
                      {c.severity}
                    </span>
                  </div>
                  <div className="font-ibm text-sm font-semibold text-[var(--text-primary)] mb-2">{c.title}</div>
                  <p className="font-ibm text-xs text-[var(--text-secondary)] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2.4 */}
          <div>
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-cormorant text-2xl text-[var(--med-blue)] font-light">2.4</span>
              <h3 className="font-cormorant text-3xl font-light">Профилактика хронического пиелонефрита</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <div className="font-ibm text-xs text-[var(--text-muted)] tracking-widest uppercase mb-5">
                  Первичная профилактика
                </div>
                <div className="space-y-3">
                  {[
                    "Своевременное лечение острого пиелонефрита и ИМВП",
                    "Соблюдение правил личной гигиены",
                    "Достаточный питьевой режим (1,5–2,0 л/сут)",
                    "Устранение очагов хронической инфекции",
                    "Коррекция нарушений уродинамики",
                    "Профилактика и лечение ЗППП",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--med-teal)]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="font-ibm text-[10px] font-semibold text-[var(--med-teal)]">{i + 1}</span>
                      </div>
                      <span className="font-ibm text-sm text-[var(--text-secondary)] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-ibm text-xs text-[var(--text-muted)] tracking-widest uppercase mb-5">
                  Вторичная профилактика
                </div>
                <div className="space-y-3">
                  {[
                    "Диспансерное наблюдение нефролога и уролога",
                    "Плановые курсы фитотерапии (клюква, толокнянка)",
                    "Антибактериальная профилактика при частых рецидивах",
                    "Санаторно-курортное лечение в фазу ремиссии",
                    "Контроль ОАМ каждые 3–6 месяцев",
                    "Избегание переохлаждений и физических перегрузок",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--med-blue)]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="font-ibm text-[10px] font-semibold text-[var(--med-blue)]">{i + 1}</span>
                      </div>
                      <span className="font-ibm text-sm text-[var(--text-secondary)] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Заключение */}
        <AnimatedSection id="conclusion">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-ibm text-xs text-[var(--text-muted)] tracking-widest uppercase">Заключение</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </div>
          <div className="max-w-3xl">
            <h2 className="font-cormorant text-4xl font-light mb-10 leading-tight">
              Выводы и клиническое значение
            </h2>
            <div className="space-y-6">
              {[
                {
                  n: "01",
                  text: "Хронический пиелонефрит является полиэтиологическим заболеванием с преобладающей ролью условно-патогенных микроорганизмов, прежде всего E. coli. Успех лечения определяется своевременной идентификацией возбудителя и его чувствительности к антибиотикам.",
                },
                {
                  n: "02",
                  text: "Современный диагностический алгоритм включает комплексную оценку клинических, лабораторных и инструментальных данных. Ранняя диагностика позволяет предотвратить прогрессирование нефросклероза и развитие хронической болезни почек.",
                },
                {
                  n: "03",
                  text: "Рациональная антибактериальная терапия с учётом антибиотикограммы, коррекция нарушений уродинамики и устранение факторов риска являются ключевыми элементами успешного лечения хронического пиелонефрита.",
                },
                {
                  n: "04",
                  text: "Диспансерное наблюдение и комплексная вторичная профилактика позволяют существенно снизить частоту рецидивов и замедлить прогрессирование хронической болезни почек при многолетнем течении заболевания.",
                },
              ].map((item) => (
                <div
                  key={item.n}
                  className="flex gap-8 pb-6 border-b border-[var(--border-color)] last:border-0"
                >
                  <span className="font-cormorant text-3xl font-light text-[var(--med-blue)]/35 shrink-0 leading-none">
                    {item.n}
                  </span>
                  <p className="font-ibm text-sm text-[var(--text-secondary)] leading-relaxed pt-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[var(--med-blue)] flex items-center justify-center">
              <Icon name="Microscope" size={13} className="text-white" />
            </div>
            <span className="font-cormorant text-base text-[var(--text-secondary)]">
              Хронический пиелонефрит
            </span>
          </div>
          <p className="font-ibm text-xs text-[var(--text-muted)] text-center">
            Клиническое руководство · Диагностика и лечение · 2026
          </p>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="font-ibm text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors px-2 py-1"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
