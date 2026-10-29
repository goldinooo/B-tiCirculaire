import React, { useState, useEffect } from 'react';
import { MaterialItem, PublicSpaceNeed, UserRole, ListingType } from './types';
import { INITIAL_MATERIALS, INITIAL_PUBLIC_NEEDS } from './data/mockData';
import { Navbar, ROLES } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesExplainer } from './components/FeaturesExplainer';
import { MaterialsMarketplace } from './components/MaterialsMarketplace';
import { ObservatorySection } from './components/ObservatorySection';
import { TetouanMap } from './components/TetouanMap';
import { UserProfileModal } from './components/UserProfileModal';
import { ImpactDashboard } from './components/ImpactDashboard';
import { MaterialDetailModal } from './components/MaterialDetailModal';
import { ChatModal } from './components/ChatModal';
import { PostMaterialModal } from './components/PostMaterialModal';
import { ReportNeedModal } from './components/ReportNeedModal';
import { Footer } from './components/Footer';
import { CheckCircle2, X, MapPin } from 'lucide-react';

export default function App() {
  // Main data states with local persistence
  const [materials, setMaterials] = useState<MaterialItem[]>(() => {
    try {
      const saved = localStorage.getItem('baticirculaire_materials_tetouan');
      return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
    } catch {
      return INITIAL_MATERIALS;
    }
  });

  const [needs, setNeeds] = useState<PublicSpaceNeed[]>(() => {
    try {
      const saved = localStorage.getItem('baticirculaire_needs_tetouan');
      return saved ? JSON.parse(saved) : INITIAL_PUBLIC_NEEDS;
    } catch {
      return INITIAL_PUBLIC_NEEDS;
    }
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'home' | 'marketplace' | 'observatory' | 'map' | 'impact'>('home');
  const [currentRole, setCurrentRole] = useState<UserRole['id']>('artisan');
  const [marketplaceSearch, setMarketplaceSearch] = useState('');
  const [marketplaceFilterType, setMarketplaceFilterType] = useState<ListingType>('all');

  // Modals
  const [selectedMaterialForDetail, setSelectedMaterialForDetail] = useState<MaterialItem | null>(null);
  const [selectedMaterialForChat, setSelectedMaterialForChat] = useState<MaterialItem | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isReportNeedModalOpen, setIsReportNeedModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Unread badge count
  const [unreadCount, setUnreadCount] = useState(1);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('baticirculaire_materials_tetouan', JSON.stringify(materials));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [materials]);

  useEffect(() => {
    try {
      localStorage.setItem('baticirculaire_needs_tetouan', JSON.stringify(needs));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [needs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Upvote need handler
  const handleUpvoteNeed = (needId: string) => {
    setNeeds((prev) =>
      prev.map((n) => {
        if (n.id === needId) {
          const hasUpvoted = !n.hasUpvoted;
          return {
            ...n,
            hasUpvoted,
            upvotes: hasUpvoted ? n.upvotes + 1 : n.upvotes - 1,
          };
        }
        return n;
      })
    );
    showToast('Votre vote citoyen a été comptabilisé pour la priorisation communale !');
  };

  // Add new material
  const handleAddNewMaterial = (newItem: MaterialItem) => {
    setMaterials((prev) => [newItem, ...prev]);
    showToast(`Le surplus "${newItem.title}" a été publié sur la Bourse de Tétouan !`);
    setActiveTab('marketplace');
  };

  // Add new public space need
  const handleAddNewNeed = (newNeed: PublicSpaceNeed) => {
    setNeeds((prev) => [newNeed, ...prev]);
    showToast(`Votre signalement à ${newNeed.city} a été ajouté à l'Observatoire !`);
    setActiveTab('observatory');
  };

  // Open Chat directly for an item
  const handleOpenChatWithItem = (item: MaterialItem) => {
    setSelectedMaterialForChat(item);
    setIsChatOpen(true);
    setUnreadCount(0);
  };

  const handleOpenGeneralChat = () => {
    if (!selectedMaterialForChat && materials.length > 0) {
      setSelectedMaterialForChat(materials[0]);
    }
    setIsChatOpen(true);
    setUnreadCount(0);
  };

  const activeRoleLabel = ROLES.find((r) => r.id === currentRole)?.label || 'Visiteur';
  const donationCount = materials.filter((m) => m.isDonation).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openPostModal={() => setIsPostModalOpen(true)}
        openReportNeedModal={() => setIsReportNeedModalOpen(true)}
        openChat={handleOpenGeneralChat}
        openProfileModal={() => setIsProfileModalOpen(true)}
        unreadCount={unreadCount}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        donationCount={donationCount}
      />

      {/* View routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExploreMarketplace={() => {
                setMarketplaceFilterType('all');
                setActiveTab('marketplace');
              }}
              onExploreObservatory={() => setActiveTab('observatory')}
              onOpenPostSurplus={() => setIsPostModalOpen(true)}
              onOpenDonations={() => {
                setMarketplaceFilterType('donation_charity');
                setActiveTab('marketplace');
              }}
              onSearch={(term) => {
                setMarketplaceSearch(term);
                setActiveTab('marketplace');
              }}
            />

            <FeaturesExplainer
              onGoMarketplace={() => {
                setMarketplaceFilterType('sale_discount');
                setActiveTab('marketplace');
              }}
              onGoDonations={() => {
                setMarketplaceFilterType('donation_charity');
                setActiveTab('marketplace');
              }}
              onGoObservatory={() => setActiveTab('observatory')}
            />

            {/* Interactive Map of Tetouan Region */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    Territoire de Tétouan & Littoral
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">
                    Carte interactive des surplus et besoins
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('map')}
                  className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Plein écran
                </button>
              </div>
              <TetouanMap
                materials={materials}
                needs={needs}
                onSelectMaterial={(item) => setSelectedMaterialForDetail(item)}
                onOpenChatWithMaterial={handleOpenChatWithItem}
                onSelectNeed={() => setActiveTab('observatory')}
              />
            </div>

            {/* Marketplace */}
            <MaterialsMarketplace
              materials={materials}
              onOpenDetail={(item) => setSelectedMaterialForDetail(item)}
              onOpenChatWithItem={handleOpenChatWithItem}
              onOpenPostModal={() => setIsPostModalOpen(true)}
              initialSearch=""
              initialFilterType="all"
            />

            {/* Observatory */}
            <ObservatorySection
              needs={needs}
              materials={materials}
              onUpvoteNeed={handleUpvoteNeed}
              onOpenReportNeedModal={() => setIsReportNeedModalOpen(true)}
              onOpenChatWithMaterial={handleOpenChatWithItem}
            />

            {/* Impact section */}
            <ImpactDashboard
              materials={materials}
              needs={needs}
              onGoMarketplace={() => setActiveTab('marketplace')}
              onGoObservatory={() => setActiveTab('observatory')}
            />
          </>
        )}

        {activeTab === 'marketplace' && (
          <MaterialsMarketplace
            materials={materials}
            onOpenDetail={(item) => setSelectedMaterialForDetail(item)}
            onOpenChatWithItem={handleOpenChatWithItem}
            onOpenPostModal={() => setIsPostModalOpen(true)}
            initialSearch={marketplaceSearch}
            initialFilterType={marketplaceFilterType}
          />
        )}

        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Cartographie Territoriale
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Carte des Chantiers & Espaces Publics de la Province
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Visualisez et filtrez les surplus disponibles et les signalements d'espaces publics à <strong>Tétouan, Martil, Cabo Negro, M'diq et Fnideq</strong>.
              </p>
            </div>
            <TetouanMap
              materials={materials}
              needs={needs}
              onSelectMaterial={(item) => setSelectedMaterialForDetail(item)}
              onOpenChatWithMaterial={handleOpenChatWithItem}
              onSelectNeed={() => setActiveTab('observatory')}
            />
          </div>
        )}

        {activeTab === 'observatory' && (
          <ObservatorySection
            needs={needs}
            materials={materials}
            onUpvoteNeed={handleUpvoteNeed}
            onOpenReportNeedModal={() => setIsReportNeedModalOpen(true)}
            onOpenChatWithMaterial={handleOpenChatWithItem}
          />
        )}

        {activeTab === 'impact' && (
          <ImpactDashboard
            materials={materials}
            needs={needs}
            onGoMarketplace={() => setActiveTab('marketplace')}
            onGoObservatory={() => setActiveTab('observatory')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onGoHome={() => setActiveTab('home')}
        onGoMarketplace={() => setActiveTab('marketplace')}
        onGoObservatory={() => setActiveTab('observatory')}
        onGoImpact={() => setActiveTab('impact')}
        onOpenPost={() => setIsPostModalOpen(true)}
      />

      {/* Modals */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentRole={currentRole}
        onSwitchRole={setCurrentRole}
        materials={materials}
        needs={needs}
        onOpenPostSurplus={() => setIsPostModalOpen(true)}
        onOpenReportNeed={() => setIsReportNeedModalOpen(true)}
      />

      <MaterialDetailModal
        material={selectedMaterialForDetail}
        isOpen={!!selectedMaterialForDetail}
        onClose={() => setSelectedMaterialForDetail(null)}
        onOpenChat={(item) => {
          setSelectedMaterialForDetail(null);
          handleOpenChatWithItem(item);
        }}
      />

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        material={selectedMaterialForChat}
        userRoleLabel={activeRoleLabel}
      />

      <PostMaterialModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handleAddNewMaterial}
      />

      <ReportNeedModal
        isOpen={isReportNeedModalOpen}
        onClose={() => setIsReportNeedModalOpen(false)}
        onSubmit={handleAddNewNeed}
      />
    </div>
  );
}
