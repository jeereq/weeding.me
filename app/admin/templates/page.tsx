"use client";

import { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Pencil, Users, Upload, Download } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { templates } from '@/lib/utils';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  style: string;
  createdAt: string;
  assignedUsers: string[];
}

const categories = [
  'Mariage',
  'Anniversaire',
  'Professionnel',
  'Fête',
  'Autre'
];

export default function TemplatesPage() {
  // const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredTemplates = templates.map(function (item: any) {
    return { ...item, assignedUsers: [] }
  }).filter(template =>
    (template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())) && template.active
  );

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate upload to Supabase Storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      if (isEditing && selectedTemplate) {
        setSelectedTemplate({ ...selectedTemplate, imageUrl });
      } else {
        setNewTemplate({ ...newTemplate, imageUrl });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageDownload = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleUpdateTemplate = () => {
    if (!selectedTemplate) return;

    const updatedTemplates = templates.map(template =>
      template.id === selectedTemplate.id ? { ...selectedTemplate } : template
    );
    setEditDialogOpen(false);
    setSelectedTemplate(null);
  };

  const TemplateForm = ({
    data,
    onChange,
    onSubmit,
    submitText,
    isEditing = false
  }: any) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => onChange({ ...data, title: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Catégorie</Label>
        <Select
          value={data.category}
          onValueChange={(value) => onChange({ ...data, category: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Image</Label>
        <div className="space-y-4">
          {data.imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <img
                src={data.imageUrl}
                alt={data.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleImageDownload(data.imageUrl, `${data.title}.jpg`)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              </div>
            </div>
          )}
          <div className="flex gap-4">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => handleImageUpload(e, isEditing)}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              {data.imageUrl ? 'Changer l\'image' : 'Uploader une image'}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="style">Style</Label>
        <Input
          id="style"
          value={data.style}
          onChange={(e) => onChange({ ...data, style: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => {
          setCreateDialogOpen(false);
          setEditDialogOpen(false);
        }}>
          Annuler
        </Button>
        <Button onClick={onSubmit}>
          {submitText}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des templates</h1>
      </div>
      <Card>
        <CardContent>
          <div className="flex gap-2 mt-6  mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un template..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={template.imageUrl}
                    alt={template.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-2 right-2">
                    {template.category}
                  </Badge>
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleImageDownload(template.imageUrl, `${template.title}.jpg`)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {template.assignedUsers.length} éditeurs
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setAssignDialogOpen(true);
                        }}
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                     
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau template</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <TemplateForm
              data={selectedTemplate}
              onChange={setSelectedTemplate}
              onSubmit={handleUpdateTemplate}
              submitText="Enregistrer les modifications"
              isEditing
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gérer les accès</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Sélectionnez les éditeurs qui auront accès à ce template.
              </p>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}