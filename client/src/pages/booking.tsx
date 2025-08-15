import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck } from "lucide-react";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const bookingFormSchema = insertBookingSchema.omit({ userId: true }).extend({
  date: insertBookingSchema.shape.date.transform((val) => new Date(val)),
});

type BookingFormData = typeof bookingFormSchema._type;

export default function Booking() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceId: "",
      timeSlot: "",
      wheelCount: 1,
      vehicleBrand: "",
      vehicleModel: "",
      vehicleYear: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerPostalCode: "",
      comments: "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Réservation confirmée",
        description: "Votre demande de réservation a été envoyée avec succès. Nous vous contacterons sous peu.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre réservation. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error("Booking error:", error);
    },
  });

  const services = [
    { id: "renovation", name: "Rénovation" },
    { id: "personnalisation", name: "Personnalisation" },
    { id: "devoilage", name: "Dévoilage" },
    { id: "decapage", name: "Décapage" },
  ];

  const timeSlots = [
    "09:00",
    "10:00", 
    "11:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const onSubmit = (data: BookingFormData) => {
    bookingMutation.mutate(data);
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">Réservation</h1>
          <p className="text-xl text-brand-gray">Prenez rendez-vous en quelques clics</p>
        </div>
        
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-brand-black">
              <CalendarCheck className="h-6 w-6 mr-2 text-brand-red" />
              Formulaire de réservation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="serviceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service souhaité</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-service">
                              <SelectValue placeholder="Choisissez un service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date souhaitée</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            min={today}
                            {...field}
                            value={field.value ? field.value.toISOString().split('T')[0] : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                            data-testid="input-date"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="timeSlot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Créneau horaire</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-timeslot">
                              <SelectValue placeholder="Choisissez un créneau" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}h00 - {String(parseInt(slot) + 1).padStart(2, '0')}h00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="wheelCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de jantes</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger data-testid="select-wheel-count">
                              <SelectValue placeholder="Nombre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4].map((count) => (
                              <SelectItem key={count} value={count.toString()}>
                                {count} jante{count > 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <FormLabel>Informations véhicule</FormLabel>
                  <div className="grid sm:grid-cols-3 gap-4 mt-2">
                    <FormField
                      control={form.control}
                      name="vehicleBrand"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Marque" {...field} data-testid="input-vehicle-brand" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicleModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Modèle" {...field} data-testid="input-vehicle-model" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicleYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Année" {...field} data-testid="input-vehicle-year" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div>
                  <FormLabel>Coordonnées</FormLabel>
                  <div className="grid sm:grid-cols-2 gap-4 mt-2">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Nom complet" {...field} data-testid="input-customer-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="email" placeholder="Email" {...field} data-testid="input-customer-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="tel" placeholder="Téléphone" {...field} data-testid="input-customer-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerPostalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Code postal" {...field} data-testid="input-customer-postal" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commentaires</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Détails supplémentaires..." 
                          className="resize-none" 
                          rows={4}
                          {...field}
                          value={field.value || ''}
                          data-testid="textarea-comments"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-red hover:bg-red-700 text-white py-4 text-lg font-semibold"
                  disabled={bookingMutation.isPending}
                  data-testid="button-submit-booking"
                >
                  {bookingMutation.isPending ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <CalendarCheck className="h-5 w-5 mr-2" />
                      Confirmer la réservation
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
