import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Calendar, FileText, Receipt, User, Edit, X, Check, Eye, Download } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Booking, Quote, Invoice } from "@shared/schema";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  if (!user) {
    setLocation("/login");
    return null;
  }

  const { data: bookings = [], isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings", "user", user.id],
  });

  const { data: quotes = [], isLoading: quotesLoading } = useQuery<Quote[]>({
    queryKey: ["/api/quotes", "user", user.id],
  });

  const { data: invoices = [], isLoading: invoicesLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices", "user", user.id],
  });

  const profileForm = useForm({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; phone: string; address: string }) => {
      const response = await apiRequest("PUT", "/api/profile", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive",
      });
    },
  });

  const acceptQuoteMutation = useMutation({
    mutationFn: async (quoteId: string) => {
      const response = await apiRequest("POST", `/api/quotes/${quoteId}/accept`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Devis accepté",
        description: "Votre devis a été accepté et une facture a été générée.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/quotes", "user", user.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/invoices", "user", user.id] });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'acceptation du devis.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">En attente</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-500">Confirmé</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Terminé</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Annulé</Badge>;
      case "sent":
        return <Badge className="bg-blue-500">Envoyé</Badge>;
      case "accepted":
        return <Badge className="bg-green-500">Accepté</Badge>;
      case "rejected":
        return <Badge variant="destructive">Refusé</Badge>;
      case "paid":
        return <Badge className="bg-green-500">Payée</Badge>;
      case "unpaid":
        return <Badge variant="secondary">En attente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString("fr-FR");
  };

  const onUpdateProfile = (data: typeof profileForm.getValues) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-brand-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Mon Espace</h1>
              <p className="text-gray-300 mt-2">Bienvenue, {user.name}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              className="border-white text-white hover:bg-white hover:text-brand-black"
              data-testid="button-logout"
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="reservations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reservations" data-testid="tab-reservations">
              <Calendar className="h-4 w-4 mr-2" />
              Réservations
            </TabsTrigger>
            <TabsTrigger value="quotes" data-testid="tab-quotes">
              <FileText className="h-4 w-4 mr-2" />
              Devis
            </TabsTrigger>
            <TabsTrigger value="invoices" data-testid="tab-invoices">
              <Receipt className="h-4 w-4 mr-2" />
              Factures
            </TabsTrigger>
            <TabsTrigger value="profile" data-testid="tab-profile">
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reservations" className="space-y-4">
            {bookingsLoading ? (
              <div>Chargement...</div>
            ) : bookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation</h3>
                  <p className="text-gray-500">Vous n'avez pas encore de réservation.</p>
                </CardContent>
              </Card>
            ) : (
              bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-brand-black">{booking.serviceId}</h3>
                        <p className="text-brand-gray">{booking.vehicleBrand} {booking.vehicleModel} {booking.vehicleYear}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-brand-black">Date:</span>
                        <span className="text-brand-gray ml-2">{formatDate(booking.date)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-brand-black">Heure:</span>
                        <span className="text-brand-gray ml-2">{booking.timeSlot}</span>
                      </div>
                      <div>
                        <span className="font-medium text-brand-black">Jantes:</span>
                        <span className="text-brand-gray ml-2">{booking.wheelCount}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4">
            {quotesLoading ? (
              <div>Chargement...</div>
            ) : quotes.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun devis</h3>
                  <p className="text-gray-500">Vous n'avez pas encore demandé de devis.</p>
                </CardContent>
              </Card>
            ) : (
              quotes.map((quote) => (
                <Card key={quote.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-brand-black">
                          {quote.services.join(" + ")}
                        </h3>
                        <p className="text-brand-gray">{quote.vehicleBrand} {quote.vehicleModel} {quote.vehicleYear}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(quote.status)}
                        {quote.amount && (
                          <p className="text-2xl font-bold text-brand-black mt-2">{quote.amount}€</p>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-brand-gray mb-4">
                      Demandé le {formatDate(quote.createdAt!)}
                    </div>
                    {quote.status === "sent" && (
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => acceptQuoteMutation.mutate(quote.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={acceptQuoteMutation.isPending}
                          data-testid={`accept-quote-${quote.id}`}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Accepter
                        </Button>
                        <Button variant="outline" data-testid={`view-quote-${quote.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            {invoicesLoading ? (
              <div>Chargement...</div>
            ) : invoices.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Receipt className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune facture</h3>
                  <p className="text-gray-500">Vous n'avez pas encore de facture.</p>
                </CardContent>
              </Card>
            ) : (
              invoices.map((invoice) => (
                <Card key={invoice.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-brand-black">
                          Facture #{invoice.invoiceNumber}
                        </h3>
                        <p className="text-brand-gray">Services de rénovation de jantes</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(invoice.status)}
                        <p className="text-2xl font-bold text-brand-black mt-2">{invoice.amount}€</p>
                      </div>
                    </div>
                    <div className="text-sm text-brand-gray mb-4">
                      Émise le {formatDate(invoice.issuedAt!)}
                    </div>
                    <Button 
                      className="bg-brand-red hover:bg-red-700 text-white"
                      data-testid={`download-invoice-${invoice.id}`}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger PDF
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Mon Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-profile-name" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} data-testid="input-profile-email" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} data-testid="input-profile-phone" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="resize-none" rows={3} data-testid="textarea-profile-address" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="bg-brand-red hover:bg-red-700 text-white"
                      disabled={updateProfileMutation.isPending}
                      data-testid="button-update-profile"
                    >
                      {updateProfileMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
