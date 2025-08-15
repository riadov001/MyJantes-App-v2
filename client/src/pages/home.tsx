import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Cog, Calendar, UserCheck, Clock, CalendarCheck, Shield } from "lucide-react";

export default function Home() {
  const services = [
    {
      name: "Rénovation",
      description: "Remise à neuf complète de vos jantes en aluminium",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    },
    {
      name: "Personnalisation",
      description: "Customisation selon vos goûts et couleurs préférées",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    },
    {
      name: "Dévoilage",
      description: "Redressage professionnel de jantes voilées",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    },
    {
      name: "Décapage",
      description: "Décapage chimique pour une base parfaite",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    },
  ];

  const advantages = [
    {
      icon: UserCheck,
      title: "Expert dans le domaine",
      description: "Experts en rénovation de jantes en aluminium, nous garantissons des résultats exceptionnels pour sublimer votre véhicule.",
    },
    {
      icon: Clock,
      title: "Des années d'expertise",
      description: "Tous nos employés peuvent justifier d'une expérience de plus de 5 ans dans l'entretien de jantes alliage.",
    },
    {
      icon: CalendarCheck,
      title: "Disponibilité",
      description: "Nous sommes disponibles du lundi au samedi pour vous apporter la solution la plus adaptée à vos besoins.",
    },
    {
      icon: Shield,
      title: "Garanties",
      description: "Qualité exceptionnelle, garantie totale. Choisissez l'excellence pour vos jantes en aluminium.",
    },
  ];

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-black to-gray-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            LES EXPERTS DE LA<br />
            <span className="text-brand-red">JANTE ALU</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
            Rénovation de jantes chez MY JANTES : Qualité exceptionnelle, garantie totale. 
            Choisissez l'excellence pour vos jantes en aluminium !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToServices}
              className="bg-brand-red hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold"
              data-testid="button-services"
            >
              <Cog className="h-5 w-5 mr-2" />
              Nos Services
            </Button>
            <Link href="/booking">
              <Button 
                variant="outline" 
                className="border-2 border-white hover:bg-white hover:text-brand-black text-white px-8 py-6 text-lg font-semibold"
                data-testid="button-booking"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Réserver
              </Button>
            </Link>
          </div>
          
          {/* Contact info */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm">
            <div className="flex items-center">
              <span className="text-brand-red mr-2">📞</span>
              <span>03.21.40.80.53</span>
            </div>
            <div className="flex items-center">
              <span className="text-brand-red mr-2">📍</span>
              <span>46 rue de la Convention, 62800 Liévin</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">Nos Services</h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto">
              Découvrez l'assurance d'une rénovation de jantes exceptionnelle. Notre expertise inégalée, 
              associée à une garantie complète, assure des résultats durables et un éclat durable pour votre véhicule.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-gray-50 hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={`${service.name} de jantes`} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-brand-black mb-2">{service.name}</h3>
                  <p className="text-brand-gray mb-4">{service.description}</p>
                  <button 
                    className="text-brand-red hover:text-red-700 font-medium flex items-center"
                    data-testid={`service-${service.name.toLowerCase()}`}
                  >
                    En savoir plus
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Prêt à rénover vos jantes ?
          </h2>
          <p className="text-xl text-brand-gray mb-8">
            Obtenez votre devis gratuit en ligne ou prenez rendez-vous dès maintenant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold" data-testid="button-quote">
                Demander un devis gratuit
              </Button>
            </Link>
            <Link href="/booking">
              <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white px-8 py-4 text-lg font-semibold" data-testid="button-booking-cta">
                Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi nous choisir</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Chez Myjantes, nous comprenons l'importance de vos jantes en aluminium, non seulement en termes de performance, 
              mais aussi en tant qu'élément esthétique essentiel de votre véhicule.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="bg-brand-red rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                <p className="text-gray-300 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
