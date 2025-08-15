import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-brand-black">
              Politique de Confidentialité
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h2>1. Collecte des informations</h2>
            <p>
              My Jantes collecte les informations que vous nous fournissez directement lorsque vous :
            </p>
            <ul>
              <li>Créez un compte sur notre plateforme</li>
              <li>Demandez un devis ou prenez un rendez-vous</li>
              <li>Nous contactez par téléphone ou email</li>
              <li>Utilisez nos services</li>
            </ul>

            <h2>2. Utilisation des informations</h2>
            <p>Nous utilisons vos informations pour :</p>
            <ul>
              <li>Fournir nos services de rénovation de jantes</li>
              <li>Traiter vos demandes de devis et réservations</li>
              <li>Vous contacter concernant nos services</li>
              <li>Améliorer notre plateforme et nos services</li>
              <li>Respecter nos obligations légales</li>
            </ul>

            <h2>3. Partage des informations</h2>
            <p>
              Nous ne vendons, n'échangeons ou ne transférons pas vos informations personnelles 
              à des tiers sans votre consentement, sauf dans les cas suivants :
            </p>
            <ul>
              <li>Prestataires de services travaillant en notre nom</li>
              <li>Obligations légales ou réglementaires</li>
              <li>Protection de nos droits et de notre sécurité</li>
            </ul>

            <h2>4. Sécurité des données</h2>
            <p>
              Nous mettons en place des mesures techniques et organisationnelles appropriées 
              pour protéger vos données personnelles contre la perte, l'utilisation abusive, 
              l'accès non autorisé, la divulgation, l'altération ou la destruction.
            </p>

            <h2>5. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul>
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience utilisateur. 
              Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>

            <h2>7. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité, 
              contactez-nous :
            </p>
            <ul>
              <li>Email : contact@myjantes.fr</li>
              <li>Téléphone : 03.21.40.80.53</li>
              <li>Adresse : 46 rue de la Convention, 62800 Liévin</li>
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