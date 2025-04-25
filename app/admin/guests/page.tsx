"use client";

import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Mail, Filter, Users, Eye, Building2, User, UsersRound, Plus, Trash2, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

interface Member {
  name: string;
  relation?: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'attending' | 'declined';
  rsvpDate: string;
  type: 'family' | 'company' | 'group' | 'individual';
  invitationId: string;
  members?: Member[];
}

interface Invitation {
  id: string;
  title: string;
  date: string;
  location: string;
  template: string;
  message: string;
}

const mockInvitations: Record<string, Invitation> = {
  'inv1': {
    id: 'inv1',
    title: 'Mariage de Sophie et Thomas',
    date: '2025-07-15',
    location: 'Château de Versailles',
    template: 'Élégance Florale',
    message: 'Nous sommes ravis de vous convier à notre mariage...'
  },
  'inv2': {
    id: 'inv2',
    title: 'Soirée Entreprise Annuelle',
    date: '2025-12-20',
    location: 'Grand Hôtel Paris',
    template: 'Corporate Classic',
    message: 'À l\'occasion de notre soirée annuelle...'
  }
};

const mockGuests: Guest[] = [
  { 
    id: '1', 
    name: 'Famille Dubois', 
    email: 'dubois@example.com', 
    status: 'attending', 
    rsvpDate: '2025-01-15',
    type: 'family',
    invitationId: 'inv1',
    members: [
      { name: 'Pierre Dubois', relation: 'Père' },
      { name: 'Marie Dubois', relation: 'Mère' },
      { name: 'Lucas Dubois', relation: 'Fils' }
    ]
  },
  { 
    id: '2', 
    name: 'Tech Solutions SA', 
    email: 'contact@techsolutions.com', 
    status: 'pending', 
    rsvpDate: '-',
    type: 'company',
    invitationId: 'inv2',
    members: [
      { name: 'Équipe Direction' },
      { name: 'Département IT' },
      { name: 'Service Marketing' }
    ]
  },
  { 
    id: '3', 
    name: 'Club de Tennis', 
    email: 'tennis.club@example.com', 
    status: 'attending', 
    rsvpDate: '2025-01-10',
    type: 'group',
    invitationId: 'inv1',
    members: [
      { name: 'Groupe Compétition' },
      { name: 'Équipe Loisirs' }
    ]
  },
  { 
    id: '4', 
    name: 'Sophie Martin', 
    email: 'sophie@example.com', 
    status: 'attending', 
    rsvpDate: '2025-01-12',
    type: 'individual',
    invitationId: 'inv1'
  }
];

const GuestsPage: FC = () => {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newGuest, setNewGuest] = useState<{
    name: string;
    email: string;
    type: Guest['type'];
    invitationId: string;
    members: Member[];
  }>({
    name: '',
    email: '',
    type: 'individual',
    invitationId: 'inv1',
    members: [],
  });

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
    const matchesType = typeFilter === 'all' || guest.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGuests(filteredGuests.map(guest => guest.id));
    } else {
      setSelectedGuests([]);
    }
  };

  const handleSelectGuest = (guestId: string, checked: boolean) => {
    if (checked) {
      setSelectedGuests([...selectedGuests, guestId]);
    } else {
      setSelectedGuests(selectedGuests.filter(id => id !== guestId));
    }
  };

  const handleSendMessage = () => {
    console.log('Sending message to:', selectedGuests);
    console.log('Message:', messageContent);
    setMessageDialogOpen(false);
    setMessageContent('');
  };

  const handlePreviewInvitation = (guest: Guest) => {
    setSelectedGuest(guest);
    setPreviewDialogOpen(true);
  };

  const handleAddMember = () => {
    setNewGuest({
      ...newGuest,
      members: [...newGuest.members, { name: '', relation: '' }],
    });
  };

  const handleRemoveMember = (index: number) => {
    setNewGuest({
      ...newGuest,
      members: newGuest.members.filter((_, i) => i !== index),
    });
  };

  const handleMemberChange = (index: number, field: keyof Member, value: string) => {
    const updatedMembers = [...newGuest.members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setNewGuest({ ...newGuest, members: updatedMembers });
  };

  const handleCreateGuest = () => {
    const guest: Guest = {
      id: Math.random().toString(),
      ...newGuest,
      status: 'pending',
      rsvpDate: '-',
      members: newGuest.type !== 'individual' ? newGuest.members : undefined,
    };

    setGuests([guest, ...guests]);
    setCreateDialogOpen(false);
    setNewGuest({
      name: '',
      email: '',
      type: 'individual',
      invitationId: 'inv1',
      members: [],
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'attending':
        return 'text-green-600';
      case 'declined':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'family':
        return <Users className="h-4 w-4" />;
      case 'company':
        return <Building2 className="h-4 w-4" />;
      case 'group':
        return <UsersRound className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invités</h1>
        <div className="flex gap-4">
          <Button
            onClick={() => setMessageDialogOpen(true)}
            disabled={selectedGuests.length === 0}
          >
            <Mail className="h-4 w-4 mr-2" />
            Message groupé ({selectedGuests.length})
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel invité
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des invités</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un invité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="attending">Présent</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="declined">Décliné</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[200px]">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type d'invité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="family">Famille</SelectItem>
                  <SelectItem value="company">Entreprise</SelectItem>
                  <SelectItem value="group">Groupe</SelectItem>
                  <SelectItem value="individual">Individuel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date RSVP</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedGuests.includes(guest.id)}
                      onCheckedChange={(checked) => handleSelectGuest(guest.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(guest.type)}
                      <Badge variant="secondary" className="capitalize">
                        {guest.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      {guest.name}
                      {guest.members && (
                        <p className="text-sm text-muted-foreground">
                          {guest.members.length} membre{guest.members.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>
                    <span className={`capitalize ${getStatusColor(guest.status)}`}>
                      {guest.status}
                    </span>
                  </TableCell>
                  <TableCell>{guest.rsvpDate}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreviewInvitation(guest)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Prévisualiser
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const url = `${window.location.origin}/invitation/${guest.id}`;
                        navigator.clipboard.writeText(url);
                        // You might want to add a toast notification here
                        alert('Lien copié dans le presse-papier');
                      }}
                    >
                      <Link className="h-4 w-4 mr-2" />
                      Copier le lien
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envoyer un message groupé</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Envoi à {selectedGuests.length} invité{selectedGuests.length > 1 ? 's' : ''}
              </p>
              <Textarea
                placeholder="Votre message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={6}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSendMessage}>
                Envoyer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Prévisualisation de l'invitation</DialogTitle>
          </DialogHeader>
          {selectedGuest && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Détails de l'invité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Type d'invité</h4>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(selectedGuest.type)}
                          <Badge variant="secondary" className="capitalize">
                            {selectedGuest.type}
                          </Badge>
                        </div>
                      </div>
                      {selectedGuest.members && (
                        <div>
                          <h4 className="font-medium mb-2">Membres</h4>
                          <ScrollArea className="h-[200px]">
                            <div className="space-y-2">
                              {selectedGuest.members.map((member, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                  <span>{member.name}</span>
                                  {member.relation && (
                                    <Badge variant="outline">{member.relation}</Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Invitation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Événement</h4>
                        <p className="text-lg font-medium">
                          {mockInvitations[selectedGuest.invitationId].title}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                        <p>{new Date(mockInvitations[selectedGuest.invitationId].date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Lieu</h4>
                        <p>{mockInvitations[selectedGuest.invitationId].location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Template</h4>
                        <p>{mockInvitations[selectedGuest.invitationId].template}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Message</h4>
                        <p className="text-sm">
                          {mockInvitations[selectedGuest.invitationId].message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nouvel invité</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  placeholder="Nom de l'invité ou du groupe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                  placeholder="Email de contact"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type d'invité</Label>
                <Select
                  value={newGuest.type}
                  onValueChange={(value: Guest['type']) => {
                    setNewGuest({
                      ...newGuest,
                      type: value,
                      members: value === 'individual' ? [] : newGuest.members,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individuel</SelectItem>
                    <SelectItem value="family">Famille</SelectItem>
                    <SelectItem value="company">Entreprise</SelectItem>
                    <SelectItem value="group">Groupe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invitation">Invitation</Label>
                <Select
                  value={newGuest.invitationId}
                  onValueChange={(value) => setNewGuest({ ...newGuest, invitationId: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(mockInvitations).map(([id, invitation]) => (
                      <SelectItem key={id} value={id}>
                        {invitation.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {newGuest.type !== 'individual' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Membres</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddMember}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un membre
                  </Button>
                </div>
                <div className="space-y-4">
                  {newGuest.members.map((member, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <Input
                          value={member.name}
                          onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                          placeholder="Nom du membre"
                        />
                      </div>
                      {newGuest.type === 'family' && (
                        <div className="flex-1">
                          <Input
                            value={member.relation || ''}
                            onChange={(e) => handleMemberChange(index, 'relation', e.target.value)}
                            placeholder="Relation (ex: Père, Mère, Enfant)"
                          />
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveMember(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateGuest}>
                Créer l'invité
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestsPage;