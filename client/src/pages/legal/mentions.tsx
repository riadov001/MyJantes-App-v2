import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-heading font-bold text-brand-black tracking-tight">
              Mentions Légales
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-heading font-semibold text-brand-black mb-3">Éditeur du site</h2>
                <div className="text-gray-700">
                  <p><strong>MY JANTES</strong></p>
                  <p>Spécialiste en rénovation de jantes en aluminium</p>
                  <p>46 rue de la Convention</p>
                  <p>62800 Liévin, France</p>
                  <p>Téléphone : 03.21.40.80.53</p>
                  <p>Email : contact@myjantes.fr</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-brand-black mb-3">Horaires d'ouverture</h2>
                <div className="text-gray-700">
                  <p>Lundi - Vendredi : 9h-12h / 13h30-18h</p>
                  <p>Samedi : 9h-13h</p>
                  <p>Dimanche : Fermé</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-brand-black mb-3">Hébergeur</h2>
                <div className="text-gray-700">
                  <p>Site hébergé par Replit</p>
                  <p>767 Bryant St #203, San Francisco, CA 94107, États-Unis</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-brand-black mb-3">Propriété intellectuelle</h2>
                <p className="text-gray-700">
                  Le contenu de ce site web (textes, images, graphismes, logo, icônes, sons, logiciels) 
                  est la propriété exclusive de MY JANTES, à l'exception des marques, logos ou contenus 
                  appartenant à d'autres sociétés partenaires ou auteurs.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-brand-black mb-3">Protection des données</h2>
                <p className="text-gray-700">
                  Les informations recueillies sur ce site sont nécessaires pour le traitement de vos 
                  demandes et sont destinées à MY JANTES. Conformément à la loi "Informatique et Libertés" 
                  du 6 janvier 1978 et au RGPD, vous disposez d'un droit d'accès, de rectification et 
                  de suppression des données vous concernant.
                </p>
                <div className="mt-4 space-x-4">
                  <Link href="/privacy" className="text-brand-red hover:underline">
                    Politique de confidentialité
                  </Link>
                  <Link href="/terms" className="text-brand-red hover:underline">
                    Conditions générales de vente
                  </Link>
                  <Link href="/warranty" className="text-brand-red hover:underline">
                    Garanties
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-brand-black mb-3">Responsabilité</h2>
                <p className="text-gray-700">
                  MY JANTES ne pourra être tenue responsable des dommages directs et indirects causés 
                  au matériel de l'utilisateur, lors de l'accès au site, et résultant soit de 
                  l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de 
                  l'apparition d'un bug ou d'une incompatibilité.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-heading font-semibold text-brand-black mb-3">Contact</h2>
                <p className="text-gray-700">
                  Pour toute question concernant le site ou nos services, n'hésitez pas à nous contacter :
                </p>
                <div className="mt-4">
                  <p className="text-brand-red font-medium">
                    📞 03.21.40.80.53 | ✉️ contact@myjantes.fr
                  </p>
                </div>
              </section>

              <p className="text-sm text-gray-600 mt-8 pt-6 border-t">
                Dernière mise à jour : 15 août 2025
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}