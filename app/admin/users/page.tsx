"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shield, UserPlus, UserCog, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useFetchData } from '@/hooks/useFetchData';
import { useData } from '@/lib/data';

interface User {
  id: string;
  email: string;
  name: string;
  role?: 'admin' | 'editor';
  lastLogin: string;
  createdAt: string;
}

// Mock data - Replace with Supabase data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    lastLogin: '2025-04-24T10:00:00Z',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'editor@example.com',
    name: 'Editor User',
    role: 'editor',
    lastLogin: '2025-04-23T15:30:00Z',
    createdAt: '2025-01-15T00:00:00Z'
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useData()
  const { fetch, loading } = useFetchData({ uri: "auth/users" })
  const { fetch: fetchUpdate, loading: loadingUpdate } = useFetchData({ uri: "auth/update" })
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [newUser, setNewUser] = useState<any>({
    id: '',
    email: '',
    username: '',
    phone: '',
    role: 'editor'
  });

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = () => {
    const user: User = {
      id: Math.random().toString(),
      lastLogin: '-',
      createdAt: new Date().toISOString(),
      ...newUser
    };
    setUsers([user, ...users]);
    setCreateDialogOpen(false);
    setNewUser({ email: '', name: '', role: 'editor' });
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.map(user =>
      user.id === selectedUser.id ? { ...selectedUser } : user
    );
    setUsers(updatedUsers);
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const getRoleBadge = (role: string = "editor") => {
    switch (role) {
      case 'admin':
        return (
          <Badge variant="default" className="bg-red-500">
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        );
      case 'editor':
        return (
          <Badge variant="default" className="bg-blue-500">
            <UserCog className="h-3 w-3 mr-1" />
            Editor
          </Badge>
        );
      default:
        return null;
    }
  };

  useEffect(function () {
    fetch({ role: user.role.id }, "POST").then(function ({ data }) {
      if (data) {
        setUsers(data.data || [])
      }
    })
  }, [])
  if (loading) return <div className="w-full text-center">
    <h1 className="font-bold text-center">
      ...Chargement
    </h1>
  </div>
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <UserPlus className="h-4 w-4 lg:mr-2" />
          <span className="w-fit lg:block hidden">
            Nouvel utilisateur
          </span>
        </Button>
      </div>

      <Card>
        <CardContent>
          <div className="flex gap-4 mt-6 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un utilisateur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role.name)}</TableCell>
                  <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedUser({ ...user, role: user?.role?.id || user?.role });
                        setEditDialogOpen(true);
                        fetchUpdate({ ...user, role: user?.role?.id || user?.role }, "POST")
                          .then(function (data) {
                            console.log(data)
                          })
                      }}
                    >
                      Modifier
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvel utilisateur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Téléphone</Label>
              <Input
                id="edit-phone"
                type="phone"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Rôle</Label>
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                name="role" id="edit-role" className='w-full py-2 bg-black bg-opacity-0 rounded-lg border'>
                <option value="4">
                  Editor
                </option>
                <option value="3">
                  Admin
                </option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateUser}>
                Créer l'utilisateur
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nom</Label>
                <Input
                  id="edit-name"
                  value={selectedUser.username}
                  onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Téléphone</Label>
                <Input
                  id="edit-phone"
                  type="phone"
                  value={selectedUser.phone}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Rôle</Label>
                <select value={selectedUser.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  name="role" id="edit-role" className='w-full py-2 bg-black bg-opacity-0 rounded-lg border'>
                  <option value="4">
                    Editor
                  </option>
                  <option value="3">
                    Admin
                  </option>
                </select>
              </div>
              {selectedUser.role === 'admin' && (
                <div className="flex items-center gap-2 p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm">
                    Attention : Les administrateurs ont un accès complet à toutes les fonctionnalités.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleUpdateUser}>
                  {loadingUpdate ? "...Chargement" : "Enregistrer les modifications"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}