/**
 * VOID Studio — Content Configuration
 *
 * All copy and data lives here. Edit this file to update the site
 * without touching component code. See README.md for instructions.
 */

export const studio = {
  name: "VOID",
  tagline: "Fill the void.",
  location: "Porto, Portugal",
  email: "santandernycz.ls@gmail.com",
  phone: "+351 915 619 867",
  social: {
    instagram: "https://instagram.com/v0id_studi0",
    linkedin: "https://linkedin.com/company/v0idstudi0",
    behance: "https://behance.net/voidstudio",
  },
};

export const hero = {
  lines: ["Where nothing", "becomes", "something."],
  accentLineIndex: 2, // which line gets the amber accent color
  cta: {
    label: "Ver Projetos",
    href: "#projetos",
  },
};

export const projects = [
  {
    id: "01",
    name: "Casa Santé",
    category: "Landing Page",
    description: "Presença elegante para um salão de estética e bem-estar.",
    year: "2024",
    url: "https://casa-sante.vercel.app/",
    // Replace: drop your screenshot into public/projects/casa-sante.png (or .jpg/.webp)
    image: "/projects/casa-sante.png",
    accentColor: "#5C4A3A",
  },
  {
    id: "02",
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
    id: "03",
    name: "Dogs",
    category: "Rede Social",
    description: "Plataforma social para amantes de cães partilharem momentos.",
    year: "2024",
    url: "https://dogs-socialnet.vercel.app/",
    image: "/projects/dogs.png",
    accentColor: "#3D2B1F",
  },
  {
    id: "04",
    name: "Licittare",
    category: "Institucional",
    description: "Plataforma digital moderna para licitações e procurement.",
    year: "2023",
    url: "https://licittare-ff.vercel.app/",
    image: "/projects/licittare.png",
    accentColor: "#1A3A2A",
  },
  {
    id: "05",
    name: "Duck Shop",
    category: "E-commerce",
    description:
      "Loja de coleccionáveis com branding divertido e navegação simples.",
    year: "2023",
    url: "https://duck-shop-ff.vercel.app/",
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
      "A identidade digital completa do seu negócio — do design ao último detalhe.",
  },
  {
    number: "03",
    title: "E-commerce",
    description:
      "Lojas que vendem enquanto dorme. Construídas para crescer com o seu negócio.",
  },
];

export const about = {
  text: "Somos um estúdio digital de Porto. Construímos com intenção — cada detalhe tem peso, cada interacção tem propósito.",
  subtext: "Fundado em 2021.",
};

export const nav = [
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Estúdio", href: "#estudio" },
  { label: "Contacto", href: "#contacto" },
];
