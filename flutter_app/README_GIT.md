# MY JANTES - Application Flutter

Application mobile native pour MY JANTES, expert en rénovation de jantes aluminium à Liévin.

## 🚀 Fonctionnalités

- **Multi-plateforme** : iOS, Android, Web
- **Réservation en ligne** : Système complet de prise de RDV
- **Demandes de devis** : Avec upload de photos
- **Dashboard admin** : Gestion réservations et devis
- **Pages légales** : Conformité RGPD complète
- **PWA** : Installation sur mobile et desktop

## 📱 Plateformes supportées

- **iOS** : iPhone et iPad (iOS 12.0+)
- **Android** : Smartphones et tablettes (Android 5.0+)
- **Web** : PWA compatible tous navigateurs

## 🎨 Design

- **Thème authentique** : Couleurs MY JANTES (#DC2626)
- **Typography** : Roboto et Roboto Condensed
- **Interface moderne** : Material Design adapté
- **Responsive** : Optimisé mobile-first

## 🏗️ Architecture technique

- **Flutter 3.16+** avec Dart 3.0+
- **Provider** pour la gestion d'état
- **GoRouter** pour la navigation
- **HTTP** pour les API calls
- **Flutter Secure Storage** pour la sécurité
- **Cached Network Image** pour la performance

## 🔧 Installation et développement

### Prérequis
```bash
flutter --version  # 3.16.0+
dart --version     # 3.0.0+
```

### Setup
```bash
git clone [repository-url]
cd flutter_app
flutter pub get
flutter run
```

### Builds de production
```bash
# Android APK
flutter build apk --release

# Android Bundle (Google Play)
flutter build appbundle --release

# iOS IPA
flutter build ipa --release

# Web PWA
flutter build web --release
```

## 🚀 Déploiement

### CI/CD avec Codemagic
- Configuration complète dans `codemagic.yaml`
- Builds automatisés iOS/Android/Web
- Distribution TestFlight et Google Play prête

### Hébergement Web
- Optimisé pour Hostinger
- Configuration .htaccess incluse
- PWA installable

## 📊 Structure du projet

```
lib/
├── main.dart              # Point d'entrée
├── models/                # Modèles de données
├── screens/               # Écrans de l'application
├── services/              # API et authentification
└── utils/                 # Thèmes et utilitaires

ios/                       # Configuration iOS native
android/                   # Configuration Android native
web/                       # Version web PWA
```

## 🔐 Sécurité et conformité

- **RGPD** : Pages légales complètes
- **Données chiffrées** : Stockage local sécurisé
- **HTTPS** : Communication sécurisée
- **Authentification** : JWT pour admin

## 📞 Contact

**MY JANTES**
- 📍 46 rue de la Convention, 62800 Liévin
- ☎️ 03.21.40.80.53
- ✉️ contact@myjantes.fr
- 🕒 Lun-Ven 9h-12h/13h30-18h, Sam 9h-13h

## 📄 Licence

© 2025 MY JANTES. Tous droits réservés.