import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-heading font-bold text-brand-black tracking-tight">
              Conditions Générales de Vente
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2>1. Objet et champ d'application</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) s'appliquent à tous les services 
              proposés par My Jantes, spécialisée dans la rénovation de jantes en aluminium.
            </p>

            <h2>2. Services proposés</h2>
            <p>My Jantes propose les services suivants :</p>
            <ul>
              <li><strong>Rénovation :</strong> Remise en état complète de vos jantes</li>
              <li><strong>Personnalisation :</strong> Customisation selon vos préférences</li>
              <li><strong>Dévoilage :</strong> Correction des déformations</li>
              <li><strong>Décapage :</strong> Nettoyage en profondeur</li>
            </ul>

            <h2>3. Commande et devis</h2>
            <p>
              Toute prestation fait l'objet d'un devis préalable gratuit. 
              La commande est confirmée après acceptation du devis par le client.
            </p>

            <h2>4. Prix et modalités de paiement</h2>
            <ul>
              <li>Les prix sont exprimés en euros TTC</li>
              <li>Paiement par carte bancaire, chèque ou espèces</li>
              <li>Un acompte de 50% peut être demandé à la commande</li>
              <li>Le solde est dû à la livraison</li>
            </ul>

            <h2>5. Délais d'exécution</h2>
            <p>
              Les délais d'exécution sont communiqués à titre indicatif. 
              En cas de retard, le client sera informé dans les meilleurs délais.
            </p>

            <h2>6. Livraison et réception</h2>
            <p>
              La livraison s'effectue dans nos locaux au 46 rue de la Convention, 62800 Liévin. 
              Le client doit vérifier l'état des jantes à la réception.
            </p>

            <h2>7. Garantie</h2>
            <p>
              Nous garantissons nos prestations contre les défauts de réalisation 
              pendant une durée de 12 mois à compter de la livraison.
            </p>

            <h2>8. Responsabilité</h2>
            <p>
              My Jantes s'engage à apporter le plus grand soin à la réalisation des prestations. 
              Notre responsabilité est limitée au montant de la prestation.
            </p>

            <h2>9. Données personnelles</h2>
            <p>
              Les données collectées sont nécessaires au traitement de votre commande. 
              Voir notre Politique de Confidentialité pour plus d'informations.
            </p>

            <h2>10. Droit applicable et litiges</h2>
            <p>
              Les présentes CGV sont soumises au droit français. 
              En cas de litige, les tribunaux d'Arras seront seuls compétents.
            </p>

            <h2>11. Contact</h2>
            <ul>
              <li><strong>My Jantes</strong></li>
              <li>46 rue de la Convention, 62800 Liévin</li>
              <li>Téléphone : 03.21.40.80.53</li>
              <li>Email : contact@myjantes.fr</li>
              <li>SIRET : [À compléter]</li>
            </ul>

            <p className="text-sm text-gray-600 mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}