# Script de Migration Flutter pour MY JANTES

## Prérequis
1. **Flutter SDK** installé (version 3.16+)
2. **Android Studio** avec SDK Android
3. **Xcode** (pour iOS, macOS uniquement)
4. **VS Code** avec extensions Flutter/Dart

## Étapes de Migration

### 1. Création du projet Flutter
```bash
# Créer un nouveau projet Flutter multi-plateformes
flutter create --platforms=web,android,ios myjantes_flutter
cd myjantes_flutter

# Ajouter les dépendances nécessaires
flutter pub add http
flutter pub add shared_preferences
flutter pub add image_picker
flutter pub add cached_network_image
flutter pub add flutter_launcher_icons
flutter pub add url_launcher
flutter pub add intl
flutter pub add provider
flutter pub add go_router
flutter pub add flutter_secure_storage
flutter pub add connectivity_plus
```

### 2. Structure des dossiers
```
lib/
├── main.dart
├── models/
│   ├── user.dart
│   ├── booking.dart
│   ├── quote.dart
│   └── service.dart
├── services/
│   ├── api_service.dart
│   ├── auth_service.dart
│   └── storage_service.dart
├── screens/
│   ├── home_screen.dart
│   ├── booking_screen.dart
│   ├── quote_screen.dart
│   ├── dashboard_screen.dart
│   ├── login_screen.dart
│   └── legal/
│       ├── privacy_screen.dart
│       ├── terms_screen.dart
│       └── warranty_screen.dart
├── widgets/
│   ├── custom_app_bar.dart
│   ├── service_card.dart
│   └── loading_widget.dart
└── utils/
    ├── constants.dart
    ├── themes.dart
    └── routes.dart
```

### 3. Configuration du thème Flutter
```dart
// lib/utils/themes.dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppThemes {
  static const Color brandRed = Color(0xFFDC2626);
  static const Color brandBlack = Color(0xFF000000);
  static const Color brandGray = Color(0xFF6B7280);
  
  static ThemeData lightTheme = ThemeData(
    primarySwatch: MaterialColor(0xFFDC2626, {
      50: Color(0xFFFEF2F2),
      100: Color(0xFFFEE2E2),
      200: Color(0xFFFECACA),
      300: Color(0xFFFCA5A5),
      400: Color(0xFFF87171),
      500: Color(0xFFEF4444),
      600: brandRed,
      700: Color(0xFFB91C1C),
      800: Color(0xFF991B1B),
      900: Color(0xFF7F1D1D),
    }),
    textTheme: GoogleFonts.robotoTextTheme(),
    appBarTheme: AppBarTheme(
      backgroundColor: Colors.white,
      foregroundColor: brandBlack,
      elevation: 2,
      titleTextStyle: GoogleFonts.robotoCondensed(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: brandBlack,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: brandRed,
        foregroundColor: Colors.white,
        textStyle: GoogleFonts.roboto(fontWeight: FontWeight.w600),
      ),
    ),
  );
}
```

### 4. Configuration des icônes et splash screen
```yaml
# pubspec.yaml
flutter_launcher_icons:
  android: "launcher_icon"
  ios: true
  image_path: "assets/logo.png"
  min_sdk_android: 21
  web:
    generate: true
    image_path: "assets/logo.png"
```

### 5. Configuration du router
```dart
// lib/utils/routes.dart
import 'package:go_router/go_router.dart';
import '../screens/home_screen.dart';
import '../screens/booking_screen.dart';
import '../screens/quote_screen.dart';
import '../screens/dashboard_screen.dart';
import '../screens/login_screen.dart';
import '../screens/legal/privacy_screen.dart';
import '../screens/legal/terms_screen.dart';
import '../screens/legal/warranty_screen.dart';

final GoRouter router = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => HomeScreen()),
    GoRoute(path: '/booking', builder: (context, state) => BookingScreen()),
    GoRoute(path: '/quote', builder: (context, state) => QuoteScreen()),
    GoRoute(path: '/dashboard', builder: (context, state) => DashboardScreen()),
    GoRoute(path: '/login', builder: (context, state) => LoginScreen()),
    GoRoute(path: '/privacy', builder: (context, state) => PrivacyScreen()),
    GoRoute(path: '/terms', builder: (context, state) => TermsScreen()),
    GoRoute(path: '/warranty', builder: (context, state) => WarrantyScreen()),
  ],
);
```

### 6. Service API Flutter
```dart
// lib/services/api_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = 'https://votre-domaine.com/api';
  
  static Future<Map<String, dynamic>> post(String endpoint, Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl$endpoint'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(data),
    );
    
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erreur API: ${response.statusCode}');
    }
  }
  
  static Future<List<dynamic>> get(String endpoint) async {
    final response = await http.get(Uri.parse('$baseUrl$endpoint'));
    
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erreur API: ${response.statusCode}');
    }
  }
}
```

### 7. Modèles de données Flutter
```dart
// lib/models/booking.dart
class Booking {
  final String id;
  final String serviceId;
  final DateTime date;
  final String timeSlot;
  final int wheelCount;
  final String vehicleBrand;
  final String vehicleModel;
  final String vehicleYear;
  final String customerName;
  final String customerEmail;
  final String customerPhone;
  final String customerPostalCode;
  final String? comments;
  final String status;

  Booking({
    required this.id,
    required this.serviceId,
    required this.date,
    required this.timeSlot,
    required this.wheelCount,
    required this.vehicleBrand,
    required this.vehicleModel,
    required this.vehicleYear,
    required this.customerName,
    required this.customerEmail,
    required this.customerPhone,
    required this.customerPostalCode,
    this.comments,
    required this.status,
  });

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'],
      serviceId: json['serviceId'],
      date: DateTime.parse(json['date']),
      timeSlot: json['timeSlot'],
      wheelCount: json['wheelCount'],
      vehicleBrand: json['vehicleBrand'],
      vehicleModel: json['vehicleModel'],
      vehicleYear: json['vehicleYear'],
      customerName: json['customerName'],
      customerEmail: json['customerEmail'],
      customerPhone: json['customerPhone'],
      customerPostalCode: json['customerPostalCode'],
      comments: json['comments'],
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'serviceId': serviceId,
      'date': date.toIso8601String(),
      'timeSlot': timeSlot,
      'wheelCount': wheelCount,
      'vehicleBrand': vehicleBrand,
      'vehicleModel': vehicleModel,
      'vehicleYear': vehicleYear,
      'customerName': customerName,
      'customerEmail': customerEmail,
      'customerPhone': customerPhone,
      'customerPostalCode': customerPostalCode,
      'comments': comments,
    };
  }
}
```

### 8. Widget d'accueil Flutter
```dart
// lib/screens/home_screen.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:url_launcher/url_launcher.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Image.network(
          'https://myjantes.fr/wp-content/uploads/2024/01/cropped-Logo-2-1-768x543.png',
          height: 40,
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.phone),
            onPressed: () => _launchPhone('0321408053'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildHeroSection(context),
            _buildServicesSection(context),
            _buildContactSection(),
          ],
        ),
      ),
    );
  }

  Widget _buildHeroSection(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.6,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Colors.black87, Colors.black54],
        ),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'LES EXPERTS DE LA',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            Text(
              'JANTE ALU',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                color: Color(0xFFDC2626),
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => context.go('/booking'),
              child: Text('RÉSERVER'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildServicesSection(BuildContext context) {
    final services = [
      {
        'title': 'Rénovation',
        'description': 'Remise à neuf complète de vos jantes',
        'image': 'https://myjantes.fr/wp-content/uploads/2024/01/repar-jantes.jpg',
      },
      {
        'title': 'Personnalisation',
        'description': 'Customisation selon vos goûts',
        'image': 'https://myjantes.fr/wp-content/uploads/2024/01/jantes-concaver-lexus-1024x675-1.jpg',
      },
    ];

    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Column(
        children: [
          Text(
            'Nos Services',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 20),
          ...services.map((service) => _buildServiceCard(context, service)),
        ],
      ),
    );
  }

  Widget _buildServiceCard(BuildContext context, Map<String, String> service) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8),
      child: Column(
        children: [
          Image.network(
            service['image']!,
            height: 200,
            width: double.infinity,
            fit: BoxFit.cover,
          ),
          Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  service['title']!,
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 8),
                Text(service['description']!),
                SizedBox(height: 16),
                Row(
                  children: [
                    ElevatedButton(
                      onPressed: () => context.go('/booking'),
                      child: Text('Réserver'),
                    ),
                    SizedBox(width: 10),
                    OutlinedButton(
                      onPressed: () => context.go('/quote'),
                      child: Text('Devis'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContactSection() {
    return Container(
      padding: EdgeInsets.all(16),
      color: Colors.grey[100],
      child: Column(
        children: [
          Text(
            'Contact',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 10),
          Text('📞 03.21.40.80.53'),
          Text('📍 46 rue de la Convention, 62800 Liévin'),
          Text('⏰ Lun-Ven: 9h-12h/13h30-18h, Sam: 9h-13h'),
        ],
      ),
    );
  }

  void _launchPhone(String phoneNumber) async {
    final uri = Uri.parse('tel:$phoneNumber');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }
}
```

### 9. Configuration pour le web
```yaml
# web/index.html (remplacer le titre)
<title>MY JANTES - Expert en rénovation de jantes aluminium</title>
<meta name="description" content="MY JANTES, spécialiste de la rénovation de jantes en aluminium à Liévin. Rénovation, personnalisation, dévoilage et décapage professionnel.">
```

### 10. Build et déploiement
```bash
# Build pour Android
flutter build apk --release

# Build pour iOS
flutter build ios --release

# Build pour web
flutter build web --release

# Test en local
flutter run -d chrome  # Web
flutter run -d android # Android
flutter run -d ios     # iOS
```

### 11. Configuration WordPress Backend (inchangé)
Le backend WordPress existant peut être conservé tel quel, Flutter communiquera via les mêmes endpoints API REST.

### 12. Où exécuter cette migration

#### Option 1: Replit (Recommandé pour débuter)
- Créer un nouveau Repl Flutter sur [replit.com](https://replit.com)
- Copier le code React existant comme référence
- Suivre ce script étape par étape

#### Option 2: Local avec Android Studio
- Installer Flutter SDK sur votre machine
- Utiliser Android Studio avec le plugin Flutter
- Suivre la documentation officielle Flutter

#### Option 3: VS Code
- Installer les extensions Flutter et Dart
- Configurer l'environnement de développement Flutter
- Utiliser le terminal intégré pour les commandes

### Points importants pour la migration
1. **Adaptez les couleurs** du thème Flutter au design MY JANTES
2. **Conservez l'API backend** WordPress existante
3. **Testez sur tous les appareils** (web, Android, iOS)
4. **Optimisez les images** pour les performances mobiles
5. **Implementez la navigation offline** avec cache local

Ce script vous donne toute la structure nécessaire pour migrer votre application React vers Flutter en conservant toutes les fonctionnalités existantes.