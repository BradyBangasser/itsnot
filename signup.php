<html>
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
?>
<body>

Welcome <?php echo $_POST["fname"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?>

</body>
</html>