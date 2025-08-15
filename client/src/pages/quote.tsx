import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Upload } from "lucide-react";
import { insertQuoteSchema, type InsertQuote } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ObjectUploader } from "@/components/ObjectUploader";
import type { UploadResult } from "@uppy/core";

const quoteFormSchema = insertQuoteSchema.omit({ userId: true, imageUrls: true }).extend({
  servicesList: insertQuoteSchema.shape.services,
});

type QuoteFormData = typeof quoteFormSchema._type;

export default function Quote() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      servicesList: [],
      wheelCondition: "",
      vehicleBrand: "",
      vehicleModel: "",
      vehicleYear: "",
      wheelSize: "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerPostalCode: "",
    },
  });

  const quoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData & { imageUrls: string[] }) => {
      const response = await apiRequest("POST", "/api/quotes", {
        ...data,
        services: data.servicesList,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Devis envoyé",
        description: "Votre demande de devis a été envoyée avec succès. Nous vous répondrons sous 24h.",
      });
      form.reset();
      setUploadedImages([]);
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error("Quote error:", error);
    },
  });

  const services = [
    { id: "renovation", name: "Rénovation" },
    { id: "personnalisation", name: "Personnalisation" },
    { id: "devoilage", name: "Dévoilage" },
    { id: "decapage", name: "Décapage" },
  ];

  const handleGetUploadParameters = async () => {
    const response = await apiRequest("POST", "/api/objects/upload");
    const data = await response.json();
    return {
      method: "PUT" as const,
      url: data.uploadURL,
    };
  };

  const handleUploadComplete = async (result: UploadResult<Record<string, unknown>, Record<string, unknown>>) => {
    const newImageUrls: string[] = [];
    
    if (!result.successful) return;
    
    for (const file of result.successful) {
      if (file.uploadURL) {
        try {
          // Set ACL policy for uploaded image
          const response = await apiRequest("PUT", "/api/quote-images", {
            imageURL: file.uploadURL,
          });
          const data = await response.json();
          newImageUrls.push(data.objectPath);
        } catch (error) {
          console.error("Error setting image ACL:", error);
        }
      }
    }
    
    setUploadedImages(prev => [...prev, ...newImageUrls]);
    toast({
      title: "Images téléchargées",
      description: `${newImageUrls.length} image(s) ajoutée(s) avec succès.`,
    });
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = (data: QuoteFormData) => {
    quoteMutation.mutate({
      ...data,
      imageUrls: uploadedImages,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">Demander un Devis</h1>
          <p className="text-xl text-brand-gray">Obtenez votre devis gratuit en ligne</p>
        </div>
        
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-brand-black">
              <DollarSign className="h-6 w-6 mr-2 text-brand-red" />
              Formulaire de devis gratuit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Image Upload Section */}
                <div>
                  <FormLabel className="text-lg font-medium text-brand-black mb-4 block">
                    Photos de vos jantes
                  </FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-red transition-colors">
                    <ObjectUploader
                      maxNumberOfFiles={5}
                      maxFileSize={10485760} // 10MB
                      onGetUploadParameters={handleGetUploadParameters}
                      onComplete={handleUploadComplete}
                      buttonClassName="bg-transparent hover:bg-transparent text-brand-red hover:text-red-700 border-none shadow-none"
                    >
                      <div className="flex flex-col items-center">
                        <Upload className="h-12 w-12 text-brand-gray mb-4" />
                        <p className="text-brand-gray mb-2">Glissez vos photos ici ou</p>
                        <span className="text-brand-red hover:text-red-700 font-medium">
                          Parcourir les fichiers
                        </span>
                        <p className="text-xs text-brand-gray mt-2">JPG, PNG jusqu'à 10MB chacune</p>
                      </div>
                    </ObjectUploader>
                    
                    {/* Upload Preview */}
                    {uploadedImages.length > 0 && (
                      <div className="mt-6 space-y-2">
                        {uploadedImages.map((imageUrl, index) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                            <div className="flex items-center">
                              <span className="text-brand-red mr-2">🖼️</span>
                              <span className="text-sm text-brand-black">Image {index + 1}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeImage(index)}
                              className="text-red-500 hover:text-red-700"
                              data-testid={`remove-image-${index}`}
                            >
                              ✕
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Services */}
                  <FormField
                    control={form.control}
                    name="servicesList"
                    render={() => (
                      <FormItem>
                        <FormLabel>Services souhaités</FormLabel>
                        <div className="space-y-3">
                          {services.map((service) => (
                            <FormField
                              key={service.id}
                              control={form.control}
                              name="servicesList"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={service.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(service.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, service.id])
                                            : field.onChange(
                                                field.value?.filter((value) => value !== service.id)
                                              );
                                        }}
                                        data-testid={`checkbox-${service.id}`}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {service.name}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Wheel Condition */}
                  <FormField
                    control={form.control}
                    name="wheelCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>État actuel</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez l'état de vos jantes..." 
                            className="resize-none" 
                            rows={4}
                            {...field}
                            data-testid="textarea-wheel-condition"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <FormLabel>Informations véhicule</FormLabel>
                  <div className="grid sm:grid-cols-4 gap-4 mt-2">
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
                    <FormField
                      control={form.control}
                      name="wheelSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Taille jantes" {...field} data-testid="input-wheel-size" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div>
                  <FormLabel>Vos coordonnées</FormLabel>
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
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-red hover:bg-red-700 text-white py-4 text-lg font-semibold"
                  disabled={quoteMutation.isPending}
                  data-testid="button-submit-quote"
                >
                  {quoteMutation.isPending ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      <DollarSign className="h-5 w-5 mr-2" />
                      Demander mon devis gratuit
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
