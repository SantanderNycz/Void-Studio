/**
 * VOID Studio - Translations
 * Add or edit strings here. Components consume via useLanguage().
 */

export type Lang = "pt" | "en";

export const translations = {
  pt: {
    // Nav
    nav: {
      projects: "Projetos",
      services: "Serviços",
      studio: "Estúdio",
      contact: "Contacto",
    },

    // Hero
    hero: {
      lines: ["Onde o nada", "se torna", "algo."],
      accentLineIndex: 2,
      cta: "Ver Projetos",
    },

    // Projects section
    projects: {
      heading: "Projetos",
      label: "Trabalho selecionado",
      cta: "Ver Projecto",
      items: [
  {
    description:
      "Presença digital para uma profissional especializada em lash lifting, laminação e design de sobrancelhas.",
  },
  {
    description:
      "Presença elegante para um salão de estética e bem-estar.",
  },
  {
    description:
      "Loja de bicicletas eléctricas personalizadas com design premium.",
  },
  {
    description:
      "Portfólio de desenvolvimento full-stack com aplicações web, jogos e experiências 3D.",
  },
  {
    description:
      "Plataforma social para amantes de cães partilharem momentos.",
  },
  {
    description:
      "Plataforma digital moderna para licitações e procurement.",
  },
  {
    description:
      "Loja de coleccionáveis com branding divertido e navegação simples.",
  },
],
    },

    // Services section
    services: {
      heading: "Serviços",
      label: "O que fazemos",
      items: [
        {
          title: "Landing Pages",
          description:
            "Uma presença focada, construída para converter. Rápida, bonita, eficaz.",
        },
        {
          title: "Sites Institucionais",
          description:
            "A identidade digital completa do seu negócio - do design ao último detalhe.",
        },
        {
          title: "E-commerce",
          description:
            "Lojas que vendem enquanto dorme. Construídas para crescer com o seu negócio.",
        },
      ],
    },

    // About section
    about: {
      text: "Somos um estúdio digital de Porto. Construímos com intenção. Cada detalhe tem peso, cada interacção tem propósito.",
      subtext: "Fundado em 2021.",
    },

    // Pricing section
    pricing: {
      heading: "Serviços",
      label: "Pacotes",
      packages: [
        {
          number: "01",
          name: "Landing Page",
          price: "150€",
          from: "a partir de",
          features: [
            "1 página com scroll único ou secções essenciais",
            "Design original e responsivo (mobile + desktop)",
            "Integração básica: WhatsApp, formulário ou link externo",
            "Deploy com domínio limpo",
          ],
        },
        {
          number: "02",
          name: "Site Institucional",
          price: "350€",
          from: "a partir de",
          features: [
            "Tudo do pacote anterior",
            "3 a 5 páginas com arquitectura de informação estruturada",
            "SEO on-page básico",
            "Identidade visual aplicada de forma consistente",
            "CMS simples para edição de conteúdo (opcional)",
          ],
        },
        {
          number: "03",
          name: "Extras",
          price: "Sob consulta",
          from: "orçamento personalizado",
          features: [
            'Registo de domínio: ".com" ou ".pt" ~20€/ano',
            "Identidade visual: paleta, tipografia e elementos gráficos desenvolvidos especificamente para o projecto. Sob consulta.",
          ],
        },
      ],
      cta: {
        note: "Cada projecto é orçado individualmente.",
        button: "Falar conosco",
      },
    },

    // Footer / contact
    footer: {
      heading: "Fale Conosco",
      contactLabel: "Contacto Directo",
      socialLabel: "Social",
      namePlaceholder: "Nome",
      emailPlaceholder: "Email",
      messagePlaceholder: "Mensagem",
      submit: "Enviar Mensagem",
      submitting: "A enviar…",
      successTitle: "Mensagem recebida.",
      successSub: "Entraremos em contacto em breve.",
      errorMsg:
        "Ocorreu um erro. Tente novamente ou envie um email directamente.",
    },

    // Misc
    misc: {
      scrollHint: "Scroll",
      locationLabel: "Porto, PT - Estúdio Digital",
    },
  },

  en: {
    nav: {
      projects: "Projects",
      services: "Services",
      studio: "Studio",
      contact: "Contact",
    },

    hero: {
      lines: ["Where nothing", "becomes", "something."],
      accentLineIndex: 2,
      cta: "View Projects",
    },

    projects: {
      heading: "Projects",
      label: "Selected work",
      cta: "View Project",
      items: [
        {
          description:
            "Digital presence for a professional specialised in lash lifting, brow lamination and eyebrow design.",
        },
        {
          description:
            "Elegant digital presence for a beauty and wellness salon.",
        },
        {
          description: "Premium e-commerce for custom-built electric bicycles.",
        },
        {
          description: "Social platform for dog lovers to share their moments.",
        },
        {
          description:
            "Modern digital platform for public procurement and bidding.",
        },
        {
          description:
            "Collectibles shop with playful branding and clean navigation.",
        },
        {
          description:
            "Full-stack development portfolio featuring web applications, games and 3D experiences.",
        },
      ],
    },

    services: {
      heading: "Services",
      label: "What we do",
      items: [
        {
          title: "Landing Pages",
          description:
            "A focused presence, built to convert. Fast, beautiful, effective.",
        },
        {
          title: "Institutional Sites",
          description:
            "Your complete digital identity - from design to the last detail.",
        },
        // {
        //   title: "E-commerce",
        //   description:
        //     "Stores that sell while you sleep. Built to grow with your business.",
        // },
      ],
    },

    about: {
      text: "We are a digital studio from Porto. We build with intention. Every detail has weight, every interaction has purpose.",
      subtext: "Founded in 2021.",
    },

    // Pricing section
    pricing: {
      heading: "Services",
      label: "Packages",
      packages: [
        {
          number: "01",
          name: "Landing Page",
          price: "150€",
          from: "starting from",
          features: [
            "Single-scroll page with essential sections",
            "Original responsive design (mobile + desktop)",
            "Basic integration: WhatsApp, form or external link",
            "Deploy with clean domain",
          ],
        },
        {
          number: "02",
          name: "Institutional Site",
          price: "350€",
          from: "starting from",
          features: [
            "Everything in the previous package",
            "3 to 5 pages with structured information architecture",
            "Basic on-page SEO",
            "Visual identity applied consistently across all pages",
            "Simple CMS for content editing (optional)",
          ],
        },
        {
          number: "03",
          name: "Extras",
          price: "On request",
          from: "custom quote",
          features: [
            'Domain registration: ".com" or ".pt" ~20€/year',
            "Visual identity: colour palette, typography and graphic elements developed specifically for the project. On request.",
          ],
        },
      ],
      cta: {
        note: "Each project is quoted individually.",
        button: "Talk to us",
      },
    },

    footer: {
      heading: "Get in Touch",
      contactLabel: "Direct Contact",
      socialLabel: "Social",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      submit: "Send Message",
      submitting: "Sending…",
      successTitle: "Message received.",
      successSub: "We'll be in touch soon.",
      errorMsg: "Something went wrong. Please try again or email us directly.",
    },

    misc: {
      scrollHint: "Scroll",
      locationLabel: "Porto, PT - Digital Studio",
    },
  },
} as const;
