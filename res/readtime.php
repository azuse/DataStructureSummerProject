<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

echo date("Y-m-d H:i:s",filemtime("autosave.log"));

?>