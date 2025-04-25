"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [stats, setStats] = useState<Stats>({
    totalInvitations: 0,
    totalGuests: 0,
    pendingRSVPs: 0,
  });

  useEffect(() => {
    // Simulate API call
    setStats(mockStats);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalInvitations}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invités</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalGuests}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RSVP en attente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.pendingRSVPs}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}