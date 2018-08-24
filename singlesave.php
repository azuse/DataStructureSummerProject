<?php
ini_set('display_errors',1);
error_reporting(E_ALL);
class DB{
    public $conn;
    function __construct()
    { //connect
        $dbhost = "localhost";
        $account = "root";
        $password = "misakaxindex";
        $dbname = "editor";
        
        $this->conn = mysql_connect($dbhost,$account,$password);        
        if (!$this->conn) {
            // die('Connect Error (' . mysql_connect_errno() . ') '. mysql_connect_error());
        }else{
            //echo 'Connect success... ' . mysqli_get_host_info($this->conn) . "\n";
        }
    
    }
    function __destruct()
    {   //disconnect
        //mysqli_colse($this->conn);//无此函数
    }

}


$time = date("Y-m-d H:s:i");
if($_SERVER['REQUEST_METHOD']=='POST'){


    $db = new DB();
    $sqlselect = "USE editor";
    $result = mysql_query($sqlselect,$db->conn);
    $sqlsetutf8 = "set names 'utf8'";
    $result = mysql_query($sqlsetutf8,$db->conn);

    $sql = "INSERT INTO `save`(`text`,`date`) VALUES ('".$_POST['text']."','".$time."');";
    $result = mysql_query($sql,$db->conn);    
    echo $time;    

};
?>
