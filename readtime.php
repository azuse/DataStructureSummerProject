<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

$mtime=filemtime("autosave.log");
echo $mtime;

?>