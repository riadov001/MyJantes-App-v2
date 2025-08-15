import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img 
              src="https://myjantes.fr/wp-content/uploads/2024/01/cropped-Logo-2-1-768x543.png" 
              alt="My Jantes Logo" 
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-300 mb-4">
              Les experts de la jante aluminium à Liévin. Rénovation, personnalisation, dévoilage et décapage.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-brand-red transition-colors"
                data-testid="facebook-link"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-brand-red transition-colors"
                data-testid="instagram-link"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-brand-red mr-3 flex-shrink-0" />
                <span className="text-sm">46 rue de la Convention, 62800 Liévin</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-brand-red mr-3 flex-shrink-0" />
                <a href="tel:0321408053" className="text-sm hover:text-brand-red transition-colors">
                  03.21.40.80.53
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-brand-red mr-3 flex-shrink-0" />
                <a href="mailto:contact@myjantes.fr" className="text-sm hover:text-brand-red transition-colors">
                  contact@myjantes.fr
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Horaires
            </h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span>9h-12h / 13h30-18h</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span>9h-13h</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span>Fermé</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">&copy; 2024 My Jantes. Tous droits réservés.</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-brand-red transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-brand-red transition-colors">
                Conditions générales
              </Link>
              <Link href="/warranty" className="text-gray-300 hover:text-brand-red transition-colors">
                Garanties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
