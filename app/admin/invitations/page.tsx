"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin, Loader2, UserPlus, Users, Badge } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import dynamic from 'next/dynamic'
import { useData } from '@/lib/data';
import { templates } from '@/lib/utils';
import Image from 'next/image';
import InvitationFormInvitationAdmin from '@/components/ui/invitation-form-admin';

const MapModal = dynamic(
  () => import('@/components/ui/map-modal'),
  { ssr: false }
)


interface Location {
  lat: number | null;
  lng: number | null;
  address: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'declined';
}

export type InvitationType =
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
      lat: 48.8566,
      lng: 2.3522,
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
      lat: 45.7640,
      lng: 4.8357,
      address: '20 Place Bellecour, 69002 Lyon'
    },
    template: { title: 'Célébration Festive' },
    guests: [
      { id: '3', name: 'Marie Petit', email: 'marie@example.com', phone: '+33634567890', status: 'declined' }
    ]
  }
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
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { user } = useData()
  const [formData, setFormData] = useState<any>({
    dateDay: new Date().getDate(),
    dateMonth: new Date().getMonth() + 1,
    dateYear: new Date().getFullYear(),
    date: new Date().toString(),
    dateTime: "18:00",
    template: "",
    dateLocation: "Avenue de la paix, Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS)",
    dateLocationLat: -4.3276,
    dateLocationLng: 15.3136,
    dateLocationAddress: "Avenue de la paix, Kinshasa, en face de l'Institut National de Sécurité Sociale (INSS)",
    title: "Jeereq & Medine",
    men: "Jeereq",
    women: "Medine",
    typeInvitation: "couple",
    nameInvitation: "Percy et Merveille",
    heart: false,
    initiateurDeLaDemande: "",
    phone: "",
    invitations: 50,
    city: "",
    country: ""
  });
  const [guestFormData, setGuestFormData] = useState<GuestFormData>({
    name: '',
    email: '',
    phone: '',
  });

  const handleMapLocationSelect = (location: { lat: number; lng: number }) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        lat: location.lat,
        lng: location.lng,
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
      location: { lat: null, lng: null, address: '' },
    });
  };

  const handleRemoveGuest = (invitationId: string, guestId: string) => {
    const updatedInvitations = invitations.map(inv =>
      inv.id === invitationId
        ? { ...inv, guests: inv.guests.filter(g => g.id !== guestId) }
        : inv
    );
    setInvitations(updatedInvitations);
  };


  const openGuestsModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsGuestsOpen(true);
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invitations</h1>
        <Button onClick={function () {
          setIsCreateOpen(true)
        }}>
          <Plus className="h-4 w-4 lg:mr-2" />
          <span className="lg:block hidden">
            Nouvelle invitation
          </span>
        </Button>
      </div>
      <InvitationFormInvitationAdmin
        formData={formData}
        setFormData={setFormData}
        closeModalForm={function () {
          setIsCreateOpen(false)
        }}
        openModal={isCreateOpen}
        onSubmit={handleCreate}
      />

      <div className="grid gap-2 grid-cols-3">
        {user.templates.map((invitation: any) => (
          <Card key={invitation.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={templates.find(t => t.id == invitation.template)?.imageUrl}
                alt={invitation.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-2 right-2">
                {templates.find(t => t.id == invitation.template)?.title}
              </Badge>
              <div className="absolute bottom-2 right-2 flex gap-2">
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{invitation.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {invitation.address}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {invitation.invitations} Invitations
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openGuestsModal(invitation)}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

        ))}
      </div>

      <Dialog open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Les invités - {selectedInvitation?.title}</DialogTitle>
          </DialogHeader>
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
                {user?.guests?.map((guest: any) => (
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
    </div>
  );
}