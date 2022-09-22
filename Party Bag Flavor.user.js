// ==UserScript==
// @name         Party Bag Flavor
// @namespace    https://lyrania.co.uk/
// @version      0.1
// @description  Make important party bag items stand out
// @author       Ackron
// @match        https://lyrania.co.uk/use-vibblez-birthday-item.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const autoRegEx = /autos/;
    const jboxRegex = /A shiny box of jewels!/;
    const tokensRegex = /tokens/;
    const orbsRegex = /Craftsman's Orb/;
    const dpRegex = /dungeon points/;
    const numberRegex = /\D+/g;
    var autos = 0;
    var jbox = 0;
    var tokens = 0;
    var orbs = {poor: 0, decent: 0, fine: 0, quality: 0};
    var dp = 0;
    var presents = document.getElementsByClassName('VibbleBdayOpened')
    for (var i = 0; i < presents.length; i++){
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
            present.setAttribute('style', 'color: #FF0000; font-weight: bold');
          } else if (presentDesc.match(dpRegex)) {            
            dp += parseInt(presentDesc.replace(numberRegex, ''));
          }
    }
    var header = document.getElementsByClassName('PartyBagHeaderMessage');
    var report = document.getElementById('ackron-party-report');
    if (report){
        console.log('We have the report div already');
    } else {
        var newReport = document.createElement('div');
        newReport.setAttribute('id', 'ackron-party-report');
        header[0].insertAdjacentElement('afterend', newReport);
        report = newReport;
    }
    report.innerHTML = `<ul><li>Jewel Boxes: ${jbox}</li><li>Autos: ${autos}</li><li>Tokens: ${tokens}</li><li>Dungeon Points: ${dp}</li><li>Orbs: 0</li></ul>`
})();