
setCookie = function(name, val, days, path, domain, secure) {
  if (navigator.cookieEnabled) { //czy ciasteczka sÄ… wÅ‚Ä…czone
    const cookieName = encodeURIComponent(name);
    const cookieVal = encodeURIComponent(val);
    let cookieText = cookieName + "=" + cookieVal;

    if (typeof days === "number") {
      const data = new Date();
      data.setTime(data.getTime() + (days * 24 * 60 * 60 * 1000));
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

    for (let i = 0; i < cookies.length; i++) {
      const cookieName = cookies[i].split("=")[0];
      const cookieVal = cookies[i].split("=")[1];
      if (cookieName === decodeURIComponent(name)) {
        return decodeURIComponent(cookieVal);
      }
    }
  }
}

Math.decimal = function(n, k) {
  var factor = Math.pow(10, k + 1);
  n = Math.round(Math.round(n * factor) / 10);
  return n / (factor / 10);
}

darkTheme = function() {
  document.getElementById('setDarkTheme').setAttribute('hidden', true);
  document.getElementById('setLightTheme').removeAttribute('hidden');
  document.body.classList.add("dark");
  document.querySelector('.mainhide').classList.add("dark");
  document.querySelector('.navbar-custom').classList.add("dark");
  document.querySelector("meta[name=theme-color]").setAttribute("content", "#000000");

  //Zmienne
  var saveDialog = document.getElementsByClassName('saveDialogContent');
  var formClass = document.getElementsByClassName('form-control');

  if (saveDialog) {
    for (let i = 0; i < saveDialog.length; i++) {
      saveDialog[i].classList.add("dark");
    }
  }

  if (formClass) {
    for (let i = 0; i < formClass.length; i++) {
      formClass[i].classList.add("dark");
    }
  }

}

lightTheme = function() {
  document.getElementById('setDarkTheme').removeAttribute('hidden');
  document.getElementById('setLightTheme').setAttribute('hidden', true);
  document.body.classList.remove("dark");
  document.querySelector('.mainhide').classList.remove("dark");
  document.querySelector('.navbar-custom').classList.remove("dark");
  document.querySelector('.saveDialogContent').classList.remove("dark");
  document.querySelector("meta[name=theme-color]").setAttribute("content", "#790005");
  var formClass = document.getElementsByClassName('form-control');
  if (formClass) {
    for (let i = 0; i < formClass.length; i++) {
      formClass[i].classList.remove("dark");
    }
  }
}

saveItems = function(nazwa, adnot, wymiar, poile, sztuk, predkosc, date, item) {
   var items = {
     "nazwa": nazwa,
     "adnotacja": adnot,
     "wymiar": wymiar,
     "poile": poile,
     "sztuk" : sztuk,
     "predkosc": predkosc,
     "data": date,
     item

   };

   localforage.setItem(nazwa, items).then(function (value) {
       // Do other things once the value has been saved.
       console.log(value);
   }).catch(function(err) {
       // This code runs if there were any errors
       console.log(err);
   });

  console.log(items);
}

makeDialog = function(content, name) {
  //Tworzę DialogContainer
  var dialogContainer = document.createElement('div');
  //Nazwa Class
  dialogContainer.className = 'saveDialogContainer';
  //ustalam miejsce dla Dialog
  var dialogFrame = document.getElementById('dialogT');
  dialogFrame.appendChild(dialogContainer);

  //var znacznik2 = document.createElement('input');
  //znacznik2.setAttribute('type', 'text');
  //znacznik2.setAttribute('id', 'item'+newItemNameDigit);
  //znacznik2.setAttribute('placeholder', 'Produkt');
  //znacznik2.className = 'form-control';
  //var kontener2 = document.getElementById('item'+newItemNameDigit+'group');
  //kontener2.appendChild(znacznik2);
}
