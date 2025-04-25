"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
interface location { lat: number; lng: number }
interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  initialLocation: location;
}

function MapEvents({ onLocationSelect }: { onLocationSelect: (location: location) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function MapModal({ isOpen, onClose, onLocationSelect, initialLocation }: MapModalProps) {
  const [current, setCurrent] = useState<location>(initialLocation);
  useEffect(() => {
    // Fix Leaflet icon paths
    try {
      if (window != undefined) {
        delete (window as any).L.Icon.Default.prototype._getIconUrl;
        (window as any).L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
      }
    } catch (error) {
      console.log(error)
    }
  }, []);

  // const defaultCenter = initialLocation || { lat: -4.3322097, lng: 15.2780097 }; // Paris by default

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    onLocationSelect(location);
    setCurrent(location);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] h-fit p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Sélectionner un emplacement</DialogTitle>
        </DialogHeader>
        <div className="h-fit">
          <MapContainer
            center={[current.lat, current.lng]}
            zoom={13}
            style={{ height: 500, width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {current && (
              <Marker position={new LatLng(current.lat, current.lng)} />
            )}
            <MapEvents onLocationSelect={handleLocationSelect} />
          </MapContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}