/**
 * VOID Studio - Content Configuration
 *
 * All copy and data lives here. Edit this file to update the site
 * without touching component code. See README.md for instructions.
 */

export const studio = {
  name: "VOID",
  tagline: "Fill the void.",
  location: "Porto, Portugal",
  email: "contato@voidstudio.pt",
  phone: "+351 915 619 867",
  social: {
    instagram: "https://instagram.com/v0id_studi0",
    linkedin: "https://linkedin.com/company/v0idstudi0",
  },
};

export const hero = {
  lines: ["Built", "from", "the void."],
  accentLineIndex: 2, // which line gets the amber accent color
  cta: {
    label: "Ver Projetos",
    href: "#projetos",
  },
};

export const projects = [
  {
    id: "01",
    name: "Fernanda Garcia",
    category: "Institucional",
    description:
      "Academia de estética especializada em lash lifting e design de sobrancelhas.",
    year: "2026",
    url: "https://fernandagarciaacademy.com/",
    image: "/projects/fernanda-garcia.png",
    accentColor: "#8B6E45",
  },
  {
    id: "02",
    name: "Bárbara Santander",
    category: "Landing Page",
    description:
      "Presença digital para uma advogada previdenciária, com atendimento humanizado e foco em cada detalhe.",
    year: "2026",
    url: "https://barbara-santander.vercel.app/",
    image: "/projects/barbara.png",
    accentColor: "#8A7460",
  },
  {
    id: "03",
    name: "Casa Santé",
    category: "Landing Page",
    description: "Presença elegante para um salão de estética e bem-estar.",
    year: "2026",
    url: "https://casa-sante.vercel.app/",
    image: "/projects/casa-sante.png",
    accentColor: "#5C4A3A",
  },
  {
    id: "04",
    name: "Bikcraft",
    category: "E-commerce",
    description:
      "Loja de bicicletas eléctricas personalizadas com design premium.",
    year: "2024",
    url: "https://bikcraft-bc.vercel.app/",
    image: "/projects/bikcraft.png",
    accentColor: "#1A2744",
  },
  {
    id: "05",
    name: "Léo Nycz",
    category: "Portfólio",
    description:
      "Portfólio de desenvolvimento full-stack com aplicações web, jogos e experiências 3D.",
    year: "2025",
    url: "https://portfolio-leo-nycz.vercel.app/",
    image: "/projects/portfolio.png",
    accentColor: "#1A2E4A",
  },
  {
    id: "06",
    name: "Vitor Sampaio",
    category: "Portfólio",
    description:
      "Presença digital para um ceramista artesanal que cria peças únicas trabalhadas à mão no torno.",
    year: "2026",
    url: "https://vitor-sampaio.vercel.app/",
    image: "/projects/vitor-sampaio.png",
    accentColor: "#8B5A3C",
  },
  {
    id: "07",
    name: "Le Clarté",
    category: "E-commerce",
    description:
      "Protótipo de e-commerce de luxo para skincare com cenas 3D interactivas em Three.js.",
    year: "2026",
    url: "https://le-clarte.vercel.app/",
    image: "/projects/le-clarte.png",
    accentColor: "#B8906A",
  },
  {
    id: "08",
    name: "Dogs",
    category: "Rede Social",
    description: "Plataforma social para amantes de cães partilharem momentos.",
    year: "2025",
    url: "https://dogs-socialnet.vercel.app/",
    image: "/projects/dogs.png",
    accentColor: "#3D2B1F",
  },
  {
    id: "09",
    name: "Licittare",
    category: "Institucional",
    description: "Plataforma digital moderna para licitações e procurement.",
    year: "2025",
    url: "https://licittare-ff.vercel.app/",
    image: "/projects/licittare.png",
    accentColor: "#1A3A2A",
  },
  {
    id: "10",
    name: "Duck Shop",
    category: "E-commerce",
    description:
      "Loja de coleccionáveis com branding divertido e navegação simples.",
    year: "2024",
    url: "https://duck-shop-vs.vercel.app/",
    image: "/projects/duck-shop.png",
    accentColor: "#5C4200",
  },
];

export const services = [
  {
    number: "01",
    title: "Landing Pages",
    description:
      "Uma presença focada, construída para converter. Rápida, bonita, eficaz.",
  },
  {
    number: "02",
    title: "Sites Institucionais",
    description:
      "A identidade digital completa do seu negócio - do design ao último detalhe.",
  },
  {
    number: "03",
    title: "E-commerce",
    description:
      "Lojas que vendem enquanto dorme. Construídas para crescer com o seu negócio.",
  },
];

export const about = {
  text: "Somos um estúdio digital de Porto. Construímos com intenção. Cada detalhe tem peso, cada interacção tem propósito.",
  subtext: "Fundado em 2021.",
};

export const nav = [
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Estúdio", href: "#estudio" },
  { label: "Contacto", href: "#contacto" },
];
