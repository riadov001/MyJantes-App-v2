import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Cog, Calendar, UserCheck, Clock, CalendarCheck, Shield, Phone, FileText } from "lucide-react";

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
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight tracking-tight">
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-black mb-4 tracking-tight">Nos Services</h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto">
              Découvrez l'assurance d'une rénovation de jantes exceptionnelle. Notre expertise inégalée, 
              associée à une garantie complète, assure des résultats durables et un éclat durable pour votre véhicule.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Rénovation */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://myjantes.fr/wp-content/uploads/2024/01/repar-jantes.jpg"
                  alt="Rénovation de jantes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-heading font-bold text-brand-black mb-4 tracking-tight">Rénovation</h3>
                <p className="text-brand-gray mb-6 leading-relaxed">
                  Offrez une nouvelle vie à vos jantes avec le service de rénovation exceptionnel de Myjantes. 
                  Grâce à notre expertise de pointe, nous redonnons éclat et durabilité à vos jantes en aluminium, 
                  assurant un résultat qui dépasse vos attentes. Confiez-nous vos jantes, et découvrez la différence 
                  d'un service de rénovation de qualité.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/booking">
                    <Button 
                      className="bg-brand-red hover:bg-red-700 text-white w-full sm:w-auto"
                      data-testid="renovation-booking"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Réserver
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button 
                      variant="outline" 
                      className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white w-full sm:w-auto"
                      data-testid="renovation-quote"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Devis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Personnalisation */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://myjantes.fr/wp-content/uploads/2024/01/jantes-concaver-lexus-1024x675-1.jpg"
                  alt="Personnalisation de jantes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-heading font-bold text-brand-black mb-4 tracking-tight">Personnalisation</h3>
                <p className="text-brand-gray mb-6 leading-relaxed">
                  Transformez vos jantes en des œuvres d'art uniques grâce à notre service de personnalisation exclusif 
                  chez Myjantes. Que vous cherchiez un style audacieux, élégant ou personnalisé, notre équipe experte 
                  réalise vos aspirations. Offrez à votre véhicule une touche distinctive avec notre service de 
                  personnalisation de jantes, garantissant une esthétique incomparable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/booking">
                    <Button 
                      className="bg-brand-red hover:bg-red-700 text-white w-full sm:w-auto"
                      data-testid="personnalisation-booking"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Réserver
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button 
                      variant="outline" 
                      className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white w-full sm:w-auto"
                      data-testid="personnalisation-quote"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Devis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Dévoilage */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://myjantes.fr/wp-content/uploads/2024/01/dvoilage-3.jpg"
                  alt="Dévoilage de jantes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-heading font-bold text-brand-black mb-4 tracking-tight">Dévoilage</h3>
                <p className="text-brand-gray mb-6 leading-relaxed">
                  Redonnez à vos trajets une douceur inégalée avec notre service de dévoilage de jantes chez Myjantes. 
                  Grâce à notre expertise précise, nous éliminons les imperfections et assurons un équilibre parfait 
                  pour des déplacements en toute fluidité. Confiez-nous vos jantes pour une conduite sans secousses 
                  et une expérience de conduite optimale. Optez pour la qualité et le confort avec notre service de dévoilage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/booking">
                    <Button 
                      className="bg-brand-red hover:bg-red-700 text-white w-full sm:w-auto"
                      data-testid="devoilage-booking"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Réserver
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button 
                      variant="outline" 
                      className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white w-full sm:w-auto"
                      data-testid="devoilage-quote"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Devis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Décapage */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video overflow-hidden">
                <img 
                  src="https://myjantes.fr/wp-content/uploads/2024/01/jantes-intro-1024x675.jpg"
                  alt="Décapage de jantes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-heading font-bold text-brand-black mb-4 tracking-tight">Décapage</h3>
                <p className="text-brand-gray mb-6 leading-relaxed">
                  Offrez une cure de jeunesse à vos jantes avec notre service de décapage chez Myjantes. 
                  Notre équipe spécialisée utilise des techniques de décapage avancées pour éliminer efficacement 
                  la saleté, la rouille et les revêtements anciens, révélant ainsi la beauté originelle de vos jantes. 
                  Optez pour une esthétique rafraîchie et un nouveau départ pour vos jantes en aluminium.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/booking">
                    <Button 
                      className="bg-brand-red hover:bg-red-700 text-white w-full sm:w-auto"
                      data-testid="decapage-booking"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Réserver
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button 
                      variant="outline" 
                      className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white w-full sm:w-auto"
                      data-testid="decapage-quote"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Devis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section demande particulière */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-brand-red/5 to-brand-red/10 border-brand-red/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-brand-black mb-4 tracking-tight">Une demande particulière ?</h3>
                <p className="text-brand-gray mb-6 max-w-2xl mx-auto">
                  Chez Myjantes, nous apportons une grande importance à la satisfaction client. 
                  Nous sommes à votre disposition pour toute demande ou interrogation.
                </p>
                <Button 
                  className="bg-brand-red hover:bg-red-700 text-white px-8 py-3 text-lg"
                  onClick={() => window.location.href = "tel:0321408053"}
                  data-testid="contact-phone"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Nous contacter - 03.21.40.80.53
                </Button>
              </CardContent>
            </Card>
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
