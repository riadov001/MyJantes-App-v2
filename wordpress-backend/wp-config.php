<?php
/**
 * Configuration WordPress pour My Jantes
 * Configuration pour l'hébergement Hostinger
 */

// ** Réglages MySQL - Vous devez renseigner ces informations depuis votre hébergeur ** //
define('DB_NAME', 'u123456789_myjantes');
define('DB_USER', 'u123456789_user');
define('DB_PASSWORD', 'VotreMotDePasse');
define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');

// ** Clés uniques d'authentification et salage ** //
define('AUTH_KEY',         'mettez ici une clé unique');
define('SECURE_AUTH_KEY',  'mettez ici une clé unique');
define('LOGGED_IN_KEY',    'mettez ici une clé unique');
define('NONCE_KEY',        'mettez ici une clé unique');
define('AUTH_SALT',        'mettez ici une clé unique');
define('SECURE_AUTH_SALT', 'mettez ici une clé unique');
define('LOGGED_IN_SALT',   'mettez ici une clé unique');
define('NONCE_SALT',       'mettez ici une clé unique');

// ** Préfixe de table ** //
$table_prefix = 'wp_myjantes_';

// ** Réglages de localisation ** //
define('WPLANG', 'fr_FR');

// ** Mode de débogage ** //
define('WP_DEBUG', false);

// ** Configuration CORS pour API ** //
define('WP_CORS_ALLOW_ORIGIN', '*');

/* C'est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');
?>