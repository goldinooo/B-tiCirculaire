import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Building, 
  HeartHandshake, 
  MapPin, 
  TrendingDown, 
  ShieldCheck, 
  CheckCircle2, 
  Search,
  Layers,
  Leaf
} from 'lucide-react';

interface HeroSectionProps {
  onExploreMarketplace: () => void;
  onExploreObservatory: () => void;
  onOpenPostSurplus: () => void;
  onOpenDonations: () => void;
  onSearch: (term: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMarketplace,
  onExploreObservatory,
  onOpenPostSurplus,
  onOpenDonations,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      onExploreMarketplace();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background architectural glow & grid effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-slate-900/0 to-slate-900/80 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Challenge & Theme badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Défi : Territoire Intelligent & Services Publics Innovants
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            Smart City & Espace Public
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Leaf className="w-3.5 h-3.5 text-amber-400" />
            Économie Circulaire & Anti-Gaspillage BTP
          </span>
        </div>

        {/* Hero Title & Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              Chantiers finis à Tétouan & Littoral ? <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                Ne jetez plus vos matériaux,
              </span>{' '}
              réenchantons nos espaces publics.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              <strong>BâtiCirculaire</strong> connecte les surplus de chantiers (<strong>sable d'Oued Laou, ciment CPJ, briques, bois, pavés</strong>) 
              à <strong>Tétouan, Martil, Cabo Negro, M'diq et Fnideq</strong>. Les citoyens et artisans accèdent à des <strong>prix réduits en Dirhams (MAD)</strong>, 
              et les associations ou communes bénéficient de <strong>dons solidaires (0 DH)</strong> pour rénover parcs, corniches et mobilier urbain.
            </p>

            {/* Quick search input */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
              <div className="flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-xl focus-within:border-emerald-400 transition-colors">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher sable, ciment CPJ, briques à Tétouan, Martil..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-0 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
                >
                  Trouver un lot
                </button>
              </div>

              {/* Suggestions chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
                <span className="font-medium text-slate-300">Lots fréquents :</span>
                {['Sable Oued Laou', 'Ciment 50kg', 'Briques rouges', 'Bois Sapin', 'Pavés Fnideq'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchTerm(tag);
                      onSearch(tag);
                      onExploreMarketplace();
                    }}
                    className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 transition-colors border border-white/10"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreMarketplace}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-900 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Building className="w-4 h-4 text-slate-900" />
                Bourse aux Matériaux (MAD)
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDonations}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-400/30 transition-all cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                Dons Associatifs (0 DH)
              </button>

              <button
                onClick={onExploreObservatory}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-blue-400" />
                Observatoire & Carte
              </button>
            </div>
          </div>

          {/* Interactive Feature Card / Visual Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Flux Circulaire en direct
                  </span>
                </div>
                <span className="text-xs text-slate-400">Tétouan • M'diq • Martil</span>
              </div>

              {/* Sample Match in real time */}
              <div className="mt-5 space-y-4">
                <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30 font-bold text-lg">
                        🧱
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                            Don Solidaire 100% Offert
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">Palette 450 Briques Rouges</h4>
                        <p className="text-xs text-slate-400">Chantier Corniche Martil • 1 600 MAD valeur marchande</p>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="my-3 py-2 px-3 bg-slate-900/70 rounded-xl flex items-center justify-between text-xs text-slate-300 border border-slate-700/40">
                    <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <TrendingDown className="w-3.5 h-3.5" />
                      Déchet évité en décharge
                    </span>
                    <span className="text-emerald-400 font-bold">Fléché vers projet public ➔</span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 text-sm">
                      🌳
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-slate-200">Affecté au Jardin Citoyen Toubib (Tétouan)</p>
                      <p className="text-slate-400">Aménagement de murets de permaculture par les habitants</p>
                    </div>
                  </div>
                </div>

                {/* Key value propositions checklist */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Prix -50% à -80%</strong> : Sable, ciment et outillage neufs rachetés à prix d'aubaine</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Pôle Don Caritatif</strong> : Réservé aux associations de quartier et tiers-lieux</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Chat direct instantané</strong> : Négociation et réservation en un clic avec le chef de chantier</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenPostSurplus}
                    className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-600 cursor-pointer"
                  >
                    <span>Vous avez un chantier qui se termine ? Déposer un lot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Impact Counters */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-800 pt-10">
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-5">
            <p className="text-2xl sm:text-4xl font-extrabold text-emerald-400">142 t</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Matériaux réemployés</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Sable, ciment, briques sauvés de la benne</p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-5">
            <p className="text-2xl sm:text-4xl font-extrabold text-amber-400">-68 %</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Économie moyenne</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Par rapport aux prix neufs de négoces</p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-5">
            <p className="text-2xl sm:text-4xl font-extrabold text-blue-400">54</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Espaces publics rénovés</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Squares, bancs, parcs & jardins partagés</p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-5">
            <p className="text-2xl sm:text-4xl font-extrabold text-teal-400">84 t CO₂</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">Émissions évitées</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Circuits courts et réemploi direct</p>
          </div>
        </div>
      </div>
    </section>
  );
};
