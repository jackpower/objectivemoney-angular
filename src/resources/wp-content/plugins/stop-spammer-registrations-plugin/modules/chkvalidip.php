<?php
// returns false if the IP is valid - returns reason if ip is invalid

if (!defined('ABSPATH')) exit;

class chkvalidip {
	public function process($ip,&$stats=array(),&$options=array(),&$post=array()) {
		if (defined('AF_INET6')&&strpos($ip,'.')===false) {
			try {
				if (!inet_pton($ip)) return 'invalid ip: '.$ip;
			} catch ( Exception $e) {
				return 'invalid ip: '.$ip;
			}
		}
		// check ip4 for local private ip addresses
		if ($ip=='127.0.0.1') {
			return 'Accessing site through localhost';
		}
		$priv=array(
		array('10.0.0.0','10.255.255.255'),
		array('172.16.0.0','172.31.255.255'),
		array('192.168.0.0','192.168.255.255')
		);
		foreach($priv as $ips) {
			if ($ip>=$ips[0] && $ip<=$ips[1]) return 'local IP address:'.$ip;
			if ($ip<$ips[1]) break; // sorted so we can bail
		}
		//use the experimental check fake ip routine
		// doesn't work on older PHPs or some servers without IP6 support enables.
		/*
		try {
			if ($this->_is_fake_ip($ip)) {
				return "Fake IP (experimental) $ip";
			}
		} catch (Exception $e) {
			return $e;
		}
		*/
		// check fb ipv6
		$lip="127.0.0.1";
		if (substr($ip,0,2)=='FB'||substr($ip,0,2)=='fb') 'local IP address:'.$ip;
		// see if server and browser are running on same server.
		if (array_key_exists('SERVER_ADDR',$_SERVER)) {
			$lip=$_SERVER["SERVER_ADDR"];
			if ($ip==$lip) return 'ip same as server:'.$ip;
		} else if (array_key_exists('LOCAL_ADDR',$_SERVER)) { // IIS 7?
			$lip=$_SERVER["LOCAL_ADDR"];
			if ($ip==$lip) return 'ip same as server:'.$ip;
		} else  { // IIs 6 no server address use a gethost by name? Hope we never get here
			try {
				$lip=@gethostbyname($_SERVER['SERVER_NAME']);
				if ($ip==$lip) return 'ip same as server:'.$ip;
			} catch (Exception $e) {
				// can't make this work - ignore
			}
		} 			
		// we can do this with ip4 addresses - check if same /24 subnet
		$j=strrpos($ip,'.');
		if ($j===false) return false;
		$k=strrpos($lip,'.');
		if ($k===false) return false;
		if (substr($ip,0,$j)==substr($lip,0,$k)) return 'ip same /24 subnet as server'.$ip;
		return false;
	}
    // borrowed this code - not sure of how good it is or even what it does.
	// it says it checks for fake ip, but how can the ip be fake?
	/**
	* Check for a fake IP
	*
	* @since   2.0
	* @change  2.6.2
	*
	* @param   string   $ip    Client IP
	* @param   string   $host  Client Host [optional]
	* @return  boolean         TRUE if fake IP
	*/

	private static function _is_fake_ip($client_ip) {
		$client_host="";
		/* Remote Host */
		$host_by_ip = gethostbyaddr($client_ip);

		/* IPv6 special */
		if($this->_is_ipv6($client_ip)) {
			if($this->_is_ipv6($host_by_ip) && inet_pton($client_ip) === inet_pton($host_by_ip)) {
				// no domain
				return false;
			} else {
				// has domain
				$record = dns_get_record($host_by_ip,DNS_AAAA);
				if(empty($record) || empty($record[0]['ipv6'])) {
					// no reverse entry
					return true;
				} else {
					return inet_pton($client_ip) !== inet_pton($record[0]['ipv6']);
				}
			}
		}

		/* IPv4 / Comment */
		if ( empty($client_host) ) {

			$ip_by_host = gethostbyname($host_by_ip);

			if ( $ip_by_host === $host_by_ip ) {
				return false;
			}

			/* IPv4 / Trackback */
		} else {
			if ( $host_by_ip === $client_ip ) {
				return true;
			}

			$ip_by_host = gethostbyname($client_host);
		}

		if ( strpos( $client_ip, $this->_cut_ip($ip_by_host) ) === false ) {
			return true;
		}

		return false;
	}

	/**
	* Check for an IPv4 address
	*
	* @since   2.4
	* @change  2.6.2
	*
	* @param   string   $ip  IP to validate
	* @return  integer       TRUE if IPv4
	*/

	private static function _is_ipv4($ip) {
		//return preg_match('/^\d{1,3}(\.\d{1,3}){3,3}$/', $ip);
		return filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false ;
	}

	/**
	* Check for an IPv6 address
	*
	* @since   2.6.2
	* @change  2.6.2
	*
	* @param   string   $ip  IP to validate
	* @return  boolean       TRUE if IPv6
	*/

	private static function _is_ipv6($ip) {
		//return ! $this->_is_ipv4($ip);
		return filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6) !== false ;
	}


	
	
	
	
	
	
	
	
}
?>