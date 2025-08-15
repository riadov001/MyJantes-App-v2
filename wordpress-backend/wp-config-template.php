<?php
/**
 * Configuration WordPress pour MY JANTES
 * Template pour déploiement sur Hostinger
 */

// ** Réglages MySQL ** //
define('DB_NAME', 'votre_base_de_donnees');
define('DB_USER', 'votre_utilisateur_mysql');
define('DB_PASSWORD', 'votre_mot_de_passe_mysql');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// ** Clés uniques d'authentification et de salage ** //
// Générer sur https://api.wordpress.org/secret-key/1.1/salt/
define('AUTH_KEY',         'votre_clé_auth_unique');
define('SECURE_AUTH_KEY',  'votre_clé_secure_auth_unique');
define('LOGGED_IN_KEY',    'votre_clé_logged_in_unique');
define('NONCE_KEY',        'votre_clé_nonce_unique');
define('AUTH_SALT',        'votre_sel_auth_unique');
define('SECURE_AUTH_SALT', 'votre_sel_secure_auth_unique');
define('LOGGED_IN_SALT',   'votre_sel_logged_in_unique');
define('NONCE_SALT',       'votre_sel_nonce_unique');

// ** Préfixe de table ** //
$table_prefix = 'mj_';

// ** Réglages de localisation ** //
define('WPLANG', 'fr_FR');

// ** Mode de débogage ** //
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);

// ** Sécurité renforcée ** //
define('DISALLOW_FILE_EDIT', true);
define('FORCE_SSL_ADMIN', true);
define('WP_POST_REVISIONS', 3);
define('AUTOSAVE_INTERVAL', 300);

// ** API REST personnalisée ** //
define('MYJANTES_API_SECRET', 'votre_clé_api_secrète');

// ** Configuration des emails ** //
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'contact@myjantes.fr');
define('SMTP_PASS', 'votre_mot_de_passe_email');

/* C'est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
  define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');