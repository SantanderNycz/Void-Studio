/**
 * VOID Studio — Translations
 * Add or edit strings here. Components consume via useLanguage().
 */

export type Lang = 'pt' | 'en'

export const translations = {
  pt: {
    // Nav
    nav: {
      projects: 'Projetos',
      services: 'Serviços',
      studio: 'Estúdio',
      contact: 'Contacto',
    },

    // Hero
    hero: {
      lines: ['Onde o nada', 'se torna', 'algo.'],
      accentLineIndex: 2,
      cta: 'Ver Projetos',
    },

    // Projects section
    projects: {
      heading: 'Projetos',
      label: 'Trabalho selecionado',
      cta: 'Ver Projecto',
      items: [
        {
          description: 'Presença elegante para um salão de estética e bem-estar.',
        },
        {
          description: 'Loja de bicicletas eléctricas personalizadas com design premium.',
        },
        {
          description: 'Plataforma social para amantes de cães partilharem momentos.',
        },
        {
          description: 'Plataforma digital moderna para licitações e procurement.',
        },
        {
          description: 'Loja de coleccionáveis com branding divertido e navegação simples.',
        },
      ],
    },

    // Services section
    services: {
      heading: 'Serviços',
      label: 'O que fazemos',
      items: [
        {
          title: 'Landing Pages',
          description: 'Uma presença focada, construída para converter. Rápida, bonita, eficaz.',
        },
        {
          title: 'Sites Institucionais',
          description: 'A identidade digital completa do seu negócio — do design ao último detalhe.',
        },
        {
          title: 'E-commerce',
          description: 'Lojas que vendem enquanto dorme. Construídas para crescer com o seu negócio.',
        },
      ],
    },

    // About section
    about: {
      text: 'Somos um estúdio digital de Porto. Construímos com intenção — cada detalhe tem peso, cada interacção tem propósito.',
      subtext: 'Fundado em 2021.',
    },

    // Footer / contact
    footer: {
      heading: 'Falar Connosco',
      contactLabel: 'Contacto Directo',
      socialLabel: 'Social',
      namePlaceholder: 'Nome',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Mensagem',
      submit: 'Enviar Mensagem',
      submitting: 'A enviar…',
      successTitle: 'Mensagem recebida.',
      successSub: 'Entraremos em contacto em breve.',
    },

    // Misc
    misc: {
      scrollHint: 'Scroll',
      locationLabel: 'Porto, PT — Estúdio Digital',
    },
  },

  en: {
    nav: {
      projects: 'Projects',
      services: 'Services',
      studio: 'Studio',
      contact: 'Contact',
    },

    hero: {
      lines: ['Where nothing', 'becomes', 'something.'],
      accentLineIndex: 2,
      cta: 'View Projects',
    },

    projects: {
      heading: 'Projects',
      label: 'Selected work',
      cta: 'View Project',
      items: [
        {
          description: 'Elegant digital presence for a beauty and wellness salon.',
        },
        {
          description: 'Premium e-commerce for custom-built electric bicycles.',
        },
        {
          description: 'Social platform for dog lovers to share their moments.',
        },
        {
          description: 'Modern digital platform for public procurement and bidding.',
        },
        {
          description: 'Collectibles shop with playful branding and clean navigation.',
        },
      ],
    },

    services: {
      heading: 'Services',
      label: 'What we do',
      items: [
        {
          title: 'Landing Pages',
          description: 'A focused presence, built to convert. Fast, beautiful, effective.',
        },
        {
          title: 'Institutional Sites',
          description: 'Your complete digital identity — from design to the last detail.',
        },
        {
          title: 'E-commerce',
          description: 'Stores that sell while you sleep. Built to grow with your business.',
        },
      ],
    },

    about: {
      text: 'We are a digital studio from Porto. We build with intention — every detail has weight, every interaction has purpose.',
      subtext: 'Founded in 2021.',
    },

    footer: {
      heading: 'Get in Touch',
      contactLabel: 'Direct Contact',
      socialLabel: 'Social',
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Message',
      submit: 'Send Message',
      submitting: 'Sending…',
      successTitle: 'Message received.',
      successSub: 'We\'ll be in touch soon.',
    },

    misc: {
      scrollHint: 'Scroll',
      locationLabel: 'Porto, PT — Digital Studio',
    },
  },
} as const
