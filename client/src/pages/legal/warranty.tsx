import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function Warranty() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Nos Garanties
          </h1>
          <p className="text-xl text-brand-gray">
            My Jantes s'engage pour la qualité et la durabilité
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-brand-black">
                <Shield className="h-6 w-6 mr-2 text-brand-red" />
                Garantie Qualité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-gray mb-4">
                Nous garantissons la qualité de nos prestations pendant 
                <span className="font-bold text-brand-black"> 12 mois</span> 
                à compter de la livraison.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Défauts de réalisation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Problèmes de finition
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Écaillage prématuré
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-brand-black">
                <Clock className="h-6 w-6 mr-2 text-brand-red" />
                Garantie Délais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-brand-gray mb-4">
                Respect des délais annoncés ou compensation.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Délais contractuels respectés
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Information en cas de retard
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Compensation si retard important
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-brand-black">
              Conditions de Garantie
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Garantie couverte</h3>
            <p>Notre garantie couvre :</p>
            <ul>
              <li>Les défauts de peinture et de finition</li>
              <li>Les problèmes d'adhérence du revêtement</li>
              <li>Les défauts de planéité après dévoilage</li>
              <li>Les imperfections liées à notre prestation</li>
            </ul>

            <h3>Exclusions de garantie</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Attention</p>
                  <p className="text-yellow-700">
                    La garantie ne couvre pas les dommages causés par :
                  </p>
                </div>
              </div>
            </div>
            <ul>
              <li>Une utilisation anormale ou négligente</li>
              <li>Des chocs ou impacts après livraison</li>
              <li>L'usure normale liée à l'utilisation</li>
              <li>Des modifications effectuées par un tiers</li>
              <li>Le non-respect des conseils d'entretien</li>
            </ul>

            <h3>Mise en œuvre de la garantie</h3>
            <p>En cas de problème couvert par la garantie :</p>
            <ol>
              <li>Contactez-nous immédiatement</li>
              <li>Présentez votre facture originale</li>
              <li>Amenez les jantes pour expertise</li>
              <li>Nous procéderons à la réparation gratuite</li>
            </ol>

            <h3>Conseils d'entretien</h3>
            <p>Pour maintenir vos jantes en parfait état :</p>
            <ul>
              <li>Nettoyage régulier avec des produits adaptés</li>
              <li>Éviter les produits abrasifs</li>
              <li>Inspection visuelle régulière</li>
              <li>Protection contre les projections chimiques</li>
            </ul>

            <h3>Contact Garantie</h3>
            <div className="bg-brand-red/10 p-4 rounded-lg">
              <p className="font-medium">Service Garantie My Jantes</p>
              <p>📞 03.21.40.80.53</p>
              <p>📧 garantie@myjantes.fr</p>
              <p>📍 46 rue de la Convention, 62800 Liévin</p>
              <p className="text-sm mt-2">
                Horaires : Lundi-Vendredi 9h-18h, Samedi 9h-13h
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}