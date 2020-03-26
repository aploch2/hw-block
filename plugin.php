<?php
/**
 * Plugin Name: HW Block
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: A block for homework
 * Author: Austin Ploch
 * Author URI: 
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package hw-plugin
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
