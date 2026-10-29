import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Leaf, 
  Coins, 
  HeartHandshake, 
  CheckCircle2, 
  ShieldCheck, 
  Edit3, 
  PlusCircle, 
  Compass, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { UserProfile, TetouanCity, MaterialItem, PublicSpaceNeed } from '../types';
import { TETOUAN_CITIES, MOCK_USER_PROFILES } from '../data/mockData';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: 'artisan' | 'collectivite' | 'association' | 'citoyen';
  onSwitchRole: (role: 'artisan' | 'collectivite' | 'association' | 'citoyen') => void;
  materials: MaterialItem[];
  needs: PublicSpaceNeed[];
  onOpenPostSurplus: () => void;
  onOpenReportNeed: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSwitchRole,
  materials,
  needs,
  onOpenPostSurplus,
  onOpenReportNeed,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'reports'>('overview');
  const profile = MOCK_USER_PROFILES[currentRole];

  // Filter listings by current user/role
  const userMaterials = materials.filter(m => 
    (currentRole === 'artisan' && m.owner.role.includes('Artisan') || m.owner.role.includes('Chef')) ||
    (currentRole === 'collectivite' && m.owner.role.includes('Collectivité')) ||
    (currentRole === 'association' && m.isDonation) ||
    (currentRole === 'citoyen' && m.owner.role.includes('Particulier'))
  );

  const userNeeds = needs.filter(n =>
    (currentRole === 'association' && n.reporterType === 'Association') ||
    (currentRole === 'citoyen' && n.reporterType === 'Citoyen') ||
    (currentRole === 'collectivite')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Profil Utilisateur • Smart City Tétouan
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* Quick Role Switcher */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold text-slate-700">Changer de perspective (Test des profils) :</span>
              <span>Région Tétouan</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
              {[
                { id: 'artisan', label: '👷 Chef BTP (Tétouan)', desc: 'Tarik El Amrani' },
                { id: 'collectivite', label: '🏛️ Commune (Tétouan)', desc: 'Services Techniques' },
                { id: 'association', label: '🤝 Association (Martil)', desc: 'Éco-Citoyens' },
                { id: 'citoyen', label: '🏡 Citoyen (M\'diq)', desc: 'Karim Mansouri' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => onSwitchRole(r.id as any)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    currentRole === r.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <p className="truncate">{r.label}</p>
                  <p className={`text-[10px] mt-0.5 truncate ${currentRole === r.id ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {r.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Profile Header Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center text-[10px]">
                ✓
              </span>
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {profile.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {profile.roleTitle}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {profile.organization}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {profile.city} (Province de Tétouan)
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  {profile.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  {profile.email}
                </span>
              </div>
            </div>
          </div>

          {/* Bio statement */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 leading-relaxed">
            <p className="font-bold text-slate-900 mb-1">À propos & Engagement local :</p>
            {profile.bio}
          </div>

          {/* Impact Stats Grid (Prices in MAD) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Surplus Gérés</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{profile.stats.surplusPosted}</p>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">Lots de chantiers</p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Dons aux Assos</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">{profile.stats.donationsCompleted}</p>
              <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">100% gratuits</p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <p className="text-[11px] font-bold text-slate-400 uppercase">CO₂ Épargné</p>
              <p className="text-2xl font-black text-teal-600 mt-1">{profile.stats.co2SavedKg} kg</p>
              <p className="text-[10px] text-teal-700 font-semibold mt-0.5">Éco-responsable</p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Économies MAD</p>
              <p className="text-2xl font-black text-amber-600 mt-1">{profile.stats.savingsMAD} DH</p>
              <p className="text-[10px] text-amber-700 font-semibold mt-0.5">Sur le prix neuf</p>
            </div>
          </div>

          {/* Navigation Tabs inside Profile */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Surplus & Matériaux de la zone ({userMaterials.length})
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                activeTab === 'reports' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Besoins Espaces Publics ({userNeeds.length})
            </button>
          </div>

          {/* Tab 1: Materials */}
          {activeTab === 'overview' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Matériaux rattachés à votre profil / commune
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenPostSurplus();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  + Déposer un nouveau surplus
                </button>
              </div>

              {userMaterials.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Aucun surplus pour le moment.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {userMaterials.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 shadow-2xs"
                    >
                      <img
                        src={m.imageUrl}
                        alt={m.title}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100"
                      />
                      <div className="min-w-0 flex-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                            m.isDonation ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {m.isDonation ? 'Don 0 DH' : `${m.listingPrice} MAD`}
                          </span>
                          <span className="text-slate-400 text-[10px] truncate">{m.location.city}</span>
                        </div>
                        <p className="font-bold text-slate-900 truncate mt-0.5">{m.title}</p>
                        <p className="text-slate-500 text-[11px] truncate">{m.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Reports */}
          {activeTab === 'reports' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Signalements et suivis d'espaces publics
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenReportNeed();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  + Signaler un dysfonctionnement urbain
                </button>
              </div>

              <div className="space-y-2">
                {userNeeds.map((need) => (
                  <div
                    key={need.id}
                    className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between gap-3 shadow-2xs text-xs"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 truncate">{need.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                          {need.city}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5">{need.location}</p>
                    </div>

                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg shrink-0">
                      👍 {need.upvotes} votes
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Compte vérifié conforme à la charte Éco-BTP Tétouan</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
          >
            Fermer le profil
          </button>
        </div>

      </div>
    </div>
  );
};
