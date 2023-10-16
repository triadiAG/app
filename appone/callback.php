<?php   include_once './header.php';   if (!isset($_GET['code'])) { ?> <script>window.location.href = 'http://localhost:8001/?err=invalid code sso';  </script> <?php  };  $code = $_GET['code'];?>

<script>requestSSO('<?= $code; ?>');</script>

<?php include_once './footer.php'; ?>