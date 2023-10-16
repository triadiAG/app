const baseUserUrl = 'http://localhost:8080/auth/realms/demo/protocol/openid-connect'

function redirectSSOPage() {
  window.location.href = baseUserUrl+'/auth?response_type=code&client_id=user&redirect_uri=http://localhost:8002/callback.php';
}

function getCredentials(access_token) {
  // console.log("cred");
  var xhr = new XMLHttpRequest();
  var url = baseUserUrl+'/userinfo';
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Authorization', 'Bearer '+access_token)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var now = new Date();
      if(getCookie("refresh_token"))
      console.log(xhr.response);
    }
  }
  xhr.send();
}

function requestSSO(code) {

  var xhr = new XMLHttpRequest();
  var url = baseUserUrl+'/token';
  var params = 'grant_type=authorization_code&client_id=user&client_secret=IaoAGr1VDVSCxxFlzoXtZpIZbpMfFBZL&code='+code+'&redirect_uri=http://localhost:8002/callback.php';
  xhr.open('POST', url, true);
  
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      if (xhr.status == 200){
        var myData = JSON.parse(xhr.response);
        document.cookie = "access_token="+myData.access_token; 
        document.cookie = "refresh_token="+myData.refresh_token; 
        expiresAccess(myData.expires_in);
        expiresRefresh(myData.refresh_expires_in);
        document.location.href = "http://localhost:8002/";
      } 
    }else {
      // document.location.href = "http://localhost:8888/login";
    }
  }
  xhr.send(params);
}

function expiresAccess(s){
  var t = new Date();
  t.setSeconds(t.getSeconds() + s);
  document.cookie = "expire_access="+t;
}
function expiresRefresh(s){
  var t = new Date();
  t.setSeconds(t.getSeconds() + s);
  document.cookie = "expire_refresh="+t;
}

function logout(refresh){
  var xhr = new XMLHttpRequest();
  var url = baseUserUrl+'/logout';
  var param = 'client_id=user&client_secret=IaoAGr1VDVSCxxFlzoXtZpIZbpMfFBZL&refresh_token='+refresh
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 204) {
      console.log(xhr.status);
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
      document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
      document.cookie = "expire_access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
      document.cookie = "expire_refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
      document.location.href = "http://localhost:8001/login.php";
    }
  }
  xhr.send(param) ;
}

function counter(){
  setInterval(updated);
  
  var exp = getCookie("expire_access");
  
  function updated() {
    var date = new Date();
    
    let fcount = document.getElementById("fcounter");
    let count = document.getElementById("counter");
    fcount.innerHTML = date;
    count.innerHTML = exp;
    if (date >= exp) {
      refreshToken();
    }
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function refreshToken(){
  // var exp = getCookie("expire_access");
  var xhr = new XMLHttpRequest();
  var refresh = getCookie("refresh_token");
  var param = 'grant_type=refresh_token&client_id=user&refresh_token='+refresh;
  var url = baseUserUrl+'/token'

  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'x-www-form-urlencoded');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log("refresh"+refresh);
      console.log(xhr.response);
    }
  }
  xhr.send(param)
}