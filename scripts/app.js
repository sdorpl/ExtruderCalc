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
    infoBox: document.getElementById('info'),
    wynikBox: document.getElementById('wynik_row'),
    wynikValue: document.getElementById('wynik'),
    kartonsBox: document.getElementById('kartony_row'),
    kartonsValue: document.getElementById('kartony')
  };


  /*****************************************************************************
   *
   * Event listeners for UI elements
   *
   ****************************************************************************/
   document.getElementById('Czas').addEventListener('change', function() {
     // // DEBUG: finiuje zmienne i pobieram dane
    var inputWymiar = document.getElementById('inputWymiar').value;
    var inputSztuk = document.getElementById('inputSztuk').value;
    var inputSpeed = document.getElementById('inputSpeed').value;
    var inputPoIle = document.getElementById('inputPoIle').value;
    app.Licz(inputWymiar, inputSztuk, inputSpeed, inputPoIle);
   });

   app.Licz = function(wymiar, sztuk, speed, poile) {
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
      app.infoBox.innerHTML="<strong>Uwaga!</strong> Wprowadź dane do formularza!";
    } else {
      app.infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
      if(isNaN(czasArray[0]) || isNaN(kartons)) {
        app.wynikBox.setAttribute('hidden', true);
        app.infoBox.removeAttribute('hidden');
        app.infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
      } else {
          app.infoBox.removeAttribute('hidden');
          app.infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";

        if(wynikCzas != 0 && wynikCzas != Infinity ) {
          app.infoBox.setAttribute('hidden', true);
          app.wynikBox.removeAttribute('hidden');
          app.wynikValue.innerHTML="Szacowany czas realizacji: <strong>" + wynikCzas + "</strong>";
        } else {
          app.wynikBox.setAttribute('hidden', true);
					app.infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
        }

        if(wynikKartons != 0 && wynikKartons != Infinity ) {
          app.infoBox.setAttribute('hidden', true);
          app.kartonsBox.removeAttribute('hidden');
          app.kartonsValue.innerHTML="Ilość kartonów do zrobienia: : <strong>" + wynikKartons + "</strong>";
        } else {
          app.kartonsBox.setAttribute('hidden', true);
          app.infoBox.innerHTML="<strong>Uwaga!</strong> Dane w formularzu niekompletne! Wypełnij pola oznaczone gwiazdką.";
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
