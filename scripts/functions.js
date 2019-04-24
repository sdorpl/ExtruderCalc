setCookie = function(name, val, days, path, domain, secure) {
      if (navigator.cookieEnabled) { //czy ciasteczka sÄ… wÅ‚Ä…czone
          const cookieName = encodeURIComponent(name);
          const cookieVal = encodeURIComponent(val);
          let cookieText = cookieName + "=" + cookieVal;

          if (typeof days === "number") {
              const data = new Date();
              data.setTime(data.getTime() + (days * 24*60*60*1000));
              cookieText += "; expires=" + data.toGMTString();
          }

          if (path) {
              cookieText += "; path=" + path;
          }
          if (domain) {
              cookieText += "; domain=" + domain;
          }
          if (secure) {
              cookieText += "; secure";
          }

          document.cookie = cookieText;
      }
  }

showCookie = function(name) {
      if (document.cookie !== "") {
          const cookies = document.cookie.split(/; */);

          for (let i=0; i<cookies.length; i++) {
              const cookieName = cookies[i].split("=")[0];
              const cookieVal = cookies[i].split("=")[1];
              if (cookieName === decodeURIComponent(name)) {
                  return decodeURIComponent(cookieVal);
              }
          }
      }
  }

Math.decimal = function(n, k) {
    var factor = Math.pow(10, k+1);
    n = Math.round(Math.round(n*factor)/10);
    return n/(factor/10);
}
