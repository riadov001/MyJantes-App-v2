import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Calendar, FileText } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Header() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Accueil", href: "/", icon: null },
    { name: "Services", href: "/#services", icon: null },
    { name: "Réservation", href: "/booking", icon: Calendar },
    { name: "Devis", href: "/quote", icon: FileText },
    { name: "Mentions Légales", href: "/mentions", icon: null },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      // Scroll to section on home page
      if (window.location.pathname !== "/") {
        setLocation("/");
        setTimeout(() => {
          const element = document.querySelector(href.substring(1));
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(href.substring(1));
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setLocation(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" data-testid="logo-link">
            <div className="flex items-center">
              <img 
                src="https://myjantes.fr/wp-content/uploads/2024/01/cropped-Logo-2-1-768x543.png" 
                alt="My Jantes Logo" 
                className="h-10 w-auto"
              />
              <span className="ml-3 text-xl font-bold text-brand-black">MY JANTES</span>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="mobile-menu-button">
                  <Menu className="h-6 w-6 text-brand-gray" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="flex items-center px-3 py-2 text-brand-gray hover:text-brand-red transition-colors text-left"
                      data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                      {item.name}
                    </button>
                  ))}
                  {user ? (
                    <div className="space-y-2 pt-4 border-t">
                      <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start" data-testid="mobile-dashboard-link">
                          <User className="h-4 w-4 mr-2" />
                          Mon Espace
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        onClick={logout} 
                        className="w-full justify-start text-red-600 hover:text-red-700"
                        data-testid="mobile-logout-button"
                      >
                        Déconnexion
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login">
                      <Button className="w-full bg-brand-red hover:bg-red-700" data-testid="mobile-login-button">
                        <User className="h-4 w-4 mr-2" />
                        Connexion
                      </Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-brand-gray hover:text-brand-red transition-colors"
                data-testid={`nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </button>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" data-testid="dashboard-link">
                    <User className="h-4 w-4 mr-2" />
                    Mon Espace
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="text-red-600 hover:text-red-700"
                  data-testid="logout-button"
                >
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-brand-red hover:bg-red-700 text-white" data-testid="login-button">
                  <User className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
