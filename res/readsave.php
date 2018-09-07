<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

$file = fopen("autosave.log", "r");
if(filesize("autosave.log") > 0)
    echo fread($file,filesize("autosave.log"));
else
    echo "";
fclose($file);

?>