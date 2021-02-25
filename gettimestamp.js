var result1 = document.querySelector('#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar').getAttribute("aria-valuetext"); //example of result1 is 1 Hours 48 Minutes 31 Seconds of 2 Hours 56 Minutes 33 Seconds. Here, the timestamp is 01:48:31 in hh:mm:ss format out of a 02:56:33 long video.

//construct link to exact point here
var temparr = result1.split(' ');

var tshhmmss_string;

if (temparr[6] == "Hours") {
    tshhmmss_string = +"00:" + temparr[0] + ":" + temparr[2];

} else if (temparr[1] == "Hours") {
    tshhmmss_string = temparr[0] + ":" + temparr[2] + ":" + temparr[4];
} else if (temparr[6] == "Minutes") {
    tshhmmss_string = "00:" + temparr[0] + ":" + temparr[2];
}

console.log('gettimestamp.js ' + result1); // works okay.

var windowlink = window.location.href; // note that values like https://www.youtube.com/watch?v=JaIU4CteN50, https://youtu.be/JaIU4CteN50?t=88, https://www.youtube.com/watch?v=PlSr4_moZGA&list=PLqM7alHXFySGnMRMboNceiibQw5ZU-ix9, https://youtu.be/PlSr4_moZGA?list=PLqM7alHXFySGnMRMboNceiibQw5ZU-ix9&t=104 can be stored in pagelink. 


console.log('gettimestamp.js windowlink ' + windowlink);

//find index of v= substring
var idx = windowlink.indexOf('v='); //return index from where the 'v=' substring starts in the windowlink. For example, in https://www.youtube.com/watch?v=JaIU4CteN50, idx = 30. indexOf function returns -1 if the substring is not found in the string.


console.log('gettimestamp.js idx value ' + idx);

// console.log('tres gettimestamp.js ' + tres); fine - format hh:mm:ss

// console.log('typeof tres gettimestamp.js ' + typeof(tres)); //working fine - returns string

function getseconds(timestamphhmmss) {
    var x = timestamphhmmss.split(':');
    var seconds = parseInt(x[0]) * 60 * 60 + parseInt(x[1]) * 60 + parseInt(x[2]);
    console.log('seconds calculated gettimestamp.js getinseconds' + seconds);
    return seconds;
} //function working fine



var timeinseconds = getseconds(tshhmmss_string); //working fine - returns number

// console.log('tsinsec gettimestamp.js ' + tsinsec); fine

var windowlinkfinal;

if (idx == -1) {
    windowlink = "https://youtube.com"; //in case of substring not found, i.e. bad case, store youtube.com as default. 
} else {
    windowlinkfinal = "https://youtube.com/watch?v=" + windowlink.substr(idx + 2, 11) + "&t=" + timeinseconds;
    console.log('gettimestamp.js windowlinkfinal ' + windowlinkfinal);
} // pagelinkfinal fine


chrome.runtime.sendMessage({ method: "sendtimestamptobg", tsvalue: tshhmmss_string, finallink: windowlinkfinal }); //todo refactor