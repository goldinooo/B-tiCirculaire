import React, { useState } from 'react';
import { 
  PublicSpaceNeed, 
  NeedPriority, 
  NeedStatus, 
  MaterialItem 
} from '../types';
import { 
  Compass, 
  MapPin, 
  ThumbsUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  PlusCircle, 
  Building, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Layers,
  Wrench
} from 'lucide-react';

interface ObservatorySectionProps {
  needs: PublicSpaceNeed[];
  materials: MaterialItem[];
  onUpvoteNeed: (needId: string) => void;
  onOpenReportNeedModal: () => void;
  onOpenChatWithMaterial: (material: MaterialItem) => void;
  onUpdateNeedStatus?: (needId: string, status: NeedStatus) => void;
}

const STATUS_CONFIG: Record<NeedStatus, { label: string; bg: string; text: string }> = {
  signale: { label: 'Signalement citoyen', bg: 'bg-amber-100', text: 'text-amber-800' },
  en_etude: { label: 'En étude technique', bg: 'bg-blue-100', text: 'text-blue-800' },
  materiau_identifie: { label: 'Matériau de réemploi matché', bg: 'bg-emerald-100', text: 'text-emerald-800' },
  planifie: { label: 'Chantier municipal planifié', bg: 'bg-purple-100', text: 'text-purple-800' },
  resolu: { label: 'Espace public réhabilité', bg: 'bg-teal-100', text: 'text-teal-800' },
};

const PRIORITY_CONFIG: Record<NeedPriority, { label: string; color: string; border: string }> = {
  urgente: { label: 'Priorité Urgente', color: 'bg-red-500 text-white', border: 'border-red-500' },
  haute: { label: 'Priorité Haute', color: 'bg-orange-500 text-white', border: 'border-orange-500' },
  moyenne: { label: 'Priorité Moyenne', color: 'bg-blue-500 text-white', border: 'border-blue-500' },
  faible: { label: 'Priorité Standard', color: 'bg-slate-400 text-white', border: 'border-slate-400' },
};

export const ObservatorySection: React.FC<ObservatorySectionProps> = ({
  needs,
  materials,
  onUpvoteNeed,
  onOpenReportNeedModal,
  onOpenChatWithMaterial,
  onUpdateNeedStatus,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredNeeds = needs.filter((need) => {
    if (selectedCategory !== 'all' && need.category !== selectedCategory) return false;
    if (selectedPriority !== 'all' && need.priority !== selectedPriority) return false;
    if (selectedStatus !== 'all' && need.status !== selectedStatus) return false;
    return true;
  });

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden mb-10">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              Observatoire Numérique Territorial
            </span>
            <span className="text-xs text-slate-300">
              Participation Citoyenne & Smart City
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Recueillir les besoins citoyens, <br />
            <span className="bg-gradient-to-r from-blue-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
              prioriser et réparer les espaces publics
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Grâce à la donnée participative, les collectivités identifient en direct les dysfonctionnements urbains 
            (bancs brisés, squares dégradés, voirie accidentée) et mobilisent <strong>les surplus de chantiers locaux</strong> 
            pour agir rapidement sans gaspiller les deniers publics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReportNeedModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-sm shadow-md shadow-blue-500/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Signaler un dysfonctionnement dans votre quartier
            </button>
            <span className="text-xs text-slate-400">
              Votez pour faire remonter les urgences de votre ville
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filtres :
          </span>

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Toutes les typologies</option>
            <option value="mobilier_urbain">Mobilier Urbain</option>
            <option value="voirie">Voirie & Trottoirs</option>
            <option value="espaces_verts">Espaces Verts & Jardins</option>
            <option value="equipement_public">Équipements Publics</option>
          </select>

          {/* Priority */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Toutes les priorités</option>
            <option value="urgente">🚨 Priorité Urgente</option>
            <option value="haute">⚡ Priorité Haute</option>
            <option value="moyenne">Priorité Moyenne</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Tous les statuts</option>
            <option value="signale">Signalé</option>
            <option value="en_etude">En étude</option>
            <option value="materiau_identifie">Matériau identifié</option>
            <option value="planifie">Planifié</option>
            <option value="resolu">Résolu</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          <strong className="text-slate-900">{filteredNeeds.length}</strong> besoins répertoriés par les usagers
        </div>
      </div>

      {/* Needs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNeeds.map((need) => {
          const matchedMaterial = need.matchedMaterialId 
            ? materials.find(m => m.id === need.matchedMaterialId) 
            : null;

          return (
            <div
              key={need.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Header if available */}
                {need.imageUrl && (
                  <div className="relative aspect-[21/9] overflow-hidden bg-slate-100">
                    <img
                      src={need.imageUrl}
                      alt={need.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm ${PRIORITY_CONFIG[need.priority].color}`}>
                        {PRIORITY_CONFIG[need.priority].label}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm ${STATUS_CONFIG[need.status].bg} ${STATUS_CONFIG[need.status].text}`}>
                        {STATUS_CONFIG[need.status].label}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Category and location */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {need.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {need.reportedAt}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {need.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2 font-medium">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{need.location} ({need.city} • {need.district})</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {need.description}
                  </p>

                  {/* Required Materials Tags */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-slate-400" />
                      Matériaux requis pour intervention :
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {need.requiredMaterials.map((mat, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Smart City Match Card (The key link between citizen needs & workshop surplus) */}
                  {matchedMaterial && (
                    <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          Surplus de chantier compatible détecté !
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {matchedMaterial.isDonation ? 'Don 0 DH' : `${matchedMaterial.listingPrice} MAD`}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <img
                          src={matchedMaterial.imageUrl}
                          alt={matchedMaterial.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-emerald-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {matchedMaterial.title}
                          </p>
                          <p className="text-[11px] text-slate-600 truncate">
                            {matchedMaterial.location.siteName} ({matchedMaterial.location.city})
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenChatWithMaterial(matchedMaterial)}
                        className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Réserver ce surplus pour ce chantier public
                      </button>
                    </div>
                  )}

                  {/* Collectivite Notes */}
                  {need.collectiviteNotes && (
                    <div className="mt-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900">
                      <p className="font-bold flex items-center gap-1.5 text-blue-800">
                        <Building className="w-3.5 h-3.5" />
                        Suivi Services Municipaux :
                      </p>
                      <p className="mt-1 text-slate-700 leading-relaxed">
                        {need.collectiviteNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer: Upvote citizen support + Reporter info */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-400">Signalé par :</span>{' '}
                  <span className="font-semibold text-slate-700">{need.reportedBy}</span>
                  <span className="text-[10px] text-slate-400 ml-1">({need.reporterType})</span>
                </div>

                {/* Upvote button */}
                <button
                  onClick={() => onUpvoteNeed(need.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    need.hasUpvoted
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  title="Soutenir la priorisation de cette intervention"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${need.hasUpvoted ? 'fill-current' : ''}`} />
                  <span>{need.upvotes}</span>
                  <span className="hidden sm:inline">soutiens</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
