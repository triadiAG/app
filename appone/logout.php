<?php include_once './header.php'; ?>
<script>
  logout('<?= $_COOKIE['refresh_token']; ?>');
</script>
<?php include_once './footer.php'; ?>
