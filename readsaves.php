<?php
ini_set('display_errors',1);
error_reporting(E_ALL);
class DB{
    public $conn;
    function __construct()
    { //connect
        $dbhost = "localhost";
        $account = "localroot";
        $password = "azuse";
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


$db = new DB();
$sqlselect = "USE editor";
$result = mysql_query($sqlselect,$db->conn);
$sqlsetutf8 = "set names 'utf8'";
$result = mysql_query($sqlsetutf8,$db->conn);

global $dataBuf;

$sql = "SELECT * FROM `save` ";
$result = mysql_query($sql,$db->conn);
if($result == null){
    echo "error:".mysql_error($db->conn)."<br>";
}
//echo var_dump($result);
$i = 0;
while($row = mysql_fetch_array($result))
{
    //先将结果放入一维数组中
    $temp["text"] = $row['text'];
    $temp["date"] = $row['date'];


    //放入二维数组dataBuf中
    $dataBuf[$i++] = $temp;
}



//输出json格式字符串
echo json_encode($dataBuf);        

?>
