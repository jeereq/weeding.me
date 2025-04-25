// Mock data - In a real app, this would come from your database
const mockInvitations: Record<string, any> = {
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

const mockGuests: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Famille Dubois',
    email: 'dubois@example.com',
    status: 'pending',
    type: 'family',
    invitationId: 'inv1',
    members: [
      { name: 'Pierre Dubois', relation: 'Père' },
      { name: 'Marie Dubois', relation: 'Mère' },
      { name: 'Lucas Dubois', relation: 'Fils' }
    ]
  },
  '2': {
    id: '2',
    name: 'Tech Solutions SA',
    email: 'contact@techsolutions.com',
    status: 'pending',
    type: 'company',
    invitationId: 'inv2',
    members: [
      { name: 'Équipe Direction' },
      { name: 'Département IT' },
      { name: 'Service Marketing' }
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(mockGuests).map((guestId) => ({
    guestId: guestId,
  }));
}

import InvitationContent from './components/InvitationContent';

export default function InvitationPage({ params }: { params: { guestId: string } }) {
  const guest = mockGuests[params.guestId];
  
  if (!guest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Invitation non trouvée</p>
      </div>
    );
  }

  const invitation = mockInvitations[guest.invitationId];

  return <InvitationContent initialGuest={guest} initialInvitation={invitation} />;
}