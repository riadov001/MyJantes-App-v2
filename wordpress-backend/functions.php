<?php
/**
 * Functions.php pour MY JANTES WordPress Theme
 * API REST personnalisée pour l'application Flutter/React
 */

// Activer les fonctionnalités du thème
function myjantes_theme_support() {
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list'));
}
add_action('after_setup_theme', 'myjantes_theme_support');

// Créer les tables personnalisées lors de l'activation
function myjantes_create_tables() {
    global $wpdb;
    
    $charset_collate = $wpdb->get_charset_collate();
    
    // Table des services
    $table_services = $wpdb->prefix . 'myjantes_services';
    $sql_services = "CREATE TABLE $table_services (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        description text NOT NULL,
        price decimal(10,2) NOT NULL,
        duration int(11) NOT NULL,
        image_url varchar(500),
        is_active boolean DEFAULT true,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) $charset_collate;";
    
    // Table des réservations
    $table_bookings = $wpdb->prefix . 'myjantes_bookings';
    $sql_bookings = "CREATE TABLE $table_bookings (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        service_id mediumint(9) NOT NULL,
        booking_date date NOT NULL,
        time_slot varchar(10) NOT NULL,
        wheel_count int(11) NOT NULL,
        vehicle_brand varchar(100) NOT NULL,
        vehicle_model varchar(100) NOT NULL,
        vehicle_year varchar(4) NOT NULL,
        customer_name varchar(255) NOT NULL,
        customer_email varchar(255) NOT NULL,
        customer_phone varchar(20) NOT NULL,
        customer_postal_code varchar(10) NOT NULL,
        comments text,
        status varchar(20) DEFAULT 'pending',
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (service_id) REFERENCES $table_services(id)
    ) $charset_collate;";
    
    // Table des devis
    $table_quotes = $wpdb->prefix . 'myjantes_quotes';
    $sql_quotes = "CREATE TABLE $table_quotes (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        services text NOT NULL,
        wheel_condition text NOT NULL,
        vehicle_brand varchar(100) NOT NULL,
        vehicle_model varchar(100) NOT NULL,
        vehicle_year varchar(4) NOT NULL,
        wheel_size varchar(50) NOT NULL,
        customer_name varchar(255) NOT NULL,
        customer_email varchar(255) NOT NULL,
        customer_phone varchar(20) NOT NULL,
        customer_postal_code varchar(10) NOT NULL,
        image_urls text,
        amount decimal(10,2),
        status varchar(20) DEFAULT 'pending',
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) $charset_collate;";
    
    // Table des factures
    $table_invoices = $wpdb->prefix . 'myjantes_invoices';
    $sql_invoices = "CREATE TABLE $table_invoices (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        quote_id mediumint(9),
        invoice_number varchar(50) UNIQUE NOT NULL,
        amount decimal(10,2) NOT NULL,
        status varchar(20) DEFAULT 'unpaid',
        issued_at datetime DEFAULT CURRENT_TIMESTAMP,
        paid_at datetime,
        PRIMARY KEY (id),
        FOREIGN KEY (quote_id) REFERENCES $table_quotes(id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql_services);
    dbDelta($sql_bookings);
    dbDelta($sql_quotes);
    dbDelta($sql_invoices);
    
    // Insérer les services par défaut
    $default_services = [
        [
            'name' => 'Rénovation',
            'description' => 'Remise à neuf complète de vos jantes en aluminium',
            'price' => 80.00,
            'duration' => 120,
            'image_url' => 'https://myjantes.fr/wp-content/uploads/2024/01/repar-jantes.jpg'
        ],
        [
            'name' => 'Personnalisation',
            'description' => 'Customisation de vos jantes selon vos goûts',
            'price' => 120.00,
            'duration' => 180,
            'image_url' => 'https://myjantes.fr/wp-content/uploads/2024/01/jantes-concaver-lexus-1024x675-1.jpg'
        ],
        [
            'name' => 'Dévoilage',
            'description' => 'Correction des déformations de vos jantes',
            'price' => 60.00,
            'duration' => 90,
            'image_url' => 'https://myjantes.fr/wp-content/uploads/2024/01/devoilage-jante.jpg'
        ],
        [
            'name' => 'Décapage',
            'description' => 'Nettoyage en profondeur de vos jantes',
            'price' => 50.00,
            'duration' => 60,
            'image_url' => 'https://myjantes.fr/wp-content/uploads/2024/01/decapage-jante.jpg'
        ]
    ];
    
    foreach ($default_services as $service) {
        $wpdb->insert($table_services, $service);
    }
}
register_activation_hook(__FILE__, 'myjantes_create_tables');

// API REST personnalisée pour les services
add_action('rest_api_init', function () {
    // Endpoint pour les services
    register_rest_route('myjantes/v1', '/services', array(
        'methods' => 'GET',
        'callback' => 'myjantes_get_services',
        'permission_callback' => '__return_true'
    ));
    
    // Endpoint pour les réservations
    register_rest_route('myjantes/v1', '/bookings', array(
        'methods' => 'POST',
        'callback' => 'myjantes_create_booking',
        'permission_callback' => '__return_true'
    ));
    
    register_rest_route('myjantes/v1', '/bookings', array(
        'methods' => 'GET',
        'callback' => 'myjantes_get_bookings',
        'permission_callback' => 'myjantes_admin_permission'
    ));
    
    // Endpoint pour les devis
    register_rest_route('myjantes/v1', '/quotes', array(
        'methods' => 'POST',
        'callback' => 'myjantes_create_quote',
        'permission_callback' => '__return_true'
    ));
    
    register_rest_route('myjantes/v1', '/quotes', array(
        'methods' => 'GET',
        'callback' => 'myjantes_get_quotes',
        'permission_callback' => 'myjantes_admin_permission'
    ));
    
    // Endpoint pour l'authentification admin
    register_rest_route('myjantes/v1', '/auth', array(
        'methods' => 'POST',
        'callback' => 'myjantes_auth_admin',
        'permission_callback' => '__return_true'
    ));
});

// Fonctions de l'API
function myjantes_get_services($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'myjantes_services';
    
    $services = $wpdb->get_results("SELECT * FROM $table_name WHERE is_active = 1");
    
    return rest_ensure_response($services);
}

function myjantes_create_booking($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'myjantes_bookings';
    
    $params = $request->get_json_params();
    
    // Validation des données
    $required_fields = ['serviceId', 'date', 'timeSlot', 'wheelCount', 'vehicleBrand', 'vehicleModel', 'vehicleYear', 'customerName', 'customerEmail', 'customerPhone', 'customerPostalCode'];
    
    foreach ($required_fields as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "Le champ $field est requis", array('status' => 400));
        }
    }
    
    // Vérifier la disponibilité du créneau
    $existing = $wpdb->get_var($wpdb->prepare(
        "SELECT COUNT(*) FROM $table_name WHERE booking_date = %s AND time_slot = %s AND status != 'cancelled'",
        $params['date'],
        $params['timeSlot']
    ));
    
    if ($existing > 0) {
        return new WP_Error('slot_taken', 'Ce créneau est déjà réservé', array('status' => 409));
    }
    
    $result = $wpdb->insert(
        $table_name,
        array(
            'service_id' => $params['serviceId'],
            'booking_date' => $params['date'],
            'time_slot' => $params['timeSlot'],
            'wheel_count' => $params['wheelCount'],
            'vehicle_brand' => $params['vehicleBrand'],
            'vehicle_model' => $params['vehicleModel'],
            'vehicle_year' => $params['vehicleYear'],
            'customer_name' => $params['customerName'],
            'customer_email' => $params['customerEmail'],
            'customer_phone' => $params['customerPhone'],
            'customer_postal_code' => $params['customerPostalCode'],
            'comments' => $params['comments'] ?? '',
            'status' => 'pending'
        )
    );
    
    if ($result === false) {
        return new WP_Error('db_error', 'Erreur lors de la création de la réservation', array('status' => 500));
    }
    
    // Envoyer email de confirmation
    myjantes_send_booking_confirmation($wpdb->insert_id, $params);
    
    return rest_ensure_response(array(
        'success' => true,
        'booking_id' => $wpdb->insert_id,
        'message' => 'Réservation créée avec succès'
    ));
}

function myjantes_create_quote($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'myjantes_quotes';
    
    $params = $request->get_json_params();
    
    $result = $wpdb->insert(
        $table_name,
        array(
            'services' => json_encode($params['services']),
            'wheel_condition' => $params['wheelCondition'],
            'vehicle_brand' => $params['vehicleBrand'],
            'vehicle_model' => $params['vehicleModel'],
            'vehicle_year' => $params['vehicleYear'],
            'wheel_size' => $params['wheelSize'],
            'customer_name' => $params['customerName'],
            'customer_email' => $params['customerEmail'],
            'customer_phone' => $params['customerPhone'],
            'customer_postal_code' => $params['customerPostalCode'],
            'image_urls' => json_encode($params['imageUrls'] ?? []),
            'status' => 'pending'
        )
    );
    
    if ($result === false) {
        return new WP_Error('db_error', 'Erreur lors de la création du devis', array('status' => 500));
    }
    
    // Envoyer email de notification
    myjantes_send_quote_notification($wpdb->insert_id, $params);
    
    return rest_ensure_response(array(
        'success' => true,
        'quote_id' => $wpdb->insert_id,
        'message' => 'Demande de devis envoyée avec succès'
    ));
}

function myjantes_get_bookings($request) {
    global $wpdb;
    $table_bookings = $wpdb->prefix . 'myjantes_bookings';
    $table_services = $wpdb->prefix . 'myjantes_services';
    
    $bookings = $wpdb->get_results("
        SELECT b.*, s.name as service_name, s.price as service_price 
        FROM $table_bookings b 
        LEFT JOIN $table_services s ON b.service_id = s.id 
        ORDER BY b.booking_date DESC, b.time_slot ASC
    ");
    
    return rest_ensure_response($bookings);
}

function myjantes_get_quotes($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'myjantes_quotes';
    
    $quotes = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");
    
    // Décoder les JSON
    foreach ($quotes as &$quote) {
        $quote->services = json_decode($quote->services);
        $quote->image_urls = json_decode($quote->image_urls);
    }
    
    return rest_ensure_response($quotes);
}

// Fonctions d'email
function myjantes_send_booking_confirmation($booking_id, $booking_data) {
    $subject = 'Confirmation de réservation - MY JANTES';
    $message = "
    Bonjour {$booking_data['customerName']},
    
    Votre réservation a été confirmée :
    - Date : {$booking_data['date']}
    - Créneau : {$booking_data['timeSlot']}
    - Véhicule : {$booking_data['vehicleBrand']} {$booking_data['vehicleModel']} ({$booking_data['vehicleYear']})
    - Nombre de jantes : {$booking_data['wheelCount']}
    
    Nous vous contacterons prochainement pour confirmer votre rendez-vous.
    
    Cordialement,
    L'équipe MY JANTES
    03.21.40.80.53
    ";
    
    wp_mail($booking_data['customerEmail'], $subject, $message);
    
    // Email admin
    $admin_subject = 'Nouvelle réservation - MY JANTES';
    $admin_message = "Nouvelle réservation reçue :\n\n" . print_r($booking_data, true);
    wp_mail('contact@myjantes.fr', $admin_subject, $admin_message);
}

function myjantes_send_quote_notification($quote_id, $quote_data) {
    $subject = 'Demande de devis reçue - MY JANTES';
    $message = "
    Bonjour {$quote_data['customerName']},
    
    Nous avons bien reçu votre demande de devis.
    Notre équipe l'étudiera et vous contactera dans les plus brefs délais.
    
    Cordialement,
    L'équipe MY JANTES
    03.21.40.80.53
    ";
    
    wp_mail($quote_data['customerEmail'], $subject, $message);
    
    // Email admin
    $admin_subject = 'Nouvelle demande de devis - MY JANTES';
    $admin_message = "Nouvelle demande de devis :\n\n" . print_r($quote_data, true);
    wp_mail('contact@myjantes.fr', $admin_subject, $admin_message);
}

// Permissions admin
function myjantes_admin_permission($request) {
    return current_user_can('manage_options');
}

function myjantes_auth_admin($request) {
    $params = $request->get_json_params();
    $user = wp_authenticate($params['username'], $params['password']);
    
    if (is_wp_error($user)) {
        return new WP_Error('auth_failed', 'Authentification échouée', array('status' => 401));
    }
    
    if (!user_can($user, 'manage_options')) {
        return new WP_Error('insufficient_permissions', 'Permissions insuffisantes', array('status' => 403));
    }
    
    wp_set_current_user($user->ID);
    wp_set_auth_cookie($user->ID);
    
    return rest_ensure_response(array(
        'success' => true,
        'user' => array(
            'id' => $user->ID,
            'username' => $user->user_login,
            'email' => $user->user_email,
            'role' => 'admin'
        )
    ));
}

// Configuration SMTP
function myjantes_smtp_config() {
    return array(
        'host' => SMTP_HOST,
        'port' => SMTP_PORT,
        'username' => SMTP_USER,
        'password' => SMTP_PASS,
        'secure' => 'tls'
    );
}
add_action('phpmailer_init', 'myjantes_smtp_config');