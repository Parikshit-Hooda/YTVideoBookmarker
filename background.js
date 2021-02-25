'use strict';

//to check connection of fg with bg

chrome.runtime.onMessage.addListener(checktimestamp);

function checktimestamp(msg) {
    // Do your work here
    if (msg.method == "gettimestampforcurrentpoint") {
        console.log('bg.js gettimestampforcurrrentpoint called')
        chrome.tabs.executeScript(null, { file: './gettimestamp.js' }, () => {
            console.log('injected gettimestamp.js file into YT window DOM.')
                //gettimestamp.js will execute now in main chrome window which is running youtube.com/somevideo
        })
    }
}

//first this runs
chrome.tabs.onActivated.addListener(tab => {
    console.log(tab);
    chrome.tabs.get(tab.tabId, c => {
        // console.log(c.url);
        if (/^https:\/\/www\.youtube/.test(c.url)) {
            //above pattern tests for the youtube hostname. If youtube is running in the active tab, it injects ./foreground.js in DOM.


            chrome.tabs.executeScript(null, { file: './foreground.js' }, () => {
                console.log('i injected fg using bg script in youtube webpages')
            })
        }
    })
})

//for sending a message
// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {

// });


// chrome.runtime.onMessage.addListener(retrievenotes)

// function retrievenotes(msg) {
//     if (msg.method == "getnotes") {
//         //todo
//     }

// }

// chrome.runtime.onMessage.addListener(storelocal); //todo

// function storelocal(msg) { //todo
//     if (msg.method == "storeinlocal") {
//         chrome.storage.local.set({ note: inputnote, timestamp: time, videolink: link });
//     }
// }

chrome.runtime.onMessage.addListener(getcurrenttimestamp); //fine

//fine
function getcurrenttimestamp(msg) {
    if (msg.method == "sendtimestamptobg") {
        var temp1 = msg.tsvalue;
        var temp2 = msg.finallink;
        console.log("msg.tsvalue value: " + msg.tsval);
        console.log('msg.finallink ' + msg.finallink);
        //tsval and finallink being received properly in the bg consolelog

        chrome.runtime.sendMessage({ method: "tsfind", tsvaltopopup: temp1, fl: temp2 });
        // , function() {
        //     console.log('tsval to popup');
        // })
    }
}


chrome.runtime.onMessage.addListener(localstorageset);

function localstorageset(msg) {
    if (msg.method == "setlocalstorage") {
        console.log('setlocalstorage background.js') //called
            // chrome.runtime.sendMessage({ method: "setlocalstorage", bookmarkvalue: bookmarkinput, timestamp: ts, vidlink: tslink })
            // chrome.storage.local.set({ "bklocal": msg.bookmarkvalue, "tslocal": msg.timestamp, "vidlinklocal": msg.vidlink })
            // chrome.storage.local.set({ "password": "123" })
            // chrome.runtime.sendMessage({ method: "localstoragesetrequest", pass: "hellopass" });

    }
}



// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log('The color is green.');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'developer.chrome.com'},
//       })],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });