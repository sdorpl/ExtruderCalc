// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


(function() {
  'use strict';

  var app = {
    isLoading: true,
    spinner: document.querySelector('.loader'),
    container: document.querySelector('.mainhide'),
    darkTheme: document.getElementById('setDarkTheme'),
    lightTheme: document.getElementById('setLightTheme'),
    czas: document.getElementById('Czas'),
    theme: showCookie("Theme"),
    version : "0.6.18"
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/
   //Set dark
   document.getElementById('appver').innerHTML= app.version;
   if(!app.theme) {
     setCookie("Theme", "light");
   }

   if(app.theme == "dark") {
     app.darkTheme.setAttribute('hidden', true);
     app.lightTheme.removeAttribute('hidden');
     document.body.classList.add("dark");
     document.querySelector('.mainhide').classList.add("dark");
     document.querySelector('.navbar-custom').classList.add("dark");
     document.querySelector("meta[name=theme-color]").setAttribute("content", "#242424");
     var formClass =  document.getElementsByClassName('form-control');
     if(formClass) {
       for (let i = 0; i < formClass.length; i++) {
        formClass[i].classList.add("dark");
       }
     }
   }

   app.darkTheme.addEventListener('click', function() {
     setCookie("Theme", "dark");
     document.location.reload(true);
   });

   //Set light
   app.lightTheme.addEventListener('click', function() {
     setCookie("Theme", "light");
     document.location.reload(true);
   });

   if(app.czas) {
     app.czas.addEventListener('change', function() {
       // // DEBUG: finiuje zmienne i pobieram dane
       var inputWymiar = document.getElementById('inputWymiar').value;
       var inputSztuk = document.getElementById('inputSztuk').value;
       var inputSpeed = document.getElementById('inputSpeed').value;
       var inputPoIle = document.getElementById('inputPoIle').value;

       app.Licz(inputWymiar, inputSztuk, inputSpeed, inputPoIle);
     });
    }

   app.Licz = function(wymiar, sztuk, speed, poile) {
     //Zmienne komunikatów
     var infoBox = document.getElementById('info');
     var wynikBox = document.getElementById('wynik_row');
     var wynikValue = document.getElementById('wynik');
     var kartonsBox = document.getElementById('kartony_row');
     var kartonsValue = document.getElementById('kartony');

     //Obliczam czas
     var czas = (wymiar / 1000) * (sztuk / speed) / 60;
     //Konwertuje czas do tablicy
     var czasArray = czas.toString().split('.');
     //Sprawdzam ilosc rekordow
     var czasIsArray = czasArray.length;
     //Wykonuje sprawdzenie czy tablica
     if (czasIsArray == 1) {
       var wynikCzas = czasArray[0] + ' Godzin 0 Minut';
     } else {
         var minuty = czasArray[1].substr(0, 2) / 100 * 60;
         var wynikCzas = czasArray[0] + ' Godzin ' + minuty.toString().substr(0, 2) + ' Minut';
    }

    //Obliczam kartony
    var kartons = sztuk / poile;
    //Konwertuje czas do tablicy
    var kartonsArray = kartons.toString().split('.');
    //Sprawdzam ilosc rekordow
    var kartonsIsArray = kartonsArray.length;
    //Wykonuje sprawdzenie czy tablica
    if (kartonsIsArray == 1) {
      var wynikKartons = kartonsArray[0] + '';
    } else {
         var sztuki = parseFloat('0.' + kartonsArray[1]) * poile;
         var wynikKartons = kartonsArray[0] + ' po ' + poile + ' sztuk i reszta ' + sztuki.toString().substr(0, 2) + ' sztuk';
   }

    //Jezeli wymiar i speed null
    if(!wymiar && !speed && !sztuk) {
      infoBox.innerHTML="<strong>Uwaga!</strong> Wprowadź dane do formularza!";
    } else {
      infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
      if(isNaN(czasArray[0]) || isNaN(kartons)) {
        wynikBox.setAttribute('hidden', true);
        infoBox.removeAttribute('hidden');
        infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
      } else {
          infoBox.removeAttribute('hidden');
          infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";

        if(wynikCzas != 0 && wynikCzas != Infinity ) {
          infoBox.setAttribute('hidden', true);
          wynikBox.removeAttribute('hidden');
          wynikValue.innerHTML="Szacowany czas realizacji: <strong>" + wynikCzas + "</strong>";
        } else {
          wynikBox.setAttribute('hidden', true);
					infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
        }

        if(wynikKartons != 0 && wynikKartons != Infinity ) {
          infoBox.setAttribute('hidden', true);
          kartonsBox.removeAttribute('hidden');
          kartonsValue.innerHTML="Ilość kartonów do zrobienia: : <strong>" + wynikKartons + "</strong>";
        } else {
          kartonsBox.setAttribute('hidden', true);
          infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
        }

      }
    }


   };


  // TODO add service worker code here
//  if ('serviceWorker' in navigator) {
  //  navigator.serviceWorker
    //         .register('./service-worker.js')
      //       .then(function() { console.log('Service Worker Registered'); });
        //     if (app.isLoading) {
          //   app.spinner.setAttribute('hidden', true);
            // app.container.removeAttribute('hidden');
             //app.isLoading = false;
           //}
  //}


  let newWorker;
  function showUpdateBar() {
    let snackbar = document.getElementById('snackbar');
    snackbar.removeAttribute('hidden');
  }
  // The click event on the pop up notification
  document.getElementById('reload').addEventListener('click', function(){
    newWorker.postMessage({ action: 'skipWaiting' });
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        // A wild service worker has appeared in reg.installing!
        newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          // Has network.state changed?
          switch (newWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // new update available
                showUpdateBar();
              }
              // No update available
              break;
          }
        });
      });
    });
    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
  }
       if (app.isLoading) {
       app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
     }
})();
