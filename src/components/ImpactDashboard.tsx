import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Leaf, 
  Coins, 
  Building2, 
  Compass, 
  CheckCircle2, 
  MapPin, 
  HeartHandshake,
  ArrowUpRight,
  Sparkles,
  PieChart
} from 'lucide-react';
import { MaterialItem, PublicSpaceNeed } from '../types';

interface ImpactDashboardProps {
  materials: MaterialItem[];
  needs: PublicSpaceNeed[];
  onGoMarketplace: () => void;
  onGoObservatory: () => void;
}

export const ImpactDashboard: React.FC<ImpactDashboardProps> = ({
  materials,
  needs,
  onGoMarketplace,
  onGoObservatory,
}) => {
  const totalCo2Saved = materials.reduce((acc, m) => acc + m.co2SavedKg, 0);
  const totalMarketValue = materials.reduce((acc, m) => acc + m.marketPriceEstimated, 0);
  const totalListingPrice = materials.reduce((acc, m) => acc + m.listingPrice, 0);
  const totalCitizenSavings = totalMarketValue - totalListingPrice;
  const donationsCount = materials.filter(m => m.isDonation).length;
  const urgentNeedsCount = needs.filter(n => n.priority === 'urgente').length;
  const resolvedOrMatchedCount = needs.filter(n => n.status === 'materiau_identifie' || n.status === 'resolu' || n.status === 'planifie').length;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
            Tableau de Bord Territorial & Smart City
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Indicateurs d'impact circulaire & citoyen
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Mesurez en direct la transformation des surplus de chantiers en équipements publics durables et l'efficacité des interventions des collectivités.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Flux de données ouvert (Open Data BTP)
          </span>
        </div>
      </div>

      {/* 4 Big KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold mb-4">
            <Leaf className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Émissions Carbone Évitées
          </p>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {(totalCo2Saved / 1000).toFixed(1)} t CO₂
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs text-emerald-700 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+34% ce trimestre grâce au réemploi local</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold mb-4">
            <Coins className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Pouvoir d'achat & Économies
          </p>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {totalCitizenSavings.toLocaleString()} MAD
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs text-amber-700 font-semibold">
            <span>Économisés par les particuliers & assos</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Taux d'Appariement Matériaux
          </p>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {Math.round((resolvedOrMatchedCount / (needs.length || 1)) * 100)} %
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs text-blue-700 font-semibold">
            <span>{resolvedOrMatchedCount} besoins publics alimentés par un surplus</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold mb-4">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Dons Solidaires Débloqués
          </p>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {donationsCount} lots
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs text-purple-700 font-semibold">
            <span>100% gratuits pour jardins et écoles</span>
          </div>
        </div>
      </div>

      {/* Two Detailed Analysis Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Module 1: Répartition des matériaux sauvés du BTP */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              Flux de matériaux réemployés par catégorie
            </h3>
            <span className="text-xs font-bold text-slate-400">Total BTP</span>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Sable, Granulats & Gravier', percent: 34, color: 'bg-amber-500', note: 'Allées piétonnes, chapes et stabilisés' },
              { label: 'Bois d\'œuvre & Madriers', percent: 28, color: 'bg-emerald-600', note: 'Bancs publics, pergolas et jardinières' },
              { label: 'Ciment, Chaux & Liants', percent: 18, color: 'bg-blue-600', note: 'Réfection trottoirs et bordures' },
              { label: 'Briques cuites & Pierres', percent: 12, color: 'bg-red-500', note: 'Murets de permaculture et parvis' },
              { label: 'Peintures & Finitions', percent: 8, color: 'bg-purple-500', note: 'Fresques participatives et préaux' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{item.label}</span>
                  <span className="text-slate-600">{item.percent}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.color}`} 
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">{item.note}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onGoMarketplace}
            className="mt-8 w-full py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors cursor-pointer"
          >
            <span>Accéder au catalogue complet des surplus</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Module 2: Observatoire et Priorisation des interventions municipales */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                Priorisation territoriale des besoins citoyens
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                Civic Tech
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              L'algorithme de l'Observatoire pondère le <strong>nombre de votes citoyens</strong> avec la 
              <strong>disponibilité immédiate de matériaux de réemploi</strong> à moins de 15 km pour proposer aux services municipaux une liste d'interventions à impact maximal.
            </p>

            <div className="space-y-3">
              {needs.slice(0, 3).map((need) => (
                <div
                  key={need.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {need.district}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {need.upvotes} soutiens
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 truncate mt-1">
                      {need.title}
                    </p>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap bg-emerald-100 text-emerald-800">
                    Matériaux matchés
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onGoObservatory}
            className="mt-8 w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>Consulter l'Observatoire des interventions</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
