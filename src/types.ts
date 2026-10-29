export type TetouanCity = 'Tétouan' | 'Martil' | 'Cabo Negro' | "M'diq" | 'Fnideq';

export type MaterialCategory = 
  | 'all'
  | 'sable_granulats'
  | 'ciment_liants'
  | 'briques_pierres'
  | 'bois_charpente'
  | 'paves_voirie'
  | 'peintures_finitions'
  | 'quincaillerie_isolants';

export type ListingType = 'all' | 'sale_discount' | 'donation_charity';

export interface MaterialItem {
  id: string;
  title: string;
  category: MaterialCategory;
  categoryLabel: string;
  description: string;
  imageUrl: string;
  quantity: string;
  unit: string;
  remainingPercent: number;
  marketPriceEstimated: number; // in MAD (Dirham marocain)
  listingPrice: number; // in MAD (0 if donation)
  isDonation: boolean;
  eligibleBeneficiaries: ('all' | 'associations' | 'collectivites' | 'artisans' | 'particuliers')[];
  condition: 'Neuf non ouvert' | 'Surplus de découpe' | 'Réemploi bon état' | 'Palette complète entamée';
  location: {
    city: TetouanCity;
    district: string;
    siteName: string; // e.g., "Chantier Marina Smir", "Avenue des FAR, Tétouan"
    coordinates: [number, number]; // [lat, lng]
  };
  owner: {
    id: string;
    name: string;
    role: 'Chef de chantier' | 'Artisan BTP' | 'Collectivité Territoriale' | 'Association' | 'Particulier Rénovateur';
    companyOrOrg?: string;
    verified: boolean;
    rating: number;
    responseRate: string;
    avatarUrl: string;
    phone?: string;
  };
  co2SavedKg: number;
  availableUntil: string;
  createdAt: string;
  tags: string[];
}

export type NeedPriority = 'urgente' | 'haute' | 'moyenne' | 'faible';
export type NeedStatus = 'signale' | 'en_etude' | 'materiau_identifie' | 'planifie' | 'resolu';

export interface PublicSpaceNeed {
  id: string;
  title: string;
  description: string;
  category: 'voirie' | 'mobilier_urbain' | 'espaces_verts' | 'equipement_public' | 'securite';
  categoryLabel: string;
  location: string;
  city: TetouanCity;
  district: string;
  coordinates: [number, number]; // [lat, lng]
  reportedBy: string;
  reporterType: 'Citoyen' | 'Comité de quartier' | 'Association' | 'Agent communal';
  reportedAt: string;
  priority: NeedPriority;
  status: NeedStatus;
  upvotes: number;
  hasUpvoted?: boolean;
  requiredMaterials: string[];
  matchedMaterialId?: string;
  imageUrl?: string;
  collectiviteNotes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'artisan' | 'collectivite' | 'association' | 'citoyen';
  roleTitle: string;
  organization: string;
  city: TetouanCity;
  address: string;
  email: string;
  phone: string;
  avatarUrl: string;
  bio: string;
  stats: {
    surplusPosted: number;
    donationsCompleted: number;
    co2SavedKg: number;
    savingsMAD: number;
  };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  isOwner: boolean;
  text: string;
  timestamp: string;
  attachmentInfo?: {
    materialTitle: string;
    priceFormatted: string;
  };
}

export interface ChatConversation {
  id: string;
  materialId: string;
  materialTitle: string;
  materialImage: string;
  listingPrice: number;
  isDonation: boolean;
  ownerName: string;
  ownerAvatar: string;
  ownerRole: string;
  siteName: string;
  lastMessageTime: string;
  messages: ChatMessage[];
}

export interface UserRole {
  id: 'citoyen' | 'artisan' | 'collectivite' | 'association';
  name: string;
  label: string;
  badge: string;
  icon: string;
}
