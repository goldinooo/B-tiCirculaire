import React from 'react';
import { 
  Building2, 
  HeartHandshake, 
  Compass, 
  ArrowRight, 
  Coins, 
  Truck, 
  Users, 
  CheckCircle,
  Lightbulb,
  Shield,
  MessageCircle
} from 'lucide-react';

interface FeaturesExplainerProps {
  onGoMarketplace: () => void;
  onGoDonations: () => void;
  onGoObservatory: () => void;
}

export const FeaturesExplainer: React.FC<FeaturesExplainerProps> = ({
  onGoMarketplace,
  onGoDonations,
  onGoObservatory,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            Modèle d'Économie Circulaire Urbaine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
            Comment fonctionne l'alliance <br />
            entre chantiers, citoyens et espaces publics ?
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Chaque année, des millions de tonnes de matériaux neufs non utilisés finissent en décharge à la livraison d'un bâtiment. 
            Notre plateforme crée une boucle vertueuse où le déchet des uns devient la ressource de la ville.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Surplus BTP à prix cassés */}
          <div className="group relative rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
                <Coins className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Économie de -50% à -80%
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                1. Cession à Prix Réduit
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Les chantiers achevés vendent leurs surplus restants (sable criblé, sacs de ciment frais, briques cuites, madriers, peinture) à des tarifs très inférieurs au marché.
              </p>
              
              <ul className="mt-5 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Désengorge immédiatement les emprises de chantiers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Permet aux artisans et citoyens de bâtir à moindre coût</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Traçabilité et vérification des vendeurs</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onGoMarketplace}
              className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-1 transition-all cursor-pointer"
            >
              Voir les annonces à prix réduit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 2: Don Solidaire aux Associations */}
          <div className="group relative rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:bg-white hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-xs">
                100% GRATUIT
              </span>
            </div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Solidarité & Quartiers
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                2. Pôle Don aux Associations
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Une catégorie dédiée où les détenteurs offrent gracieusement leurs matériaux aux associations caritatives, jardins partagés, tiers-lieux et écoles de quartier.
              </p>

              <ul className="mt-5 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Reçu de don éco-solidaire pour l'entreprise donatrice</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Priorité d'enlèvement aux structures à but non lucratif</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Matériel idéal pour mobilier partagé et aménagements doux</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onGoDonations}
              className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 group-hover:translate-x-1 transition-all cursor-pointer"
            >
              Parcourir les dons caritatifs disponibles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pillar 3: Observatoire des Espaces Publics */}
          <div className="group relative rounded-3xl bg-slate-50 border border-slate-200 p-8 hover:bg-white hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Smart City & Collectivités
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                3. Observatoire & Participation
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Les citoyens signalent les besoins d'espaces publics (banc cassé, trottoir affaissé, création d'un square). La collectivité associe directement les surplus locaux pour agir vite.
              </p>

              <ul className="mt-5 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Cartographie collaborative des besoins réels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Priorisation territoriale basée sur les votes citoyens</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Appariement automatique avec les surplus de chantiers</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onGoObservatory}
              className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-800 group-hover:translate-x-1 transition-all cursor-pointer"
            >
              Accéder à l'Observatoire Citoyen
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Step-by-step workflow */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
              En direct après la connexion
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Un Chat interactif s'ouvre avec le chef de chantier
            </h3>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">
              Dès que vous sélectionnez un lot de matériaux (en vente ou en don), une messagerie directe s'ouvre 
              avec le responsable du chantier. Discutez de l'enlèvement, planifiez le créneau de passage et 
              réservez le matériel en toute simplicité.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-800">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </div>
              <div>
                <p className="text-sm font-bold text-white">Choisissez le lot</p>
                <p className="text-xs text-slate-400 mt-1">Vérifiez la quantité, l'adresse du chantier et le prix.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div>
                <p className="text-sm font-bold text-white">Échangez via le Chat</p>
                <p className="text-xs text-slate-400 mt-1">Posez vos questions techniques et précisez si vous êtes une association.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div>
                <p className="text-sm font-bold text-white">Récupérez sur place</p>
                <p className="text-xs text-slate-400 mt-1">Bénéficiez des engins de levage du chantier pour charger votre véhicule.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
