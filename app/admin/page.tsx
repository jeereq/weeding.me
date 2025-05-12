"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFetchData } from '@/hooks/useFetchData';
import { useData } from '@/lib/data';

interface Stats {
  totalInvitations: number;
  totalGuests: number;
  pendingRSVPs: number;
}

// Mock data
const mockStats: Stats = {
  totalInvitations: 2,
  totalGuests: 3,
  pendingRSVPs: 1,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({
    totalInvitations: 0,
    invitationsUnPayed: 0,
    invitationsPayed: 0,
  });
  const { user } = useData()
  const { fetch, loading } = useFetchData({ uri: "auth/invitations/statEditor" })
  const { fetch: fetchStat, loading: loadinStat } = useFetchData({ uri: "auth/invitations/statAdmin" })

  useEffect(() => {
    if (user.role.id == 3) {
      fetchStat({}, "POST").then(function ({ data: { data } }) {
        setStats(data);
      })
    } else {
      fetch({ id: user?.id }, "POST").then(function ({ data: { data } }) {
        setStats(data);
      })
    }
  }, [user]);


  if (loading || loadinStat) return <div className="w-full">
    <h1 className="font-bold text-center">
      ...Chargement
    </h1>
  </div>
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Invitation(s)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalInvitations}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invitations Non Payé(s)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.invitationsUnPayed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Invitations Payé(s)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.invitationsPayed}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}