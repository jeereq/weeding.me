"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Users, Badge, RefreshCw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useData } from '@/lib/data';
import { templates } from '@/lib/utils';
import InvitationFormInvitationAdmin from '@/components/ui/invitation-form-admin';
import { useFetchData } from '@/hooks/useFetchData';

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

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isActiveOpen, setIsActiveOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const { user } = useData()
  const { fetch, loading } = useFetchData({ uri: "auth/users/invitations" })
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

  const openActiveModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsActiveOpen(true);
  };

  const openGuestsModal = (invitation: Invitation) => {
    setSelectedInvitation(invitation);
    setIsGuestsOpen(true);
  };

  useEffect(function () {
    fetch({ id: user.id }, "POST").then(function ({ data }) {
      if (data.data) {
        setInvitations(data.data)
      }
    })

  }, [])

  if (loading) return <div className="w-full">
    <h1 className="font-bold text-center">
      ...Chargement
    </h1>
  </div>
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
                {templates.find(t => t.id == invitation.template)?.style}
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
                    onClick={() => openActiveModal(invitation)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
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
            <DialogTitle>Les invités du mariage de {selectedInvitation?.title}</DialogTitle>
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
      <Dialog open={isActiveOpen} onOpenChange={setIsActiveOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Les invités du mariage de {selectedInvitation?.title}</DialogTitle>
          </DialogHeader>

        </DialogContent>
      </Dialog>
    </div>
  );
}