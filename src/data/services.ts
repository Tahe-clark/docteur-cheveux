import nattesImg from '../assets/nattes.jpg';

export interface ServiceItem {
  id: string;
  category: string; // ex: 'Tresses', 'Soins', 'Coupes'
  title: string;
  duration: string;
  price: string;
  description: string;
  inclusions: string[];
  preparation: string;
  products?: string;
  image: string;
}

export interface LocalizationContent {
  searchPlaceholder: string;
  categories: string[];
  services: ServiceItem[];
  btnDetails: string;
  btnBook: string;
  btnBack: string;
  btnConfirm: string;
  formTitle: string;
  formName: string;
  formPhone: string;
  successTitle: string;
  successSubtitle: string;
  subtitle?: string;
}

export const servicesData: Record<'abdramane' | 'fahima', LocalizationContent> = {
  abdramane: {
    searchPlaceholder: "Rechercher un service (ex: nattes, soins...)",
    categories: ["Tous", "Tresses", "Soins", "Coupes"],
    btnDetails: "Voir détails",
    btnBook: "Réservation",
    btnBack: "Retour",
    btnConfirm: "Confirmer",
    formTitle: "Infos du client",
    formName: "Nom et prénoms",
    formPhone: "Numéro de téléphone",
    successTitle: "Merci !",
    successSubtitle: "Vous recevrez un mail de confirmation.",
    services: [
      {
        id: "nattes-collees",
        category: "Tresses",
        title: "Nattes Collées",
        duration: "Durée : 2h00",
        price: "Prix : 50 $",
        description: "Coiffure protectrice moderne et soignée, adaptée à tous types de cheveux afro. Idéal pour un style durable.",
        inclusions: [
          "Shampoing hydratant et soin revitalisant inclus avant la tresse.",
          "Modèle classique de nattes collées vers l'arrière.",
          "Application d'une pommade nourrissante."
        ],
        preparation: "Veuillez vous présenter avec les cheveux démêlés. Les extensions ne sont pas incluses.",
        image: nattesImg
      },
      {
        id: "soin-profond",
        category: "Soins",
        title: "Soin Hydratant Profond",
        duration: "Durée : 1h00",
        price: "Prix : 45 $",
        description: "Traitement intensif à la vapeur pour restaurer l'hydratation naturelle des boucles et stimuler la pousse.",
        inclusions: ["Bain d'huiles naturelles", "Casque à vapeur", "Massage du cuir chevelu"],
        preparation: "Aucune préparation requise. Laissez-nous prendre soin de vous.",
        image: nattesImg
      },
      {
        id: "coupe-afro",
        category: "Coupes",
        title: "Coupe & Définition des Boucles",
        duration: "Durée : 1h30",
        price: "Prix : 60 $",
        description: "Coupe sur cheveux secs pour harmoniser la forme de votre afro, suivie d'un wash-and-go parfait.",
        inclusions: ["Coupe personnalisée", " Shampoing sans sulfate", "Définition aux doigts (Finger coiling)"],
        preparation: "Veuillez venir avec vos cheveux lavés de la veille et sans produits lourds.",
        image: nattesImg
      }
    ]
  },
  fahima: {
    searchPlaceholder: "Search for a service...",
    categories: ["All", "Treatments", "Braids", "Styling"],
    subtitle: "Custom Braids & Styling",
    btnDetails: "View details",
    btnBook: "Book Appointment",
    btnBack: "Back",
    btnConfirm: "Confirm Booking",
    formTitle: "Customer Information",
    formName: "Full Name",
    formPhone: "Phone Number",
    successTitle: "Thank you, Fahima!",
    successSubtitle: "Your appointment is successfully booked. Check your email for confirmation.",
    services: [
      {
        id: "hair-wash",
        category: "Treatments",
        title: "Hair Wash & Capillary Advice",
        duration: "Duration: 1h15",
        price: "Price: 40 $",
        description: "Complete hydrating wash treatment followed by a personalized scalp and hair health consultation.",
        inclusions: [
          "Deep conditioning treatment included.",
          "Personalized routine recommendation according to your hair type.",
          "Blow-dry included in the package."
        ],
        preparation: "Please arrive with your hair detangled and ready for washing.",
        image: nattesImg,
        products: "Organic hydrating shampoos, shea butter deep conditioners, and natural protective oils."
      },
      {
        id: "box-braids",
        category: "Braids",
        title: "Box Braids (Medium)",
        duration: "Duration: 4h30",
        price: "Price: 120 $",
        description: "Classic protective full-head box braids with neat, high-contrast clean partings.",
        inclusions: ["Scalp oiling treatment", "Edge styling", "Hot water dipping finishing"],
        preparation: "Hair must be washed, blown out, and fully detangled before arrival.",
        image: nattesImg
      }
    ]
  }
};