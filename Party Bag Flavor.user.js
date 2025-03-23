// ==UserScript==
// @name         Party Bag Flavor
// @namespace    https://thesilvertower.net/
// @version      0.3.1
// @updateURL    https://github.com/msquibb/Lyrania-User-Scripts/raw/main/Party%20Bag%20Flavor.user.js
// @description  Make important party bag items stand out
// @author       Ackron
// @match        *://lyrania.co.uk/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  console.info("Script starting");
  const autoRegEx = /autos/;
  const jboxRegex = /A shiny box of jewels!/;
  const tokensRegex = /tokens/;
  const orbsRegex = /Craftsman's Orb/;
  const qualityOrbRegex = /Quality/;
  const fineOrbRegex = /Fine/;
  const decentOrbRegex = /Decent/;
  const poorOrbRegex = /Poor/;
  const dpRegex = /dungeon points/;
  const dEggRegex = /Dragon Egg/;
  const decProcRegex = /Dec! Dec! Dec!/;
  const quadProcRegex = /enough quad to last/;
  const jewelsRegex = /Everybody gets a jewel!/;
  const numberRegex = /\D+/g;

  var popupDiv = document.getElementById("popupresdisplay");
  const observer = new MutationObserver(function(mutationList, observer){
    UpdateOpenedGifts();
  });

  const observe = () => {
    observer.observe(popupDiv, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: []
    });
  }

  function UpdateOpenedGifts() {
    observer.disconnect();
    var autos = 0;
    var jbox = 0;
    var tokens = 0;
    var orbs = { poor: 0, decent: 0, fine: 0, quality: 0 };
    var dp = 0;
    var degg = 0;
    var quadProc = 0;
    var decProc = 0;
    var jewels = 0;
    var presents = document.getElementsByClassName('VibbleBdayOpened');
    console.info(presents);
    for (var i = 0; i < presents.length; i++) {
      var present = presents[i];
      var presentDesc = present.textContent;
      if (presentDesc.match(autoRegEx)) {
        present.setAttribute('style', 'color: #FF0000; font-weight: bold');
        autos += parseInt(presentDesc.replace(numberRegex, ''));
      } else if (presentDesc.match(jboxRegex)) {
        present.setAttribute('style', 'color: #FFFF00; font-weight: bold');
        jbox++;
      } else if (presentDesc.match(tokensRegex)) {
        tokens += parseInt(presentDesc.replace(numberRegex, ''));
      } else if (presentDesc.match(orbsRegex)) {
        if (presentDesc.match(qualityOrbRegex)){
          orbs.quality++;
        } else if (presentDesc.match(fineOrbRegex)) {
          orbs.fine++;
        } else if (presentDesc.match(decentOrbRegex)) {
          orbs.decent++;
        } else if (presentDesc.match(poorOrbRegex)) {
          orbs.poor++;
        }
        present.setAttribute('style', 'color:rgb(0, 238, 255); font-weight: bold');
      } else if (presentDesc.match(dpRegex)) {
        dp += parseInt(presentDesc.replace(numberRegex, ''));
      } else if (presentDesc.match(dEggRegex)) {
        degg += parseInt(presentDesc.replace(numberRegex, ''));
        present.setAttribute('style', 'color: #00DD00; font-weight: bold;')
      } else if (presentDesc.match(quadProcRegex)) {
        quadProc++;
      } else if (presentDesc.match(decProcRegex)){
        decProc++;
      } else if (presentDesc.match(jboxRegex)){
        jewels += parseInt(presentDesc.replace(numberRegex, ''));
      }
    }
    var header = document.getElementsByClassName('PartyBagHeaderMessage');
    var report = document.getElementById('ackron-party-report');
    if (header.length > 0){
      if (report) {
        console.log('We have the report div already');
      } else {
        console.info(header);
        var newReport = document.createElement('div');
        newReport.setAttribute('id', 'ackron-party-report');
        header[0].insertAdjacentElement('afterend', newReport);
        report = newReport;
      }
      report.innerHTML = `<ul>
        <li>Jewel Boxes: ${jbox}</li>
        <li>Autos: ${autos}</li>
        <li>Tokens: ${tokens}</li>
        <li>Dungeon Points: ${dp}</li>
        <li>Dragon Eggs: ${degg}</li>
        <li>Quad Procs: ${quadProc}</li>
        <li>Decuple Procs: ${decProc}</li>
        <li>Orbs: ${orbs.quality + orbs.decent + orbs.fine + orbs.poor}<ul>
          <li>Quality: ${orbs.quality}</li>
          <li>Fine: ${orbs.fine}</li>
          <li>Decent: ${orbs.decent}</li>
          <li>Poor: ${orbs.poor}</li>
        </ul></li>
      </ul>`;
      var rpt = { 
        'autos': autos, 
        'jbox': jbox, 
        'orbs': orbs, 
        'tokens': tokens, 
        'dp': dp, 
        'eggs': degg, 
        'quad': quadProc, 
        'decuple': decProc 
      };
      console.info(rpt);
    }
    observe();
  }

  observe();
})();