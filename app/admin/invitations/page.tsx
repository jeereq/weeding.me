"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin, Loader2, UserPlus, Users } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapModal } from '@/components/ui/map-modal';

interface Location {
  latitude: number | null;
  longitude: number | null;
  address: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'declined';
}

type InvitationType =
  | 'mariage_civil'
  | 'mariage_religieux'
  | 'pacs'
  | 'fiancailles'
  | 'anniversaire_mariage'
  | 'autre';

interface Invitation {
  id: string;
  title: string;
  event_date: string;
  status: string;
  type: InvitationType;
  location: Location;
  template: {
    title: string;
  };
  guests: Guest[];
}

const invitationTypes = [
  { value: 'mariage_civil', label: 'Mariage Civil' },
  { value: 'mariage_religieux', label: 'Mariage Religieux' },
  { value: 'pacs', label: 'PACS' },
  { value: 'fiancailles', label: 'Fiançailles' },
  { value: 'anniversaire_mariage', label: 'Anniversaire de Mariage' },
  { value: 'autre', label: 'Autre Célébration' },
] as const;

const mockInvitations: Invitation[] = [
  {
    id: '1',
    title: 'Mariage Été 2025',
    event_date: '2025-07-15',
    status: 'active',
    type: 'mariage_civil',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      address: '1 Place Charles de Gaulle, 75008 Paris'
    },
    template: { title: 'Élégance Florale' },
    guests: [
      { id: '1', name: 'Sophie Martin', email: 'sophie@example.com', phone: '+33612345678', status: 'confirmed' },
      { id: '2', name: 'Thomas Dubois', email: 'thomas@example.com', phone: '+33623456789', status: 'pending' }
    ]
  },
  {
    id: '2',
    title: 'Anniversaire 30 ans',
    event_date: '2025-03-20',
    status: 'draft',
    type: 'autre',
    location: {
      latitude: 45.7640,
      longitude: 4.8357,
      address: '20 Place Bellecour, 69002 Lyon'
    },
    template: { title: 'Célébration Festive' },
    guests: [
      { id: '3', name: 'Marie Petit', email: 'marie@example.com', phone: '+33634567890', status: 'declined' }
    ]
  }
];

const templates = [
  { id: '1', title: 'Élégance Florale' },
  { id: '2', title: 'Célébration Festive' },
  { id: '3', title: 'Minimaliste Moderne' },
  { id: '4', title: 'Champêtre Vintage' },
];

interface InvitationFormData {
  title: string;
  event_date: string;
  template_id: string;
  type: InvitationType;
  location: Location;
}

interface GuestFormData {
  name: string;
  email: string;
  phone: string;
}

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [formData, setFormData] = useState<InvitationFormData>({
    title: '',
    event_date: '',
    template_id: '',
    type: 'autre',
    location: {
      latitude: null,
      longitude: null,
      address: '',
    },
  });
  const [guestFormData, setGuestFormData] = useState<GuestFormData>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setInvitations(mockInvitations);
  }, []);

  const handleGeolocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            location: {
              ...formData.location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    }
  };

  const handleMapLocationSelect = (location: { lat: number; lng: number }) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        latitude: location.lat,
        longitude: location.lng,
      },
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvitation: Invitation = {
      id: Math.random().toString(),
      title: formData.title,
      event_date: formData.event_date,
      status: 'draft',
      type: formData.type,
      location: formData.location,
      template: { title: templates.find(t => t.id === formData.template_id)?.title || '' },
      guests: []
    };
    setInvitations([newInvitation, ...invitations]);
    setIsCreateOpen(false);
    setFormData({
      title: '',
      event_date: '',
      template_id: '',
      type: 'autre',
      location: { latitude: null, longitude: null, address: '' },
    });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvitation) return;

    const updatedInvitations = invitations.map(inv =>
      inv.id === selectedInvitation.id
        ? {
          ...inv,
          title: formData.title,
          event_date: formData.event_date,
          type: formData.type,
          location: formData.location,
          template: { title: templates.find(t => t.id === formData.template_id)?.title || inv.template.title }
        }
        : inv
    );
    setInvitations(updatedInvitations);
    setIsEditOpen(false);
    setSelectedInvitation(null);
    setFormData({
      title: '',
      event_date: '',
      template_id: '',
      type: 'autre',
      location: { latitude: null, longitude: null, address: '' },
    });
  };

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvitation) return;

    const newGuest: Guest = {
      id: Math.random().toString(),
      name: guestFormData.name,
      email: guestFormData.email,
      phone: guestFormData.phone,
      status: 'pending'
    };

    const updatedInvitations = invitations.map(inv =>
      inv.id === selectedInvitation.id
        ? { ...inv, guests: [...inv.guests, newGuest] }
        : inv
    );

    setInvitations(updatedInvitations);
    setGuestFormData({ name: '', email: '', phone: '' });
  };

  const handleRemoveGuest = (invitationId: string, guestId: string) => {
    const updatedInvitations = invitations.map(inv =>
      inv.id === invitationId
        ? { ...inv, guests: inv.guests.filter(g => g.id !== guestId) }
        : inv
    );
    setInvitations(updatedInvitations);
  };

  const openEditModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setFormData({
      title: invitation.title,
      event_date: invitation.event_date,
      type: invitation.type,
      template_id: templates.find(t => t.title === invitation.template.title)?.id || '',
      location: invitation.location,
    });
    setIsEditOpen(true);
  };

  const openGuestsModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsGuestsOpen(true);
  };

  const InvitationForm = ({ onSubmit, title }: { onSubmit: (e: React.FormEvent) => void, title: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Type d'événement</Label>
        <RadioGroup
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value as InvitationType })}
          className="grid grid-cols-2 gap-4"
        >
          {invitationTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Titre de l'invitation</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Ex: Mariage de Sophie et Thomas"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="event_date">Date de l'événement</Label>
        <Input
          id="event_date"
          type="date"
          value={formData.event_date}
          onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Localisation</Label>
        <div className="flex gap-2 mb-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleGeolocation}
            disabled={isLocating}
          >
            {isLocating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <MapPin className="h-4 w-4 mr-2" />
            )}
            Utiliser ma position
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsMapOpen(true)}
          >
            Choisir sur la carte
          </Button>
        </div>
        <Textarea
          placeholder="Adresse complète"
          value={formData.location.address}
          onChange={(e) => setFormData({
            ...formData,
            location: { ...formData.location, address: e.target.value }
          })}
          required
        />
        {formData.location.latitude && formData.location.longitude && (
          <p className="text-sm text-muted-foreground mt-2">
            Coordonnées : {formData.location.latitude}, {formData.location.longitude}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="template">Template</Label>
        <Select
          value={formData.template_id}
          onValueChange={(value) => setFormData({ ...formData, template_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        {title}
      </Button>
    </form>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invitations</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle invitation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une nouvelle invitation</DialogTitle>
            </DialogHeader>
            <InvitationForm onSubmit={handleCreate} title="Créer l'invitation" />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {invitations.map((invitation) => (
          <Card key={invitation.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{invitation.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Type: {invitationTypes.find(t => t.value === invitation.type)?.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Template: {invitation.template.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Date: {new Date(invitation.event_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lieu: {invitation.location.address}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openGuestsModal(invitation)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {invitation.guests.length} invités
                  </Button>
                  <Dialog open={isEditOpen && selectedInvitation?.id === invitation.id} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => openEditModal(invitation)}>
                        Modifier
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Modifier l'invitation</DialogTitle>
                      </DialogHeader>
                      <InvitationForm onSubmit={handleEdit} title="Enregistrer les modifications" />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Gérer les invités - {selectedInvitation?.title}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddGuest} className="flex gap-4 items-end mb-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="guest-name">Nom de l'invité</Label>
              <Input
                id="guest-name"
                value={guestFormData.name}
                onChange={(e) => setGuestFormData({ ...guestFormData, name: e.target.value })}
                placeholder="Ex: Jean Dupont"
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="guest-email">Email</Label>
              <Input
                id="guest-email"
                type="email"
                value={guestFormData.email}
                onChange={(e) => setGuestFormData({ ...guestFormData, email: e.target.value })}
                placeholder="Ex: jean@example.com"
                required
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="guest-phone">Téléphone</Label>
              <Input
                id="guest-phone"
                type="tel"
                value={guestFormData.phone}
                onChange={(e) => setGuestFormData({ ...guestFormData, phone: e.target.value })}
                placeholder="Ex: +33612345678"
                required
              />
            </div>
            <Button type="submit">
              <UserPlus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </form>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedInvitation?.guests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell>{guest.name}</TableCell>
                    <TableCell>{guest.email}</TableCell>
                    <TableCell>{guest.phone}</TableCell>
                    <TableCell>
                      <span className={`capitalize ${guest.status === 'confirmed' ? 'text-green-600' :
                          guest.status === 'declined' ? 'text-red-600' :
                            'text-yellow-600'
                        }`}>
                        {guest.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => selectedInvitation && handleRemoveGuest(selectedInvitation.id, guest.id)}
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onLocationSelect={handleMapLocationSelect}
        initialLocation={
          formData.location.latitude && formData.location.longitude
            ? { lat: formData.location.latitude, lng: formData.location.longitude }
            : null
        }
      />
    </div>
  );
}