<?php include_once './header.php'; ?>

<table>
  <form action="" method="post">
    <tr>
      <td>username</td>
      <td>:</td>
      <td><input type="text" name="username" id="username"></td>
    </tr>
    <tr>
      <td>password</td>
      <td>:</td>
      <td><input type="text" name="password" id="password"></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td><input type="submit" value="login"></td>
    </tr>
  </form>
    <tr>
      <td></td>
      <td></td>
      <td><button onclick="redirectSSOPage()">login with sso</button></td>
    </tr>
  </table>

<?php include_once './footer.php'; ?>