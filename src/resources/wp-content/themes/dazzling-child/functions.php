<?php

function hide_update_notice_to_all_but_admin_users()
{
    if (!current_user_can('update_core')) {
        remove_action( 'admin_notices', 'update_nag', 3 );
    }
}
add_action( 'admin_head', 'hide_update_notice_to_all_but_admin_users', 1 );

add_action( 'admin_init', 'my_remove_menu_pages' );
 
function my_remove_menu_pages() {
	// If the user does not have access to publish posts
	if(!current_user_can('publish_posts')) {
		// Remove the "Tools" menu
		remove_menu_page('index.php');
	}
}

add_action("user_register", "set_user_admin_bar_false_by_default", 10, 1);
function set_user_admin_bar_false_by_default($user_id) {
    update_user_meta( $user_id, 'show_admin_bar_front', 'false' );
    update_user_meta( $user_id, 'show_admin_bar_admin', 'false' );
}