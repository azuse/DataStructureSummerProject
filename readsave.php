<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

$file = fopen("autosave.log", "r");
echo fread($file,filesize("autosave.log"));
fclose($file);

?>