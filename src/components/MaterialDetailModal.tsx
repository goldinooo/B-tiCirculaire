import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Building2, 
  HeartHandshake, 
  Coins, 
  ShieldCheck, 
  CheckCircle2, 
  Leaf, 
  Truck, 
  MessageSquare,
  AlertCircle,
  Share2,
  FileText
} from 'lucide-react';
import { MaterialItem } from '../types';

interface MaterialDetailModalProps {
  material: MaterialItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: (material: MaterialItem) => void;
}

export const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({
  material,
  isOpen,
  onClose,
  onOpenChat,
}) => {
  if (!isOpen || !material) return null;

  const savingsAmount = material.marketPriceEstimated - material.listingPrice;
  const savingsPercent = Math.round((savingsAmount / material.marketPriceEstimated) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
              Fiche Réemploi #{material.id}
            </span>
            {material.isDonation ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                Don Solidaire Caritatif
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                <Coins className="w-3.5 h-3.5 text-amber-600" />
                Prix Réduit Chantier (-{savingsPercent}%)
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Main Visual & Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-xs">
              <img
                src={material.imageUrl}
                alt={material.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-semibold">
                Quantité : {material.quantity}
              </div>
            </div>

            <div className="md:col-span-5 space-y-4">
              {/* Pricing Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Tarif de réemploi
                </p>
                {material.isDonation ? (
                  <div className="mt-1">
                    <p className="text-3xl font-black text-emerald-600">0 DH (Gratuit)</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Valeur neuve estimée : <span className="line-through">{material.marketPriceEstimated} MAD</span>
                    </p>
                    <p className="text-xs text-emerald-700 font-bold mt-2 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      🎁 Réservé aux associations caritatives, jardins partagés ou projets municipaux de Tétouan & littoral.
                    </p>
                  </div>
                ) : (
                  <div className="mt-1">
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-black text-slate-900">{material.listingPrice} MAD</p>
                      <p className="text-sm text-slate-400 line-through">{material.marketPriceEstimated} MAD</p>
                    </div>
                    <p className="text-xs text-emerald-700 font-bold mt-1">
                      Économie directe de {savingsAmount} MAD (-{savingsPercent}%)
                    </p>
                  </div>
                )}
              </div>

              {/* Eco-Impact */}
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-700 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-900">Impact Éco-responsable</p>
                  <p className="text-xs text-teal-700">
                    <strong>{material.co2SavedKg} kg de CO₂</strong> évités en réemployant ce surplus plutôt qu'en fabriquant du neuf.
                  </p>
                </div>
              </div>

              {/* Quick Owner Info */}
              <div className="border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
                <img
                  src={material.owner.avatarUrl}
                  alt={material.owner.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900 flex items-center gap-1">
                    {material.owner.name}
                    {material.owner.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </p>
                  <p className="text-slate-500">{material.owner.companyOrOrg || material.owner.role}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                    ★ {material.owner.rating} • Répond en {material.owner.responseRate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Specs */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{material.title}</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {material.description}
            </p>
          </div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 block">État du lot</span>
              <span className="font-bold text-slate-800 mt-0.5 block">{material.condition}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 block">Conditionnement</span>
              <span className="font-bold text-slate-800 mt-0.5 block">{material.unit}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 block">Disponibilité</span>
              <span className="font-bold text-slate-800 mt-0.5 block">Jusqu'au {material.availableUntil}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-slate-400 block">Levage sur site</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">Chariot disponible</span>
            </div>
          </div>

          {/* Pickup & Logistics Address */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-slate-900">Adresse d'enlèvement sur chantier :</p>
              <p className="text-slate-700 mt-0.5">{material.location.siteName}</p>
              <p className="text-slate-500">{material.location.city} ({material.location.district}) — Province de Tétouan / Littoral</p>
              <p className="text-[11px] text-slate-400 mt-1 italic">
                Horaires d'accès : Du lundi au samedi 8h00 - 17h30. Port des EPI conseillé pour l'enlèvement.
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {material.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
          >
            Fermer
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenChat(material);
            }}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            {material.isDonation ? 'Demander ce don (Ouvrir le Chat)' : 'Contacter & Réserver ce lot (Ouvrir le Chat)'}
          </button>
        </div>

      </div>
    </div>
  );
};
