import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Compass, 
  AlertTriangle, 
  Check, 
  Wrench,
  Sparkles
} from 'lucide-react';
import { PublicSpaceNeed, NeedPriority, TetouanCity } from '../types';
import { TETOUAN_CITIES } from '../data/mockData';

const CITY_COORDS_MAP: Record<TetouanCity, [number, number]> = {
  'Tétouan': [35.5785, -5.3684],
  'Martil': [35.6186, -5.2747],
  'Cabo Negro': [35.6833, -5.2833],
  "M'diq": [35.6858, -5.3253],
  'Fnideq': [35.8500, -5.3500],
};

interface ReportNeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newNeed: PublicSpaceNeed) => void;
}

const PRESET_NEED_IMAGES = [
  { label: 'Bancs & Mobilier', url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80', cat: 'mobilier_urbain' },
  { label: 'Jardins & Espaces Verts', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80', cat: 'espaces_verts' },
  { label: 'Voirie & Trottoirs', url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80', cat: 'voirie' },
  { label: 'Équipements & Murs', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', cat: 'equipement_public' },
];

export const ReportNeedModal: React.FC<ReportNeedModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PublicSpaceNeed['category']>('mobilier_urbain');
  const [city, setCity] = useState<TetouanCity>('Tétouan');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('Centre-Ville');
  const [priority, setPriority] = useState<NeedPriority>('haute');
  const [requiredMaterialsInput, setRequiredMaterialsInput] = useState('Bois de sapin, sacs de ciment');
  const [reporterName, setReporterName] = useState('Collectif Citoyen Tétouan');
  const [reporterType, setReporterType] = useState<PublicSpaceNeed['reporterType']>('Citoyen');
  const [selectedImage, setSelectedImage] = useState(PRESET_NEED_IMAGES[0].url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) return;

    const catLabels = {
      mobilier_urbain: 'Mobilier Urbain & Détente',
      voirie: 'Voirie & Mobilité Piétonne',
      espaces_verts: 'Espaces Verts & Jardins',
      equipement_public: 'Équipements Publics',
      securite: 'Sécurité Urbaine'
    };

    const materialsArray = requiredMaterialsInput
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    const newNeed: PublicSpaceNeed = {
      id: `need-${Date.now()}`,
      title,
      description: description || 'Dysfonctionnement signalé nécessitant réfection avec matériaux de réemploi.',
      category,
      categoryLabel: catLabels[category],
      city,
      location,
      district,
      coordinates: CITY_COORDS_MAP[city] || [35.5785, -5.3684],
      reportedBy: reporterName,
      reporterType,
      reportedAt: 'À l\'instant',
      priority,
      status: 'signale',
      upvotes: 1,
      hasUpvoted: true,
      requiredMaterials: materialsArray.length > 0 ? materialsArray : ['Matériaux de maçonnerie'],
      imageUrl: selectedImage,
      collectiviteNotes: 'Signalement en cours de qualification par les services communaux.'
    };

    onSubmit(newNeed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Observatoire Citoyen de l'Espace Public
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Signaler un dysfonctionnement ou besoin d'aménagement
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Intitulé du problème / projet *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Bancs cassés Square des Carmes, Allée piétonne boueuse..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Typologie d'espace *
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as PublicSpaceNeed['category'];
                  setCategory(val);
                  const matched = PRESET_NEED_IMAGES.find(img => img.cat === val);
                  if (matched) setSelectedImage(matched.url);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="mobilier_urbain">Mobilier Urbain & Bancs</option>
                <option value="espaces_verts">Espaces Verts & Parcs</option>
                <option value="voirie">Voirie & Trottoirs</option>
                <option value="equipement_public">Équipements Publics & Écoles</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Niveau d'urgence
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as NeedPriority)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="urgente">🚨 Priorité Urgente (danger / sécurité)</option>
                <option value="haute">⚡ Priorité Haute (usage quotidien bloqué)</option>
                <option value="moyenne">Priorité Moyenne (embellissement)</option>
                <option value="faible">Priorité Standard</option>
              </select>
            </div>
          </div>

          {/* Location & District */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Ville *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as TetouanCity)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {TETOUAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Lieu précis (Rue, Square, Corniche) *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ex: Av. des FAR, Corniche..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Quartier
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Ex: Wilaya, Port..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description du problème et de l'usage pour les citoyens
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Expliquez la situation constatée, l'impact sur les piétons, riverains ou enfants..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Materials needed */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Matériaux de réemploi nécessaires (séparés par une virgule)
            </label>
            <input
              type="text"
              value={requiredMaterialsInput}
              onChange={(e) => setRequiredMaterialsInput(e.target.value)}
              placeholder="Ex: Sable, Ciment, Madriers bois, Pavés granit..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              La plateforme matchera automatiquement avec les surplus des chantiers voisins.
            </span>
          </div>

          {/* Reporter details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Votre nom ou collectif
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Statut du déclarant
              </label>
              <select
                value={reporterType}
                onChange={(e) => setReporterType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Citoyen">Citoyen / Riverain</option>
                <option value="Comité de quartier">Comité de quartier</option>
                <option value="Association">Association locale</option>
                <option value="Agent municipal">Agent de voirie / Collectivité</option>
              </select>
            </div>
          </div>

          {/* Preset image select */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Illustration du signalement
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_NEED_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative rounded-xl overflow-hidden aspect-[16/10] border-2 cursor-pointer transition-all ${
                    selectedImage === img.url 
                      ? 'border-blue-600 shadow-md' 
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  {selectedImage === img.url && (
                    <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center text-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1 right-1 bg-black/60 text-[10px] text-white px-1 py-0.5 rounded text-center truncate">
                    {img.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              Publier le signalement dans l'Observatoire
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
