<?php
ini_set('display_errors',1);
error_reporting(E_ALL);
$time = date("Y-m-d H:s:i");
if($_SERVER['REQUEST_METHOD']=='POST'){
    $file = fopen("autosave.log", "w");
    fwrite($file,$_POST["text"]);
    fclose($file);
    echo $time;
};
?>