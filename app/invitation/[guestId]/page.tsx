// Mock data - In a real app, this would come from your database
import InvitationContent from './components/InvitationContent';

export function generateStaticParams() {
  return new Array(10000).fill(function () { }).map(function (y, i) { return i; }).map((guestId: number) => ({
    guestId: `${guestId}`
  }));
}
export default function InvitationPage({ params: { guestId } }: { params: { guestId: string } }) {


  if (!guestId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Invitation non trouvée</p>
      </div>
    );
  }
  return <InvitationContent guestId={guestId} />;
}