import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MaterialItem, PublicSpaceNeed, TetouanCity } from '../types';
import { TETOUAN_CITIES } from '../data/mockData';
import { MapPin, Building2, Compass, HeartHandshake, Coins, Eye, MessageSquare, Layers, Navigation } from 'lucide-react';

interface TetouanMapProps {
  materials: MaterialItem[];
  needs: PublicSpaceNeed[];
  onSelectMaterial: (item: MaterialItem) => void;
  onOpenChatWithMaterial: (item: MaterialItem) => void;
  onSelectNeed?: (need: PublicSpaceNeed) => void;
}

const CITY_COORDINATES: Record<TetouanCity, [number, number]> = {
  'Tétouan': [35.5785, -5.3684],
  'Martil': [35.6186, -5.2747],
  'Cabo Negro': [35.6833, -5.2833],
  "M'diq": [35.6858, -5.3253],
  'Fnideq': [35.8500, -5.3500],
};

export const TetouanMap: React.FC<TetouanMapProps> = ({
  materials,
  needs,
  onSelectMaterial,
  onOpenChatWithMaterial,
  onSelectNeed,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeCity, setActiveCity] = useState<TetouanCity | 'all'>('all');
  const [activeLayer, setActiveLayer] = useState<'all' | 'materials' | 'needs'>('all');
  const [selectedPin, setSelectedPin] = useState<{
    type: 'material' | 'need';
    item: MaterialItem | PublicSpaceNeed;
  } | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on Tetouan - M'diq corridor
      const map = L.map(mapContainerRef.current, {
        center: [35.6600, -5.3200],
        zoom: 11,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // Add Material pins (Emerald pins)
    if (activeLayer === 'all' || activeLayer === 'materials') {
      materials.forEach((mat) => {
        if (activeCity !== 'all' && mat.location.city !== activeCity) return;

        const iconHtml = `
          <div style="background-color: ${mat.isDonation ? '#059669' : '#d97706'}; color: white; width: 34px; height: 34px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); border: 2.5px solid white; cursor: pointer; transition: transform 0.2s;">
            ${mat.isDonation ? '🎁' : '🏗️'}
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-leaflet-marker',
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const marker = L.marker(mat.location.coordinates, { icon: customIcon });
        marker.on('click', () => {
          setSelectedPin({ type: 'material', item: mat });
        });

        marker.bindTooltip(`
          <div style="font-family: inherit; font-size: 12px; font-weight: bold;">
            <p style="margin: 0; color: #0f172a;">${mat.title}</p>
            <p style="margin: 2px 0 0 0; color: #059669;">${mat.isDonation ? 'Don 0 DH' : `${mat.listingPrice} MAD`} • ${mat.location.city}</p>
          </div>
        `);

        markersLayerRef.current?.addLayer(marker);
      });
    }

    // Add Public Space Need pins (Blue / Red pins)
    if (activeLayer === 'all' || activeLayer === 'needs') {
      needs.forEach((need) => {
        if (activeCity !== 'all' && need.city !== activeCity) return;

        const isUrgent = need.priority === 'urgente';
        const iconHtml = `
          <div style="background-color: ${isUrgent ? '#dc2626' : '#2563eb'}; color: white; width: 34px; height: 34px; border-radius: 9999px; display: flex; align-items: center; justify-content: center; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); border: 2.5px solid white; cursor: pointer;">
            ${isUrgent ? '🚨' : '🌳'}
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-leaflet-marker',
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        });

        const marker = L.marker(need.coordinates, { icon: customIcon });
        marker.on('click', () => {
          setSelectedPin({ type: 'need', item: need });
        });

        marker.bindTooltip(`
          <div style="font-family: inherit; font-size: 12px; font-weight: bold;">
            <p style="margin: 0; color: #0f172a;">${need.title}</p>
            <p style="margin: 2px 0 0 0; color: #2563eb;">${need.city} • ${need.upvotes} soutiens</p>
          </div>
        `);

        markersLayerRef.current?.addLayer(marker);
      });
    }
  }, [materials, needs, activeCity, activeLayer]);

  // Center on selected city
  const handleSelectCity = (city: TetouanCity | 'all') => {
    setActiveCity(city);
    if (!mapInstanceRef.current) return;

    if (city === 'all') {
      mapInstanceRef.current.setView([35.6600, -5.3200], 11);
    } else {
      const coords = CITY_COORDINATES[city];
      mapInstanceRef.current.setView(coords, 14);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Map Control Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Région Tétouan - M'diq - Littoral
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Cartographie Interactive en Temps Réel
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" />
            Surplus & Espaces Publics de la Province
          </h3>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => handleSelectCity('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeCity === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Toutes ({TETOUAN_CITIES.length})
          </button>
          {TETOUAN_CITIES.map((c) => (
            <button
              key={c}
              onClick={() => handleSelectCity(c)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeCity === c
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Layer selector bar */}
      <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Affichage :</span>
          <button
            onClick={() => setActiveLayer('all')}
            className={`px-2.5 py-1 rounded-lg font-bold ${activeLayer === 'all' ? 'bg-slate-100 text-slate-900' : 'text-slate-500'}`}
          >
            Tous les points
          </button>
          <button
            onClick={() => setActiveLayer('materials')}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 ${activeLayer === 'materials' ? 'bg-amber-100 text-amber-900' : 'text-slate-500'}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Surplus BTP ({materials.length})
          </button>
          <button
            onClick={() => setActiveLayer('needs')}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 ${activeLayer === 'needs' ? 'bg-blue-100 text-blue-900' : 'text-slate-500'}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            Besoins Espaces Publics ({needs.length})
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600" /> Don 0 MAD</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Cession Chantier</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600" /> Urgence Voirie</span>
        </div>
      </div>

      {/* Map Layout: Left map, right drawer or overlay */}
      <div className="relative">
        <div ref={mapContainerRef} className="w-full h-[520px] z-10" />

        {/* Selected Item Drawer Card */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xl p-4 animate-scaleUp">
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                selectedPin.type === 'material'
                  ? (selectedPin.item as MaterialItem).isDonation ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                  : 'bg-blue-100 text-blue-900'
              }`}>
                {selectedPin.type === 'material'
                  ? (selectedPin.item as MaterialItem).isDonation ? '🎁 Don Solidaire 0 MAD' : `Prix : ${(selectedPin.item as MaterialItem).listingPrice} MAD`
                  : `🚨 Priorité ${(selectedPin.item as PublicSpaceNeed).priority}`}
              </span>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕ Fermer
              </button>
            </div>

            <div className="flex gap-3 mt-3">
              <img
                src={selectedPin.item.imageUrl}
                alt={selectedPin.item.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
              />
              <div className="min-w-0 flex-1 text-xs">
                <h4 className="font-bold text-slate-900 line-clamp-1">{selectedPin.item.title}</h4>
                <p className="text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {selectedPin.type === 'material'
                    ? `${(selectedPin.item as MaterialItem).location.siteName} (${(selectedPin.item as MaterialItem).location.city})`
                    : `${(selectedPin.item as PublicSpaceNeed).location} (${(selectedPin.item as PublicSpaceNeed).city})`}
                </p>
                <p className="text-slate-600 line-clamp-2 mt-1">
                  {selectedPin.item.description}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
              {selectedPin.type === 'material' ? (
                <>
                  <button
                    onClick={() => onSelectMaterial(selectedPin.item as MaterialItem)}
                    className="flex-1 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 text-center cursor-pointer"
                  >
                    Voir la fiche
                  </button>
                  <button
                    onClick={() => onOpenChatWithMaterial(selectedPin.item as MaterialItem)}
                    className="flex-1 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat direct
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onSelectNeed && onSelectNeed(selectedPin.item as PublicSpaceNeed)}
                  className="w-full py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center cursor-pointer"
                >
                  Consulter le signalement
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
