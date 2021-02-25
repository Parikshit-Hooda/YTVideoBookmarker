'use strict';

$(function() {

        //retrieve data from local for already stored notes
        // chrome.runtime.sendMessage({ method: "getbookmarks" }) //todo, not connected to background.js

        // $('#bookmark_ulist > li > span > a').on("click", function() {
        // console.log('li clicked event fired');
    }) //todo

//todo
//make same page reload of youtube video to bookmarked point

$('#bookmarkdesc').focus(function() {

        console.log('focus bookmark description input field') //executing

        //for sending a message
        chrome.runtime.sendMessage({ method: "gettimestampforcurrentpoint" });

        //for listening any message which comes from runtime
        chrome.runtime.onMessage.addListener(tsvalue);



        var ts, tslink;

        function tsvalue(msg) {
            // Do your work here
            if (msg.method == "tsfind") {
                //here, ive gotten timestamped video link as msg.fl, and timestamp in hour format as msg.tsvaltopopup
                // var noteinput = $('#notedesc').val();
                //add to popup.html, "timestamp received"
                ts = msg.tsvaltopopup;
                tslink = msg.fl;

                // console.log('ts tslink' + ts + ' ' + tslink) //working fine
                $('#submitbookmark').on('click', function() {
                    // console.log('submitnote button clicked')
                    //#bookmark_ulist

                    var bookmarkinput = $('#bookmarkdesc').val();

                    // console.log('#bookmarkinput val ' + bookmarkinput); //fine
                    $('#bookmark_ulist').append('<li><span>' + ts + ' - <a href="' + tslink + '">' + bookmarkinput + '</a></span></li>');
                    console.log('list item appended to bookmark_ulist')

                    // chrome.storage.local.set({ "bklocal": bookmarkinput, "tslocal": ts, "vidlinklocal": tslink })

                    //popup > bg > fg while setting
                    //while getting, see..
                    chrome.runtime.sendMessage({ method: "setlocalstorage", bookmarkvalue: bookmarkinput, timestamp: ts, vidlink: tslink })


                });

                $('#currts').text(msg.tsvaltopopup)
                $('#receiptts').text('got timestamp')


                // makeentryinstorage(bookmarkinput, ts, tslink);

            }
        }


    })
    // });



// chrome.storage.local.set({ note: inputnote, timestamp: time, videolink: link });

// function makeentryinstorage(bookmarkinput, time, link) {
//     chrome.runtime.sendMessage({ method: "storeinlocal", note: bookmarkinput, timestamp: time, videolink: link });

// } //todo

// makeentryinstorage(bookmarkinput, ts, tslink);


// $('#pointsli').append('<li><span><a href="' + $(msg.fl) + '">' + noteinput + '</a></span></li>');


// console.log('msg obj popup.js ' + msg);
// console.log('popupjs noteinput ' + noteinput);
// $('#pointsli').append('<li><span><a href="' + $(msg.fl) + '">' + noteinput + '</a></span></li>');

// { method: "tsfind", tsvaltopopup: msg.tsval, fl: msg.finallink }






// ----------------------------
// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };