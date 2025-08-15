<?php
/**
 * My Jantes WordPress Backend
 * Fonctions personnalisées pour l'API REST
 */

// Activation du support CORS pour les requêtes API
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});

// Support des champs personnalisés pour l'API
add_action('rest_api_init', 'register_custom_api_fields');

function register_custom_api_fields() {
    // Enregistrement des endpoints personnalisés
    register_rest_route('myjantes/v1', '/auth/register', array(
        'methods' => 'POST',
        'callback' => 'handle_user_registration',
        'permission_callback' => '__return_true'
    ));

    register_rest_route('myjantes/v1', '/auth/login', array(
        'methods' => 'POST',
        'callback' => 'handle_user_login',
        'permission_callback' => '__return_true'
    ));

    register_rest_route('myjantes/v1', '/bookings', array(
        'methods' => 'GET',
        'callback' => 'get_user_bookings',
        'permission_callback' => 'is_user_logged_in'
    ));

    register_rest_route('myjantes/v1', '/bookings', array(
        'methods' => 'POST',
        'callback' => 'create_booking',
        'permission_callback' => 'is_user_logged_in'
    ));

    register_rest_route('myjantes/v1', '/quotes', array(
        'methods' => 'GET',
        'callback' => 'get_user_quotes',
        'permission_callback' => 'is_user_logged_in'
    ));

    register_rest_route('myjantes/v1', '/quotes', array(
        'methods' => 'POST',
        'callback' => 'create_quote',
        'permission_callback' => 'is_user_logged_in'
    ));

    register_rest_route('myjantes/v1', '/invoices', array(
        'methods' => 'GET',
        'callback' => 'get_user_invoices',
        'permission_callback' => 'is_user_logged_in'
    ));

    register_rest_route('myjantes/v1', '/services', array(
        'methods' => 'GET',
        'callback' => 'get_services',
        'permission_callback' => '__return_true'
    ));
}

// Gestion de l'inscription
function handle_user_registration($request) {
    $params = $request->get_json_params();
    
    $username = sanitize_user($params['email']);
    $email = sanitize_email($params['email']);
    $password = $params['password'];
    $name = sanitize_text_field($params['name']);
    
    if (username_exists($username) || email_exists($email)) {
        return new WP_Error('user_exists', 'Cet utilisateur existe déjà', array('status' => 400));
    }
    
    $user_id = wp_create_user($username, $password, $email);
    
    if (is_wp_error($user_id)) {
        return $user_id;
    }
    
    wp_update_user(array(
        'ID' => $user_id,
        'display_name' => $name,
        'first_name' => $name
    ));
    
    // Générer un token JWT
    $token = wp_generate_auth_cookie($user_id, time() + (7 * 24 * 60 * 60));
    
    return array(
        'user' => array(
            'id' => $user_id,
            'name' => $name,
            'email' => $email
        ),
        'token' => $token
    );
}

// Gestion de la connexion
function handle_user_login($request) {
    $params = $request->get_json_params();
    
    $email = sanitize_email($params['email']);
    $password = $params['password'];
    
    $user = wp_authenticate($email, $password);
    
    if (is_wp_error($user)) {
        return new WP_Error('invalid_credentials', 'Identifiants invalides', array('status' => 401));
    }
    
    $token = wp_generate_auth_cookie($user->ID, time() + (7 * 24 * 60 * 60));
    
    return array(
        'user' => array(
            'id' => $user->ID,
            'name' => $user->display_name,
            'email' => $user->user_email
        ),
        'token' => $token
    );
}

// Récupérer les réservations de l'utilisateur
function get_user_bookings($request) {
    $user_id = get_current_user_id();
    
    $bookings = get_posts(array(
        'post_type' => 'booking',
        'meta_query' => array(
            array(
                'key' => 'user_id',
                'value' => $user_id
            )
        ),
        'posts_per_page' => -1
    ));
    
    $result = array();
    foreach ($bookings as $booking) {
        $meta = get_post_meta($booking->ID);
        $result[] = array(
            'id' => $booking->ID,
            'date' => $meta['booking_date'][0],
            'time_slot' => $meta['time_slot'][0],
            'service' => $meta['service'][0],
            'status' => $meta['status'][0] ?: 'pending',
            'vehicle_brand' => $meta['vehicle_brand'][0],
            'vehicle_model' => $meta['vehicle_model'][0],
            'created_at' => $booking->post_date
        );
    }
    
    return $result;
}

// Créer une réservation
function create_booking($request) {
    $user_id = get_current_user_id();
    $params = $request->get_json_params();
    
    $booking_id = wp_insert_post(array(
        'post_type' => 'booking',
        'post_title' => 'Réservation - ' . $params['customer_name'],
        'post_status' => 'publish',
        'post_author' => $user_id
    ));
    
    if ($booking_id) {
        update_post_meta($booking_id, 'user_id', $user_id);
        update_post_meta($booking_id, 'booking_date', $params['date']);
        update_post_meta($booking_id, 'time_slot', $params['time_slot']);
        update_post_meta($booking_id, 'service', $params['service_id']);
        update_post_meta($booking_id, 'vehicle_brand', $params['vehicle_brand']);
        update_post_meta($booking_id, 'vehicle_model', $params['vehicle_model']);
        update_post_meta($booking_id, 'vehicle_year', $params['vehicle_year']);
        update_post_meta($booking_id, 'wheel_count', $params['wheel_count']);
        update_post_meta($booking_id, 'customer_name', $params['customer_name']);
        update_post_meta($booking_id, 'customer_email', $params['customer_email']);
        update_post_meta($booking_id, 'customer_phone', $params['customer_phone']);
        update_post_meta($booking_id, 'customer_postal_code', $params['customer_postal_code']);
        update_post_meta($booking_id, 'comments', $params['comments']);
        update_post_meta($booking_id, 'status', 'pending');
        
        // Envoyer email de confirmation
        send_booking_confirmation_email($booking_id, $params);
        
        return array('id' => $booking_id, 'status' => 'success');
    }
    
    return new WP_Error('booking_failed', 'Erreur lors de la création de la réservation', array('status' => 500));
}

// Créer un devis
function create_quote($request) {
    $user_id = get_current_user_id();
    $params = $request->get_json_params();
    
    $quote_id = wp_insert_post(array(
        'post_type' => 'quote',
        'post_title' => 'Devis - ' . $params['customer_name'],
        'post_status' => 'publish',
        'post_author' => $user_id
    ));
    
    if ($quote_id) {
        update_post_meta($quote_id, 'user_id', $user_id);
        update_post_meta($quote_id, 'services', serialize($params['services']));
        update_post_meta($quote_id, 'wheel_condition', $params['wheel_condition']);
        update_post_meta($quote_id, 'vehicle_brand', $params['vehicle_brand']);
        update_post_meta($quote_id, 'vehicle_model', $params['vehicle_model']);
        update_post_meta($quote_id, 'vehicle_year', $params['vehicle_year']);
        update_post_meta($quote_id, 'wheel_size', $params['wheel_size']);
        update_post_meta($quote_id, 'customer_name', $params['customer_name']);
        update_post_meta($quote_id, 'customer_email', $params['customer_email']);
        update_post_meta($quote_id, 'customer_phone', $params['customer_phone']);
        update_post_meta($quote_id, 'customer_postal_code', $params['customer_postal_code']);
        update_post_meta($quote_id, 'image_urls', serialize($params['image_urls']));
        update_post_meta($quote_id, 'status', 'pending');
        
        return array('id' => $quote_id, 'status' => 'success');
    }
    
    return new WP_Error('quote_failed', 'Erreur lors de la création du devis', array('status' => 500));
}

// Récupérer les factures
function get_user_invoices($request) {
    $user_id = get_current_user_id();
    
    $invoices = get_posts(array(
        'post_type' => 'invoice',
        'meta_query' => array(
            array(
                'key' => 'user_id',
                'value' => $user_id
            )
        ),
        'posts_per_page' => -1
    ));
    
    $result = array();
    foreach ($invoices as $invoice) {
        $meta = get_post_meta($invoice->ID);
        $result[] = array(
            'id' => $invoice->ID,
            'invoice_number' => $meta['invoice_number'][0],
            'amount' => $meta['amount'][0],
            'status' => $meta['status'][0] ?: 'unpaid',
            'issued_at' => $invoice->post_date,
            'paid_at' => $meta['paid_at'][0]
        );
    }
    
    return $result;
}

// Récupérer les services
function get_services($request) {
    return array(
        array(
            'id' => 'renovation',
            'name' => 'Rénovation',
            'description' => 'Offrez une nouvelle vie à vos jantes avec le service de rénovation exceptionnel de Myjantes.',
            'base_price' => '80.00'
        ),
        array(
            'id' => 'personnalisation',
            'name' => 'Personnalisation',
            'description' => 'Transformez vos jantes en des œuvres d\'art uniques grâce à notre service de personnalisation exclusif.',
            'base_price' => '120.00'
        ),
        array(
            'id' => 'devoilage',
            'name' => 'Dévoilage',
            'description' => 'Redonnez à vos trajets une douceur inégalée avec notre service de dévoilage de jantes.',
            'base_price' => '80.00'
        ),
        array(
            'id' => 'decapage',
            'name' => 'Décapage',
            'description' => 'Offrez une cure de jeunesse à vos jantes avec notre service de décapage.',
            'base_price' => '60.00'
        )
    );
}

// Types de contenus personnalisés
add_action('init', 'register_custom_post_types');

function register_custom_post_types() {
    // Réservations
    register_post_type('booking', array(
        'labels' => array(
            'name' => 'Réservations',
            'singular_name' => 'Réservation'
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'capability_type' => 'post',
        'supports' => array('title', 'editor'),
        'show_in_rest' => true
    ));
    
    // Devis
    register_post_type('quote', array(
        'labels' => array(
            'name' => 'Devis',
            'singular_name' => 'Devis'
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'capability_type' => 'post',
        'supports' => array('title', 'editor'),
        'show_in_rest' => true
    ));
    
    // Factures
    register_post_type('invoice', array(
        'labels' => array(
            'name' => 'Factures',
            'singular_name' => 'Facture'
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'capability_type' => 'post',
        'supports' => array('title', 'editor'),
        'show_in_rest' => true
    ));
}

// Fonctions d'email
function send_booking_confirmation_email($booking_id, $booking_data) {
    $to = $booking_data['customer_email'];
    $subject = 'Confirmation de réservation - My Jantes';
    $message = "Bonjour " . $booking_data['customer_name'] . ",\n\n";
    $message .= "Votre réservation a été confirmée.\n";
    $message .= "Date: " . $booking_data['date'] . "\n";
    $message .= "Créneau: " . $booking_data['time_slot'] . "\n\n";
    $message .= "Nous vous contacterons prochainement pour confirmer les détails.\n\n";
    $message .= "Cordialement,\nL'équipe My Jantes";
    
    wp_mail($to, $subject, $message);
}

// Dashboard admin personnalisé
add_action('admin_menu', 'add_myjantes_admin_menu');

function add_myjantes_admin_menu() {
    add_menu_page(
        'My Jantes Dashboard',
        'My Jantes',
        'manage_options',
        'myjantes-dashboard',
        'myjantes_dashboard_page',
        'dashicons-admin-tools',
        30
    );
}

function myjantes_dashboard_page() {
    if (isset($_POST['approve_booking'])) {
        $booking_id = intval($_POST['booking_id']);
        update_post_meta($booking_id, 'status', 'confirmed');
        echo '<div class="notice notice-success"><p>Réservation approuvée!</p></div>';
    }
    
    if (isset($_POST['send_quote'])) {
        $quote_id = intval($_POST['quote_id']);
        $amount = sanitize_text_field($_POST['amount']);
        update_post_meta($quote_id, 'amount', $amount);
        update_post_meta($quote_id, 'status', 'sent');
        echo '<div class="notice notice-success"><p>Devis envoyé!</p></div>';
    }
    
    echo '<div class="wrap">';
    echo '<h1>Dashboard My Jantes</h1>';
    
    // Afficher les réservations en attente
    $pending_bookings = get_posts(array(
        'post_type' => 'booking',
        'meta_query' => array(
            array(
                'key' => 'status',
                'value' => 'pending'
            )
        )
    ));
    
    echo '<h2>Réservations en attente (' . count($pending_bookings) . ')</h2>';
    foreach ($pending_bookings as $booking) {
        $meta = get_post_meta($booking->ID);
        echo '<div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">';
        echo '<h3>' . $booking->post_title . '</h3>';
        echo '<p>Date: ' . $meta['booking_date'][0] . ' - ' . $meta['time_slot'][0] . '</p>';
        echo '<p>Service: ' . $meta['service'][0] . '</p>';
        echo '<p>Véhicule: ' . $meta['vehicle_brand'][0] . ' ' . $meta['vehicle_model'][0] . '</p>';
        echo '<form method="post" style="display: inline;">';
        echo '<input type="hidden" name="booking_id" value="' . $booking->ID . '">';
        echo '<button type="submit" name="approve_booking" class="button-primary">Approuver</button>';
        echo '</form>';
        echo '</div>';
    }
    
    // Afficher les devis en attente
    $pending_quotes = get_posts(array(
        'post_type' => 'quote',
        'meta_query' => array(
            array(
                'key' => 'status',
                'value' => 'pending'
            )
        )
    ));
    
    echo '<h2>Devis en attente (' . count($pending_quotes) . ')</h2>';
    foreach ($pending_quotes as $quote) {
        $meta = get_post_meta($quote->ID);
        echo '<div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">';
        echo '<h3>' . $quote->post_title . '</h3>';
        echo '<p>Services: ' . implode(', ', unserialize($meta['services'][0])) . '</p>';
        echo '<p>Véhicule: ' . $meta['vehicle_brand'][0] . ' ' . $meta['vehicle_model'][0] . '</p>';
        echo '<form method="post" style="display: inline;">';
        echo '<input type="hidden" name="quote_id" value="' . $quote->ID . '">';
        echo '<input type="number" name="amount" placeholder="Montant" step="0.01" required>';
        echo '<button type="submit" name="send_quote" class="button-primary">Envoyer le devis</button>';
        echo '</form>';
        echo '</div>';
    }
    
    echo '</div>';
}

?>