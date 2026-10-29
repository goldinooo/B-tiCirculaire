import React from 'react';
import { Recycle, HeartHandshake, Compass, Building, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onGoHome: () => void;
  onGoMarketplace: () => void;
  onGoObservatory: () => void;
  onGoImpact: () => void;
  onOpenPost: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onGoHome,
  onGoMarketplace,
  onGoObservatory,
  onGoImpact,
  onOpenPost,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Recycle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Bâti<span className="text-emerald-400">Circulaire</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Plateforme d'innovation territoriale et observatoire citoyen reliant les surplus de matériaux 
              des chantiers du BTP aux besoins d'aménagements et d'espaces publics des collectivités et associations.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-md">
                Territoire Intelligent & Services Publics Innovants
              </span>
            </div>
          </div>

          {/* Nav Col 1: Bourse aux Matériaux */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Bourse aux Matériaux
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onGoMarketplace} className="hover:text-white transition-colors cursor-pointer">
                  Sable & Granulats
                </button>
              </li>
              <li>
                <button onClick={onGoMarketplace} className="hover:text-white transition-colors cursor-pointer">
                  Ciment & Liants hydrauliques
                </button>
              </li>
              <li>
                <button onClick={onGoMarketplace} className="hover:text-white transition-colors cursor-pointer">
                  Briques en terre cuite
                </button>
              </li>
              <li>
                <button onClick={onGoMarketplace} className="hover:text-white transition-colors cursor-pointer">
                  Bois d'œuvre & Madriers
                </button>
              </li>
              <li>
                <button onClick={onGoMarketplace} className="hover:text-white transition-colors cursor-pointer">
                  Pavés & Revêtements de voirie
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 2: Observatoire & Solidarité */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Observatoire & Solidarité
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onGoObservatory} className="hover:text-white transition-colors cursor-pointer">
                  Dysfonctionnements signalés
                </button>
              </li>
              <li>
                <button onClick={onGoObservatory} className="hover:text-white transition-colors cursor-pointer">
                  Priorisation des interventions
                </button>
              </li>
              <li>
                <button onClick={onGoMarketplace} className="hover:text-white transition-colors cursor-pointer">
                  Dons 100% gratuits aux associations
                </button>
              </li>
              <li>
                <button onClick={onOpenPost} className="hover:text-white transition-colors cursor-pointer">
                  Déclarer un surplus de chantier
                </button>
              </li>
              <li>
                <button onClick={onGoImpact} className="hover:text-white transition-colors cursor-pointer">
                  Indicateurs CO₂ & Smart City
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 3: Partenaires & Charte */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Cadre & Partenariats
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              En concertation avec la Wilaya de Tanger-Tétouan-Al Hoceïma, les communes urbaines de Tétouan, Martil, M'diq, Fnideq et les associations locales.
            </p>
            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Matériaux certifiés réemploi
              </p>
              <p className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <Sparkles className="w-4 h-4" />
                Open Data territorial Tétouan
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 BâtiCirculaire — Projet Territoire Intelligent & Économie Circulaire (Région de Tétouan - Littoral, Maroc).</p>
          <div className="flex items-center gap-4">
            <span>Politique de confidentialité</span>
            <span>•</span>
            <span>Conditions d'enlèvement sur chantier</span>
            <span>•</span>
            <span>Mentions légales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
