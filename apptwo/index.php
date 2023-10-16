<?php include_once './header.php'; ?>
<?php include_once './check_cookie.php' ?>

<h1>Hello This is app two.</h1>
<div id="fcounter"></div>
<div id="counter"></div>
<script>counter()</script>

<br>
<a href="/another.php">another</a> 
<a href="/logout.php"><button>logout</button></a>

<?php // $_COOKIE['access_token']; ?>
<script>getCredentials('<?= $_COOKIE['access_token']; ?>')</script>

<?php include_once './footer.php'; ?>