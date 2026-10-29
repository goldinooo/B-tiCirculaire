import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  Building2, 
  HeartHandshake, 
  ShieldCheck,
  Sparkles,
  Truck,
  PhoneCall,
  Check
} from 'lucide-react';
import { MaterialItem, ChatMessage } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: MaterialItem | null;
  userRoleLabel: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  material,
  userRoleLabel,
}) => {
  if (!isOpen || !material) return null;

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation when material changes
  useEffect(() => {
    if (material) {
      setIsReserved(false);
      const isDon = material.isDonation;
      setMessages([
        {
          id: 'msg-init-1',
          senderId: material.owner.id,
          senderName: material.owner.name,
          isOwner: true,
          text: `Bonjour ! Je suis ${material.owner.name}, ${material.owner.role} sur le ${material.location.siteName}. Merci pour votre intérêt pour notre lot : "${material.title}".`,
          timestamp: 'Il y a 10 min',
        },
        {
          id: 'msg-init-2',
          senderId: material.owner.id,
          senderName: material.owner.name,
          isOwner: true,
          text: isDon
            ? `Ce lot est offert à 100% à titre gracieux pour soutenir les associations caritatives, comités de quartier ou rénovations publiques à ${material.location.city}. Présentez-moi votre projet !`
            : `Ce lot neuf est disponible immédiatement sur site à ${material.listingPrice} MAD (au lieu de ${material.marketPriceEstimated} MAD prix neuf). Nous avons un moyen de levage pour vous aider au chargement.`,
          timestamp: 'Il y a 9 min',
        }
      ]);
    }
  }, [material]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      senderId: 'current-user',
      senderName: `Moi (${userRoleLabel})`,
      isOwner: false,
      text: text.trim(),
      timestamp: 'À l\'instant',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate realistic owner reply
    setTimeout(() => {
      let replyText = "C'est bien noté ! Nous sommes ouverts du lundi au vendredi de 7h30 à 17h00. Vous pouvez passer directement à l'accueil du chantier.";
      
      const lower = text.toLowerCase();
      if (lower.includes('disponible') || lower.includes('dispo')) {
        replyText = "Oui, le lot est intégralement disponible et mis de côté pour vous ! Quand souhaiteriez-vous passer ?";
      } else if (lower.includes('association') || lower.includes('caritative') || lower.includes('quartier')) {
        replyText = "Formidable ! Nous privilégions justement ce type d'initiative citoyenne. Je vous prépare le bon de cession à titre gracieux.";
      } else if (lower.includes('demain') || lower.includes('créneau') || lower.includes('heure')) {
        replyText = "Demain à cette heure-là c'est parfait. Demandez Philippe ou Marc à la barrière de chantier avec votre immatriculation.";
      } else if (lower.includes('livraison') || lower.includes('camion') || lower.includes('véhicule')) {
        replyText = "Nous avons un chariot élévateur et un chef de manœuvre sur place pour charger directement votre remorque ou utilitaire.";
      }

      const replyMsg: ChatMessage = {
        id: `owner-msg-${Date.now()}`,
        senderId: material.owner.id,
        senderName: material.owner.name,
        isOwner: true,
        text: replyText,
        timestamp: 'À l\'instant',
      };

      setMessages((prev) => [...prev, replyMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleConfirmReservation = () => {
    setIsReserved(true);
    const reservationMsg: ChatMessage = {
      id: `res-${Date.now()}`,
      senderId: 'system',
      senderName: 'Système BâtiCirculaire',
      isOwner: false,
      text: `🎉 Réservation confirmée ! Bon de retrait #BC-${Math.floor(100000 + Math.random() * 900000)} émis. Le lot de "${material.title}" est bloqué à votre nom pendant 48 heures sur le chantier : ${material.location.siteName}.`,
      timestamp: 'À l\'instant',
    };
    setMessages((prev) => [...prev, reservationMsg]);
  };

  const QUICK_PROMPTS = [
    "Est-ce toujours disponible ?",
    "Puis-je passer demain matin pour le retrait ?",
    material.isDonation 
      ? "Je vous contacte au titre d'une association locale" 
      : "Le prix est-il négociable pour le lot complet ?",
    "Avez-vous un engin pour charger dans ma remorque ?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl h-[92vh] sm:h-[85vh] flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Chat Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={material.owner.avatarUrl}
                alt={material.owner.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  {material.owner.name}
                  {material.owner.verified && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  En ligne
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {material.owner.companyOrOrg || material.owner.role} • Répond en {material.owner.responseRate}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Material Summary Strip */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:px-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={material.imageUrl}
              alt={material.title}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {material.isDonation ? (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                    Don Solidaire 0 DH
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                    {material.listingPrice} MAD ({material.marketPriceEstimated} MAD neuf)
                  </span>
                )}
                <span className="text-xs font-semibold text-slate-600">
                  {material.quantity}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 truncate mt-0.5">
                {material.title}
              </p>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 text-slate-400" />
                {material.location.siteName} ({material.location.city})
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {!isReserved ? (
              <button
                onClick={handleConfirmReservation}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
              >
                <Check className="w-3.5 h-3.5" />
                Réserver ce lot
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Réservé (48h)
              </span>
            )}
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {/* Safety tip banner */}
          <div className="text-center py-2 px-3 bg-blue-50 border border-blue-200/60 rounded-xl text-xs text-blue-800 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Retrait direct sur chantier. Port des EPI (gilet/chaussures de sécurité) requis pour l'accès.</span>
          </div>

          {messages.map((msg) => {
            if (msg.senderId === 'system') {
              return (
                <div key={msg.id} className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 text-center font-medium my-2 shadow-xs">
                  {msg.text}
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isOwner ? 'items-start' : 'items-end'}`}
              >
                <span className="text-[10px] text-slate-400 mb-1 px-1">
                  {msg.senderName} • {msg.timestamp}
                </span>
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.isOwner
                      ? 'bg-white text-slate-900 border border-slate-200 rounded-tl-sm'
                      : 'bg-emerald-600 text-white rounded-tr-sm font-medium'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 py-2 px-3 rounded-2xl w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{material.owner.name} écrit une réponse...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2 sm:px-4 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-medium whitespace-nowrap transition-colors border border-slate-200/80 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Écrivez votre message au chef de chantier..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2.5 sm:px-5 sm:py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </form>

      </div>
    </div>
  );
};
