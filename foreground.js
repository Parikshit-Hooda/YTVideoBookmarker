console.log('from foreground.js');

let result = document.querySelector('#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar').getAttribute("aria-valuetext");

console.log(result); //check for proper string retrieval in youtube video page DOM console

// chrome.runtime.sendMessage({ timestring: result }, function(response) {
//     console.log('response received' + response);
// });

chrome.runtime.onMessage.addListener(localstorageset_req);

function localstorageset_req(msg) {
    if (msg.method == "localstoragesetrequest") {
        console.log('localstoragesetrequest foreground.js set')
            // chrome.runtime.sendMessage({ method: "setlocalstorage", bookmarkvalue: bookmarkinput, timestamp: ts, vidlink: tslink })
            // chrome.storage.local.set({ "bklocal": msg.bookmarkvalue, "tslocal": msg.timestamp, "vidlinklocal": msg.vidlink })
            // chrome.storage.local.set({ "password": msg.pass })


    }
}