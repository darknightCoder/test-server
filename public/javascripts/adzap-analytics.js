(function (window) {
    window.siteId = window.siteId||'test';
    var url = 'http://tk.adzapsrv.com';

    var ADZ_DCONT={"_clients":null,"adz_mid":"1a7f2167-b9c5-4dd3-9f4d-73f7adff2c45"}

    //  ployfills
    if (typeof Array.isArray === 'undefined') {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === '[object Array]';
        }
      };
    var AdzapApp = function () {
        this._fingerprint='';
        this._cookie='';
        this._cookie='';
        this._session='';
        return;
    };

    // your sdk init function   
    AdzapApp.prototype.init = function () {
        // ...
    };
    AdzapApp.prototype.redirect = function() {
        

        //first sorting it by priority


        function compare(a, b) {
           
            const priorityA = a.priority;
            const priorityB = b.priority;
          
            let comparison = 0;
            if (priorityA > priorityB) {
              comparison = 1;
            } else if (priorityA < priorityB) {
              comparison = -1;
            }
            return comparison;
          }

          console.log(ADZ_DCONT);
        if(ADZ_DCONT && ADZ_DCONT._clients && ADZ_DCONT._clients && Array.isArray(ADZ_DCONT._clients)){
           
            ADZ_DCONT._clients =  ADZ_DCONT._clients.sort(compare);
           
            ADZ_DCONT._clients.forEach(function(client){

                redirectToURL(client);
                
            })
            

        }
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        function partner_callback(urls,tag){

            // get the params
            var email = window.email;
            var md5 = window.md5;
            var sha1 = window.sha1;
            var sha256 = window.sha256;
            var redirectToURL = window.redirectToURL;


            console.log(urls);
            if(urls && Array.isArray(urls)){
                
                console.log(tag);
                if (tag == 'js'){

                    var emailMd5='';
                    var emailSha1='';
                    var emailSha256='';
                    var appendUrl = '';
                    var isPlainText = validateEmail(email);
                    
                    if(isPlainText){

                        emailMd5 = AdzapApp.util._generateMd5(email);
                        emailSha1 = AdzapApp.util._generateSha1(email);
                        emailSha256 = AdzapApp.util._generateSha256(email);
                    }

                    urls.forEach(function(url){
                        //build the url
                        /* 
                    *two scenarios here first whether email is provided or not/check if user wants identity tracking
                        *if it is provided
                           *check if it is plain text-if it is,hash them using functions like md5,
                           -sha1,sha256
                           -and then append the url with sid(partner id) and aam(cookie id) and redirect url if available
                           -encode url

                           *check if it is not plain text-if it is not,check md5,sha1,sha256 sdk 
                           variables and use them
                           and then append the url with sid(partner id) and aam(cookie id) and redirect url if available
                           encode url(if provided)

                        
                        
                        *if it is not provided
                           append the url with sid(partner id) and aam(cookie id) and redirect url if available
                           encode url
                        
                           
                    *After these two scenarios check if tag type required is image or script  and then start posting data according to priority of client

                    *Meanwhile keep collecting user data for our server

                        */
                        var script=document.createElement("script");
                        script.setAttribute("type","text\/javascript");
                        script.setAttribute("async","");
                        script.setAttribute("defer","");
                        //script.setAttribute("src","http://ps.clientdomain.net/pixel?e_rc=1&pid=51mdk5u&t=js");
                        console.log(url);
                        script.setAttribute("src",url)
                        var s=document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(script,s);
                    })
                }
                if(tag=='img'){
                    urls.forEach(function(url){

                        (new Image().src=url);
                    })
                }
 
            }
        }
        function redirectToURL(client){
            

            if (client.tag == 'img'){
                //EXAMPLE
               // (new Image()).src="http:\/\/cm.g.clientdomain.net\/pixel?google_nid=eye&google_sc&bid=gdo9o51&newuser=1";
               /// TODO FILL MD5 SHA1 AND SHA256

               
               partner_callback(client.urls,client.tag);
            }else if  (client.tag == 'js'){
                // EXAMPLE
                // (new Image()).src="http:\/\/cm.g.clientdomain.net\/pixel?google_nid=eye&google_sc&bid=gdo9o51&newuser=1";
                 /// TODO FILL MD5 SHA1 AND SHA256
                partner_callback(client.urls,client.tag);
             }
        }

    }
    
    AdzapApp.prototype.doSessionStorage = function () {

        if(localStorage){

            if(!localStorage.getItem('visits')){
                localStorage.setItem('visits',1)
            }
            else {
                let counter = localStorage.getItem('visits');
                localStorage.setItem('visits',parseInt(counter)+1);
               
            }
        }
    };
    AdzapApp.prototype.doCookieStorage = function() {

        if(!AdzapApp.prototype.util._CookieStorageApi.getItem('visits')) {
            AdzapApp.prototype.util._CookieStorageApi.setItem('visits',1)
        }
        else{
            let counter = AdzapApp.prototype.util._CookieStorageApi.getItem('visits');
           
            AdzapApp.prototype.util._CookieStorageApi.setItem('visits',parseInt(counter)+1);
        }
    };

    AdzapApp.prototype.fingerPrintGenerate = function(){

        this._fingerprint=AdzapApp.prototype.util._fingerPrintGenerate();
        var key = '';
        var id = '';
        if(window && window.Publisher ){
            key = window.Publisher.key;
            id = window.Publisher.id;
            siteId = window.Publisher.siteId;
        };
        var isMobile = AdzapApp.prototype.util._getDeviceType();
        var device = isMobile?'mobile':'desktop';
        var browserInfo = navigator.browserInfo||'NA';

        var ipPromise = AdzapApp.prototype.util._getIp();
        ipPromise.then((ip)=>{

            var ip = ip;
            console.log(ip);

            fetch(url+'/api/v1/tracker/ckevent?publisherKey='+key+'&publisherID='+id+'&fingerPrintID='+this._fingerprint+'&siteID='+siteId+'&ipAddr='+ip+'&device='+device+'&browserInfo='+browserInfo, {
                credentials: 'include'
            })
        }).catch((e)=>{

            fetch(url+'/api/v1/tracker/ckevent?publisherKey='+key+'&publisherID='+id+'&fingerPrintID='+this._fingerprint+'&siteID='+siteId+'&ipAddr='+e+'&device='+device+'&browserInfo='+browserInfo, {
                credentials: 'include'
            })
        })


    };
    AdzapApp.prototype.util = {};
    AdzapApp.prototype.util._getDeviceType = function () {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }; 
    AdzapApp.prototype.util._getIp = function(){
        return new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})

/*Usage example*/
    }
    AdzapApp.prototype.util._CookieStorageApi = {
        getItem: function (sKey) {
            if (!sKey) { return null; }
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        /*
                        Note: Despite officially defined in RFC 6265, the use of `max-age` is not compatible with any
                        version of Internet Explorer, Edge and some mobile browsers. Therefore passing a number to
                        the end parameter might not work as expected. A possible solution might be to convert the the
                        relative time to an absolute time. For instance, replacing the previous line with:
                        */
                        /*
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; expires=" + (new Date(vEnd * 1e3 + Date.now())).toUTCString();
                        */
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!this.hasItem(sKey)) { return false; }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        }
    }

    AdzapApp.prototype.util._generateMd5 = function(string){
     

    
       function RotateLeft(lValue, iShiftBits) {
               return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
       }
    
       function AddUnsigned(lX,lY) {
               var lX4,lY4,lX8,lY8,lResult;
               lX8 = (lX & 0x80000000);
               lY8 = (lY & 0x80000000);
               lX4 = (lX & 0x40000000);
               lY4 = (lY & 0x40000000);
               lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
               if (lX4 & lY4) {
                       return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
               }
               if (lX4 | lY4) {
                       if (lResult & 0x40000000) {
                               return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                       } else {
                               return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                       }
               } else {
                       return (lResult ^ lX8 ^ lY8);
               }
       }
    
       function F(x,y,z) { return (x & y) | ((~x) & z); }
       function G(x,y,z) { return (x & z) | (y & (~z)); }
       function H(x,y,z) { return (x ^ y ^ z); }
       function I(x,y,z) { return (y ^ (x | (~z))); }
    
       function FF(a,b,c,d,x,s,ac) {
               a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
               return AddUnsigned(RotateLeft(a, s), b);
       };
    
       function GG(a,b,c,d,x,s,ac) {
               a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
               return AddUnsigned(RotateLeft(a, s), b);
       };
    
       function HH(a,b,c,d,x,s,ac) {
               a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
               return AddUnsigned(RotateLeft(a, s), b);
       };
    
       function II(a,b,c,d,x,s,ac) {
               a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
               return AddUnsigned(RotateLeft(a, s), b);
       };
    
       function ConvertToWordArray(string) {
               var lWordCount;
               var lMessageLength = string.length;
               var lNumberOfWords_temp1=lMessageLength + 8;
               var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
               var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
               var lWordArray=Array(lNumberOfWords-1);
               var lBytePosition = 0;
               var lByteCount = 0;
               while ( lByteCount < lMessageLength ) {
                       lWordCount = (lByteCount-(lByteCount % 4))/4;
                       lBytePosition = (lByteCount % 4)*8;
                       lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                       lByteCount++;
               }
               lWordCount = (lByteCount-(lByteCount % 4))/4;
               lBytePosition = (lByteCount % 4)*8;
               lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
               lWordArray[lNumberOfWords-2] = lMessageLength<<3;
               lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
               return lWordArray;
       };
    
       function WordToHex(lValue) {
               var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
               for (lCount = 0;lCount<=3;lCount++) {
                       lByte = (lValue>>>(lCount*8)) & 255;
                       WordToHexValue_temp = "0" + lByte.toString(16);
                       WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
               }
               return WordToHexValue;
       };
    
       function Utf8Encode(string) {
               string = string.replace(/\r\n/g,"\n");
               var utftext = "";
    
               for (var n = 0; n < string.length; n++) {
    
                       var c = string.charCodeAt(n);
    
                       if (c < 128) {
                               utftext += String.fromCharCode(c);
                       }
                       else if((c > 127) && (c < 2048)) {
                               utftext += String.fromCharCode((c >> 6) | 192);
                               utftext += String.fromCharCode((c & 63) | 128);
                       }
                       else {
                               utftext += String.fromCharCode((c >> 12) | 224);
                               utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                               utftext += String.fromCharCode((c & 63) | 128);
                       }
    
               }
    
               return utftext;
       };
    
       var x=Array();
       var k,AA,BB,CC,DD,a,b,c,d;
       var S11=7, S12=12, S13=17, S14=22;
       var S21=5, S22=9 , S23=14, S24=20;
       var S31=4, S32=11, S33=16, S34=23;
       var S41=6, S42=10, S43=15, S44=21;
    
       string = Utf8Encode(string);
    
       x = ConvertToWordArray(string);
    
       a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    
       for (k=0;k<x.length;k+=16) {
               AA=a; BB=b; CC=c; DD=d;
               a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
               d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
               c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
               b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
               a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
               d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
               c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
               b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
               a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
               d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
               c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
               b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
               a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
               d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
               c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
               b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
               a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
               d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
               c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
               b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
               a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
               d=GG(d,a,b,c,x[k+10],S22,0x2441453);
               c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
               b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
               a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
               d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
               c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
               b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
               a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
               d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
               c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
               b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
               a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
               d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
               c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
               b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
               a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
               d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
               c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
               b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
               a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
               d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
               c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
               b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
               a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
               d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
               c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
               b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
               a=II(a,b,c,d,x[k+0], S41,0xF4292244);
               d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
               c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
               b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
               a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
               d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
               c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
               b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
               a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
               d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
               c=II(c,d,a,b,x[k+6], S43,0xA3014314);
               b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
               a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
               d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
               c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
               b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
               a=AddUnsigned(a,AA);
               b=AddUnsigned(b,BB);
               c=AddUnsigned(c,CC);
               d=AddUnsigned(d,DD);
               }
    
           var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
    
           return temp.toLowerCase();
    }
    AdzapApp.prototype.util._generateSha1 = function(msg, utf8encode) {
        utf8encode =  (typeof utf8encode == 'undefined') ? true : utf8encode;
        
        // convert string to UTF-8, as SHA only deals with byte-streams
        if (utf8encode) msg = Utf8.encode(msg);
        
        // constants [§4.2.1]
        var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
        
        // PREPROCESSING 
        
        msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [§5.1.1]
        
        // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
        var l = msg.length/4 + 2;  // length (in 32-bit integers) of msg + ‘1’ + appended length
        var N = Math.ceil(l/16);   // number of 16-integer-blocks required to hold 'l' ints
        var M = new Array(N);
        
        for (var i=0; i<N; i++) {
          M[i] = new Array(16);
          for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
            M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | 
              (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
          } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
        }
        // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
        // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
        // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
        M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
        M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;
        
        // set initial hash value [§5.3.1]
        var H0 = 0x67452301;
        var H1 = 0xefcdab89;
        var H2 = 0x98badcfe;
        var H3 = 0x10325476;
        var H4 = 0xc3d2e1f0;
        
        // HASH COMPUTATION [§6.1.2]
        
        var W = new Array(80); var a, b, c, d, e;
        for (var i=0; i<N; i++) {
        
          // 1 - prepare message schedule 'W'
          for (var t=0;  t<16; t++) W[t] = M[i][t];
          for (var t=16; t<80; t++) W[t] = Sha1.ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
          
          // 2 - initialise five working variables a, b, c, d, e with previous hash value
          a = H0; b = H1; c = H2; d = H3; e = H4;
          
          // 3 - main loop
          for (var t=0; t<80; t++) {
            var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
            var T = (Sha1.ROTL(a,5) + Sha1.f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
            e = d;
            d = c;
            c = Sha1.ROTL(b, 30);
            b = a;
            a = T;
          }
          
          // 4 - compute the new intermediate hash value
          H0 = (H0+a) & 0xffffffff;  // note 'addition modulo 2^32'
          H1 = (H1+b) & 0xffffffff; 
          H2 = (H2+c) & 0xffffffff; 
          H3 = (H3+d) & 0xffffffff; 
          H4 = (H4+e) & 0xffffffff;
        }
      
        return Sha1.toHexStr(H0) + Sha1.toHexStr(H1) + 
          Sha1.toHexStr(H2) + Sha1.toHexStr(H3) + Sha1.toHexStr(H4);
      }
    AdzapApp.prototype.util._generateSha256 = function (s){
     
        var chrsz   = 8;
        var hexcase = 0;
     
        function safe_add (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
     
        function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
        function R (X, n) { return ( X >>> n ); }
        function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
        function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
        function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
        function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
        function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
        function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
     
        function core_sha256 (m, l) {
            var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
            var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
            var W = new Array(64);
            var a, b, c, d, e, f, g, h, i, j;
            var T1, T2;
     
            m[l >> 5] |= 0x80 << (24 - l % 32);
            m[((l + 64 >> 9) << 4) + 15] = l;
     
            for ( var i = 0; i<m.length; i+=16 ) {
                a = HASH[0];
                b = HASH[1];
                c = HASH[2];
                d = HASH[3];
                e = HASH[4];
                f = HASH[5];
                g = HASH[6];
                h = HASH[7];
     
                for ( var j = 0; j<64; j++) {
                    if (j < 16) W[j] = m[j + i];
                    else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
     
                    T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                    T2 = safe_add(Sigma0256(a), Maj(a, b, c));
     
                    h = g;
                    g = f;
                    f = e;
                    e = safe_add(d, T1);
                    d = c;
                    c = b;
                    b = a;
                    a = safe_add(T1, T2);
                }
     
                HASH[0] = safe_add(a, HASH[0]);
                HASH[1] = safe_add(b, HASH[1]);
                HASH[2] = safe_add(c, HASH[2]);
                HASH[3] = safe_add(d, HASH[3]);
                HASH[4] = safe_add(e, HASH[4]);
                HASH[5] = safe_add(f, HASH[5]);
                HASH[6] = safe_add(g, HASH[6]);
                HASH[7] = safe_add(h, HASH[7]);
            }
            return HASH;
        }
     
        function str2binb (str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for(var i = 0; i < str.length * chrsz; i += chrsz) {
                bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
            }
            return bin;
        }
     
        function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
     
            for (var n = 0; n < string.length; n++) {
     
                var c = string.charCodeAt(n);
     
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
     
            }
     
            return utftext;
        }
     
        function binb2hex (binarray) {
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for(var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
            }
            return str;
        }
     
        s = Utf8Encode(s);
        return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
     
    }

    AdzapApp.prototype.util._fingerPrintGenerate = function() {

        ;(function(name,context,definition) { if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); } else if (typeof define === 'function' && define.amd) { define(definition); } else { context[name] = definition(); } } ) ('Fingerprint', this, function() { 'use strict'; var Fingerprint = function(options) { var nativeForEach, nativeMap; nativeForEach = Array.prototype.forEach; nativeMap = Array.prototype.map; this.each = function(obj, iterator, context) { if (obj === null) { return; } if (nativeForEach && obj.forEach === nativeForEach) { obj.forEach(iterator, context); } else if (obj.length === +obj.length) { for (var i = 0, l = obj.length; i < l; i++) { if (iterator.call(context, obj[i], i, obj) === {}) return; } } else { for (var key in obj) { if (obj.hasOwnProperty(key)) { if (iterator.call(context, obj[key], key, obj) === {}) return; } } } }; this.map = function(obj, iterator, context) { var results = []; if (obj == null) return results; if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context); this.each(obj, function(value, index, list) { results[results.length] = iterator.call(context, value, index, list); }); return results; }; if (typeof options == 'object') { this.hasher = options.hasher; this.screen_resolution = options.screen_resolution; this.screen_orientation = options.screen_orientation; this.canvas = options.canvas; this.ie_activex = options.ie_activex; } else if (typeof options == 'function') { this.hasher = options; } }; Fingerprint.prototype = { get: function() { var keys = []; keys.push(navigator.userAgent); keys.push(navigator.language); keys.push(screen.colorDepth); if (this.screen_resolution) { var resolution = this.getScreenResolution(); if (typeof resolution !== 'undefined') { keys.push(this.getScreenResolution().join('x')); } } keys.push(new Date().getTimezoneOffset()); keys.push(this.hasSessionStorage()); keys.push(this.hasLocalStorage()); keys.push(!!window.indexedDB); if (document.body) { keys.push(typeof(document.body.addBehavior)); } else { keys.push(typeof undefined); } keys.push(typeof(window.openDatabase)); keys.push(navigator.cpuClass); keys.push(navigator.platform); keys.push(navigator.doNotTrack); keys.push(this.getPluginsString()); if (this.canvas && this.isCanvasSupported()) { keys.push(this.getCanvasFingerprint()); } if (this.hasher) { return this.hasher(keys.join('###'), 31); } else { return this.murmurhash3_32_gc(keys.join('###'), 31); } }, murmurhash3_32_gc: function(key, seed) { var remainder, bytes, h1, h1b, c1, c2, k1, i; remainder = key.length & 3; bytes = key.length - remainder; h1 = seed; c1 = 0xcc9e2d51; c2 = 0x1b873593; i = 0; while (i < bytes) { k1 = ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) | ((key.charCodeAt(++i) & 0xff) << 24); ++i; k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff; k1 = (k1 << 15) | (k1 >>> 17); k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff; h1 ^= k1; h1 = (h1 << 13) | (h1 >>> 19); h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff; h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16)); } k1 = 0; switch (remainder) { case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16; case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8; case 1: k1 ^= (key.charCodeAt(i) & 0xff); k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff; k1 = (k1 << 15) | (k1 >>> 17); k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff; h1 ^= k1; } h1 ^= key.length; h1 ^= h1 >>> 16; h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff; h1 ^= h1 >>> 13; h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff; h1 ^= h1 >>> 16; return h1 >>> 0; }, hasLocalStorage: function() { try { return !!window.localStorage; } catch (e) { return true; } }, hasSessionStorage: function() { try { return !!window.sessionStorage; } catch (e) { return true; } }, isCanvasSupported: function() { var elem = document.createElement('canvas'); return !!(elem.getContext && elem.getContext('2d')); }, isIE: function() { if (navigator.appName === 'Microsoft Internet Explorer') { return true; } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) { return true; } return false; }, getPluginsString: function() { if (this.isIE() && this.ie_activex) { return this.getIEPluginsString(); } else { return this.getRegularPluginsString(); } }, getRegularPluginsString: function() { return this.map(navigator.plugins, function(p) { var mimeTypes = this.map(p, function(mt) { return [mt.type, mt.suffixes].join('~'); }).join(','); return [p.name, p.description, mimeTypes].join('::'); }, this).join(';'); }, getIEPluginsString: function() { if (window.ActiveXObject) { var names = ['ShockwaveFlash.ShockwaveFlash', 'AcroPDF.PDF', 'PDF.PdfCtrl', 'QuickTime.QuickTime', 'rmocx.RealPlayer G2 Control', 'rmocx.RealPlayer G2 Control.1', 'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)', 'RealVideo.RealVideo(tm) ActiveX Control (32-bit)', 'RealPlayer', 'SWCtl.SWCtl', 'WMPlayer.OCX', 'AgControl.AgControl', 'Skype.Detection' ]; return this.map(names, function(name) { try { new ActiveXObject(name); return name; } catch (e) { return null; } }).join(';'); } else { return ""; } }, getScreenResolution: function() { var resolution; if (this.screen_orientation) { resolution = (screen.height > screen.width) ? [screen.height, screen.width] : [screen.width, screen.height]; } else { resolution = [screen.height, screen.width]; } return resolution; }, getCanvasFingerprint: function() { var canvas = document.createElement('canvas'); var ctx = canvas.getContext('2d'); var txt = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}|[]\:"<>?;,.'; ctx.textBaseline = "top"; ctx.font = "14px 'Arial'"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#f60"; ctx.fillRect(125, 1, 62, 20); ctx.fillStyle = "#069"; ctx.fillText(txt, 2, 15); ctx.fillStyle = "rgba(102, 204, 0, 0.7)"; ctx.fillText(txt, 4, 17); return canvas.toDataURL(); } }; return Fingerprint;});
        /**************************************************/





        function fingerprint_flash() {
            "use strict";
            var strOnError, objPlayerVersion, strVersion, strOut;

            strOnError = "N/A";
            objPlayerVersion = null;
            strVersion = null;
            strOut = null;

            try {
                objPlayerVersion = swfobject.getFlashPlayerVersion();
                strVersion = objPlayerVersion.major + "." + objPlayerVersion.minor + "." + objPlayerVersion.release;
                if (strVersion === "0.0.0") {
                    strVersion = "N/A";
                }
                strOut = strVersion;
                return strOut;
            } catch (err) {
                return strOnError;
            }
        }


        function fingerprint_browser() {
            "use strict";
            var strOnError, strUserAgent, numVersion, strBrowser, strOut;

            strOnError = "Error";
            strUserAgent = null;
            numVersion = null;
            strBrowser  = null;
            strOut = null;

            try {
                strUserAgent = navigator.userAgent.toLowerCase();
                if (/msie (\d+\.\d+);/.test(strUserAgent)) { //test for MSIE x.x;
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    if (strUserAgent.indexOf("trident/6") > -1) {
                        numVersion = 10;
                    }
                    if (strUserAgent.indexOf("trident/5") > -1) {
                        numVersion = 9;
                    }
                    if (strUserAgent.indexOf("trident/4") > -1) {
                        numVersion = 8;
                    }
                    strBrowser = "Internet Explorer " + numVersion;
                } else if (strUserAgent.indexOf("trident/7") > -1) { //IE 11+ gets rid of the legacy 'MSIE' in the user-agent string;
                    numVersion = 11;
                    strBrowser = "Internet Explorer " + numVersion;
                }  else if (/firefox[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Firefox " + numVersion;
                } else if (/opera[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Opera/x.x or Opera x.x (ignoring remaining decimal places);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Opera " + numVersion;
                } else if (/chrome[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Chrome/x.x or Chrome x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Chrome " + numVersion;
                } else if (/version[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Version/x.x or Version x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Safari " + numVersion;
                } else if (/rv[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for rv/x.x or rv x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Mozilla " + numVersion;
                } else if (/mozilla[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Mozilla/x.x or Mozilla x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Mozilla " + numVersion;
                } else if (/binget[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for BinGet/x.x or BinGet x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (BinGet) " + numVersion;
                } else if (/curl[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Curl/x.x or Curl x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (cURL) " + numVersion;
                } else if (/java[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Java/x.x or Java x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (Java) " + numVersion;
                } else if (/libwww-perl[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for libwww-perl/x.x or libwww-perl x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (libwww-perl) " + numVersion;
                } else if (/microsoft url control -[\s](\d+\.\d+)/.test(strUserAgent)) { //test for Microsoft URL Control - x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (Microsoft URL Control) " + numVersion;
                } else if (/peach[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for Peach/x.x or Peach x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (Peach) " + numVersion;
                } else if (/php[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for PHP/x.x or PHP x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (PHP) " + numVersion;
                } else if (/pxyscand[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for pxyscand/x.x or pxyscand x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (pxyscand) " + numVersion;
                } else if (/pycurl[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for pycurl/x.x or pycurl x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (PycURL) " + numVersion;
                } else if (/python-urllib[\/\s](\d+\.\d+)/.test(strUserAgent)) { //test for python-urllib/x.x or python-urllib x.x (ignoring remaining digits);
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Library (Python URLlib) " + numVersion;
                } else if (/appengine-google/.test(strUserAgent)) { //test for AppEngine-Google;
                    numVersion = Number(RegExp.$1); // capture x.x portion and store as a number
                    strBrowser = "Cloud (Google AppEngine) " + numVersion;
                } else {
                    strBrowser = "Unknown";
                }
                strOut = strBrowser;
                return strOut;
            } catch (err) {
                return strOnError;
            }
        }

        function fingerprint_canvas() {
            "use strict";
            var strOnError, canvas, strCText, strText, strOut;

            strOnError = "Error";
            canvas = null;
            strCText = null;
            strText = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~1!2@3#4$5%6^7&8*9(0)-_=+[{]}|;:',<.>/?";
            strOut = null;

            try {
                canvas = document.createElement('canvas');
                strCText = canvas.getContext('2d');
                strCText.textBaseline = "top";
                strCText.font = "14px 'Arial'";
                strCText.textBaseline = "alphabetic";
                strCText.fillStyle = "#f60";
                strCText.fillRect(125, 1, 62, 20);
                strCText.fillStyle = "#069";
                strCText.fillText(strText, 2, 15);
                strCText.fillStyle = "rgba(102, 204, 0, 0.7)";
                strCText.fillText(strText, 4, 17);
                strOut = canvas.toDataURL();
                return strOut;
            } catch (err) {
                return strOnError;
            }
        }


        function fingerprint_connection() {
            "use strict";
            var strOnError, strConnection, strOut;

            strOnError = "N/A";
            strConnection = null;
            strOut = null;

            try {
                // only on android
                strConnection = navigator.connection.type;
                strOut = strConnection;
            } catch (err) {
                // return N/A if navigator.connection object does not apply to this device
                return strOnError;
            }
            return strOut;
        }


        function fingerprint_cookie() {
            "use strict";
            var strOnError, bolCookieEnabled, bolOut;

            strOnError = "Error";
            bolCookieEnabled = null;
            bolOut = null;

            try {
                bolCookieEnabled = (navigator.cookieEnabled) ? true : false;

                //if not IE4+ nor NS6+
                if (typeof navigator.cookieEnabled === "undefined" && !bolCookieEnabled) {
                    document.cookie = "testcookie";
                    bolCookieEnabled = (document.cookie.indexOf("testcookie") !== -1) ? true : false;
                }
                bolOut = bolCookieEnabled;
                return bolOut;
            } catch (err) {
                return strOnError;
            }
        }



        function fingerprint_display() {
            "use strict";
            var strSep, strPair, strOnError, strScreen, strDisplay, strOut;

            strSep = "|";
            strPair = "=";
            strOnError = "Error";
            strScreen = null;
            strDisplay = null;
            strOut = null;

            try {
                strScreen = window.screen;
                if (strScreen) {
                    strDisplay = strScreen.colorDepth + strSep + strScreen.width + strSep + strScreen.height + strSep + strScreen.availWidth + strSep + strScreen.availHeight;
                }
                strOut = strDisplay;
                return strOut;
            } catch (err) {
                return strOnError;
            }
        }

        function fingerprint_fontsmoothing() {
            "use strict";
            var strOnError, strFontSmoothing, canvasNode, ctx, i, j, imageData, alpha, strOut;

            strOnError = "Unknown";
            strFontSmoothing = null;
            canvasNode = null;
            ctx = null;
            imageData = null;
            alpha = null;
            strOut = null;

            if (typeof(screen.fontSmoothingEnabled) !== "undefined") {
                strFontSmoothing = screen.fontSmoothingEnabled;
            } else {
                try {
                    fontsmoothing = "false";
                    canvasNode = document.createElement('canvas');
                    canvasNode.width = "35";
                    canvasNode.height = "35";
                    canvasNode.style.display = 'none';
                    document.body.appendChild(canvasNode);
                    ctx = canvasNode.getContext('2d');
                    ctx.textBaseline = "top";
                    ctx.font = "32px Arial";
                    ctx.fillStyle = "black";
                    ctx.strokeStyle = "black";
                    ctx.fillText("O", 0, 0);
                    for (j = 8; j <= 32; j = j + 1) {
                        for (i = 1; i <= 32; i = i + 1) {
                            imageData = ctx.getImageData(i, j, 1, 1).data;
                            alpha = imageData[3];
                            if (alpha !== 255 && alpha !== 0) {
                                strFontSmoothing = "true"; // font-smoothing must be on.
                            }
                        }
                    }
                    strOut = strFontSmoothing;
                } catch (err) {
                    return strOnError;
                }
            }
            strOut = strFontSmoothing;
            return strOut;
        }

        function fingerprint_fonts() {
            "use strict";
            var strOnError, style, fonts, count, template, fragment, divs, i, font, div, body, result, e;

            strOnError = "Error";
            style = null;
            fonts = null;
            font = null;
            count = 0;
            template = null;
            divs = null;
            e = null;
            div = null;
            body = null;
            i = 0;

            try {
                style = "position: absolute; visibility: hidden; display: block !important";
                fonts = ["Abadi MT Condensed Light", "Adobe Fangsong Std", "Adobe Hebrew", "Adobe Ming Std", "Agency FB", "Aharoni", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arab", "Arabic Transparent", "Arabic Typesetting", "Arial Baltic", "Arial Black", "Arial CE", "Arial CYR", "Arial Greek", "Arial TUR", "Arial", "Batang", "BatangChe", "Bauhaus 93", "Bell MT", "Bitstream Vera Serif", "Bodoni MT", "Bookman Old Style", "Braggadocio", "Broadway", "Browallia New", "BrowalliaUPC", "Calibri Light", "Calibri", "Californian FB", "Cambria Math", "Cambria", "Candara", "Castellar", "Casual", "Centaur", "Century Gothic", "Chalkduster", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Copperplate Gothic Light", "Corbel", "Cordia New", "CordiaUPC", "Courier New Baltic", "Courier New CE", "Courier New CYR", "Courier New Greek", "Courier New TUR", "Courier New", "DFKai-SB", "DaunPenh", "David", "DejaVu LGC Sans Mono", "Desdemona", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Engravers MT", "Eras Bold ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Eurostile", "FangSong", "Forte", "FrankRuehl", "Franklin Gothic Heavy", "Franklin Gothic Medium", "FreesiaUPC", "French Script MT", "Gabriola", "Gautami", "Georgia", "Gigi", "Gisha", "Goudy Old Style", "Gulim", "GulimChe", "GungSeo", "Gungsuh", "GungsuhChe", "Haettenschweiler", "Harrington", "Hei S", "HeiT", "Heisei Kaku Gothic", "Hiragino Sans GB", "Impact", "Informal Roman", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KacstOne", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "Kino MT", "KodchiangUPC", "Kokila", "Kozuka Gothic Pr6N", "Lao UI", "Latha", "Leelawadee", "Levenim MT", "LilyUPC", "Lohit Gujarati", "Loma", "Lucida Bright", "Lucida Console", "Lucida Fax", "Lucida Sans Unicode", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS UI Gothic", "MV Boli", "Magneto", "Malgun Gothic", "Mangal", "Marlett", "Matura MT Script Capitals", "Meiryo UI", "Meiryo", "Menlo", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Miriam Fixed", "Miriam", "Mongolian Baiti", "MoolBoran", "NSimSun", "Narkisim", "News Gothic MT", "Niagara Solid", "Nyala", "PMingLiU", "PMingLiU-ExtB", "Palace Script MT", "Palatino Linotype", "Papyrus", "Perpetua", "Plantagenet Cherokee", "Playbill", "Prelude Bold", "Prelude Condensed Bold", "Prelude Condensed Medium", "Prelude Medium", "PreludeCompressedWGL Black", "PreludeCompressedWGL Bold", "PreludeCompressedWGL Light", "PreludeCompressedWGL Medium", "PreludeCondensedWGL Black", "PreludeCondensedWGL Bold", "PreludeCondensedWGL Light", "PreludeCondensedWGL Medium", "PreludeWGL Black", "PreludeWGL Bold", "PreludeWGL Light", "PreludeWGL Medium", "Raavi", "Rachana", "Rockwell", "Rod", "Sakkal Majalla", "Sawasdee", "Script MT Bold", "Segoe Print", "Segoe Script", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Segoe UI", "Shonar Bangla", "Showcard Gothic", "Shruti", "SimHei", "SimSun", "SimSun-ExtB", "Simplified Arabic Fixed", "Simplified Arabic", "Snap ITC", "Sylfaen", "Symbol", "Tahoma", "Times New Roman Baltic", "Times New Roman CE", "Times New Roman CYR", "Times New Roman Greek", "Times New Roman TUR", "Times New Roman", "TlwgMono", "Traditional Arabic", "Trebuchet MS", "Tunga", "Tw Cen MT Condensed Extra Bold", "Ubuntu", "Umpush", "Univers", "Utopia", "Utsaah", "Vani", "Verdana", "Vijaya", "Vladimir Script", "Vrinda", "Webdings", "Wide Latin", "Wingdings"];
                count = fonts.length;
                template = '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',sans-serif !important">ww</b>' + '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',monospace !important">ww</b>';
                fragment = document.createDocumentFragment();
                divs = [];
                for (i = 0; i < count; i = i + 1) {
                    font = fonts[i];
                    div = document.createElement('div');
                    font = font.replace(/['"<>]/g, '');
                    div.innerHTML = template.replace(/X/g, font);
                    div.style.cssText = style;
                    fragment.appendChild(div);
                    divs.push(div);
                }
                body = document.body;
                body.insertBefore(fragment, body.firstChild);
                result = [];
                for (i = 0; i < count; i = i + 1) {
                    e = divs[i].getElementsByTagName('b');
                    if (e[0].offsetWidth === e[1].offsetWidth) {
                        result.push(fonts[i]);
                    }
                }
                // do not combine these two loops, remove child will cause reflow
                // and induce severe performance hit
                for (i = 0; i < count; i = i + 1) {
                    body.removeChild(divs[i]);
                }
                return result.join('|');
            } catch (err) {
                return strOnError;
            }
        }

        function fingerprint_formfields() {
            "use strict";
            var i, j, numOfForms, numOfInputs, strFormsInPage, strFormsInputsData, strInputsInForm, strTmp, strOut;

            i = 0;
            j = 0;
            numOfForms = 0;
            numOfInputs = 0;
            strFormsInPage = "";
            strFormsInputsData = [];
            strInputsInForm = "";
            strTmp = "";
            strOut = "";

            strFormsInPage = document.getElementsByTagName('form');
            numOfForms = strFormsInPage.length;
            strFormsInputsData.push("url=" + window.location.href);
            for (i = 0; i < numOfForms; i = i + 1) {
                strFormsInputsData.push("FORM=" + strFormsInPage[i].name);
                strInputsInForm = strFormsInPage[i].getElementsByTagName('input');
                numOfInputs = strInputsInForm.length;
                for (j = 0; j < numOfInputs; j = j + 1) {
                    if (strInputsInForm[j].type !== "hidden") {
                        strFormsInputsData.push("Input=" + strInputsInForm[j].name);
                    }
                }
            }
            strTmp = strFormsInputsData.join("|");
            strOut = strTmp;
            return strOut;
        }

        function fingerprint_java() {
            "use strict";
            var strOnError, strJavaEnabled, strOut;

            strOnError = "Error";
            strJavaEnabled = null;
            strOut = null;

            try {
                if (navigator.javaEnabled()) {
                    strJavaEnabled = "true";
                } else {
                    strJavaEnabled = "false";
                }
                strOut = strJavaEnabled;
                return strOut;
            } catch (err) {
                return strOnError;
            }
        }

        function fingerprint_language() {
            "use strict";
            var strSep, strPair, strOnError, strLang, strTypeLng, strTypeBrLng, strTypeSysLng, strTypeUsrLng, strOut;

            strSep = "|";
            strPair = "=";
            strOnError = "Error";
            strLang = null;
            strTypeLng = null;
            strTypeBrLng = null;
            strTypeSysLng = null;
            strTypeUsrLng = null;
            strOut = null;

            try {
                strTypeLng = typeof (navigator.language);
                strTypeBrLng = typeof (navigator.browserLanguage);
                strTypeSysLng = typeof (navigator.systemLanguage);
                strTypeUsrLng = typeof (navigator.userLanguage);

                if (strTypeLng !== "undefined") {
                    strLang = "lang" + strPair + navigator.language + strSep;
                } else if (strTypeBrLng !== "undefined") {
                    strLang = "lang" + strPair + navigator.browserLanguage + strSep;
                } else {
                    strLang = "lang" + strPair + strSep;
                }
                if (strTypeSysLng !== "undefined") {
                    strLang += "syslang" + strPair + navigator.systemLanguage + strSep;
                } else {
                    strLang += "syslang" + strPair + strSep;
                }
                if (strTypeUsrLng !== "undefined") {
                    strLang += "userlang" + strPair + navigator.userLanguage;
                } else {
                    strLang += "userlang" + strPair;
                }
                strOut = strLang;
                return strOut;
            } catch (err) {
                return strOnError;
            }
        }

        function fingerprint_silverlight() {
            "use strict";
            var strOnError, objControl, objPlugin, strSilverlightVersion, strOut;

            strOnError = "Error";
            objControl = null;
            objPlugin = null;
            strSilverlightVersion = null;
            strOut = null;

            try {
                try {
                    objControl = new ActiveXObject('AgControl.AgControl');
                    if (objControl.IsVersionSupported("5.0")) {
                        strSilverlightVersion = "5.x";
                    } else if (objControl.IsVersionSupported("4.0")) {
                        strSilverlightVersion = "4.x";
                    } else if (objControl.IsVersionSupported("3.0")) {
                        strSilverlightVersion = "3.x";
                    } else if (objControl.IsVersionSupported("2.0")) {
                        strSilverlightVersion = "2.x";
                    } else {
                        strSilverlightVersion = "1.x";
                    }
                    objControl = null;
                } catch (e) {
                    objPlugin = navigator.plugins["Silverlight Plug-In"];
                    if (objPlugin) {
                        if (objPlugin.description === "1.0.30226.2") {
                            strSilverlightVersion = "2.x";
                        } else {
                            strSilverlightVersion = parseInt(objPlugin.description[0], 10);
                        }
                    } else {
                        strSilverlightVersion = "N/A";
                    }
                }
                strOut = strSilverlightVersion;
                return strOut;
            } catch (err) {
                return strOnError;
            }
        }

        function fingerprint_os() {
            "use strict";
            var strSep, strOnError, strUserAgent, strPlatform, strOS, strOSBits, strOut;

            strSep = "|";
            strOnError = "Error";
            strUserAgent = null;
            strPlatform = null;
            strOS = null;
            strOSBits = null;
            strOut = null;

            try {
                /* navigator.userAgent is supported by all major browsers */
                strUserAgent = navigator.userAgent.toLowerCase();
                /* navigator.platform is supported by all major browsers */
                strPlatform = navigator.platform.toLowerCase();
                if (strUserAgent.indexOf("windows nt 6.3") !== -1) {
                    strOS = "Windows 8.1";
                } else if (strUserAgent.indexOf("windows nt 6.2") !== -1) {
                    strOS = "Windows 8";
                } else if (strUserAgent.indexOf("windows nt 6.1") !== -1) {
                    strOS = "Windows 7";
                } else if (strUserAgent.indexOf("windows nt 6.0") !== -1) {
                    strOS = "Windows Vista/Windows Server 2008";
                } else if (strUserAgent.indexOf("windows nt 5.2") !== -1) {
                    strOS = "Windows XP x64/Windows Server 2003";
                } else if (strUserAgent.indexOf("windows nt 5.1") !== -1) {
                    strOS = "Windows XP";
                } else if (strUserAgent.indexOf("windows nt 5.01") !== -1) {
                    strOS = "Windows 2000, Service Pack 1 (SP1)";
                } else if (strUserAgent.indexOf("windows xp") !== -1) {
                    strOS = "Windows XP";
                } else if (strUserAgent.indexOf("windows 2000") !== -1) {
                    strOS = "Windows 2000";
                } else if (strUserAgent.indexOf("windows nt 5.0") !== -1) {
                    strOS = "Windows 2000";
                } else if (strUserAgent.indexOf("windows nt 4.0") !== -1) {
                    strOS = "Windows NT 4.0";
                } else if (strUserAgent.indexOf("windows nt") !== -1) {
                    strOS = "Windows NT 4.0";
                } else if (strUserAgent.indexOf("winnt4.0") !== -1) {
                    strOS = "Windows NT 4.0";
                } else if (strUserAgent.indexOf("winnt") !== -1) {
                    strOS = "Windows NT 4.0";
                } else if (strUserAgent.indexOf("windows me") !== -1) {
                    strOS = "Windows ME";
                } else if (strUserAgent.indexOf("win 9x 4.90") !== -1) {
                    strOS = "Windows ME";
                } else if (strUserAgent.indexOf("windows 98") !== -1) {
                    strOS = "Windows 98";
                } else if (strUserAgent.indexOf("win98") !== -1) {
                    strOS = "Windows 98";
                } else if (strUserAgent.indexOf("windows 95") !== -1) {
                    strOS = "Windows 95";
                } else if (strUserAgent.indexOf("windows_95") !== -1) {
                    strOS = "Windows 95";
                } else if (strUserAgent.indexOf("win95") !== -1) {
                    strOS = "Windows 95";
                } else if (strUserAgent.indexOf("ce") !== -1) {
                    strOS = "Windows CE";
                } else if (strUserAgent.indexOf("win16") !== -1) {
                    strOS = "Windows 3.11";
                } else if (strUserAgent.indexOf("iemobile") !== -1) {
                    strOS = "Windows Mobile";
                } else if (strUserAgent.indexOf("wm5 pie") !== -1) {
                    strOS = "Windows Mobile";
                } else if (strUserAgent.indexOf("windows") !== -1) {
                    strOS = "Windows (Unknown Version)";
                } else if (strUserAgent.indexOf("openbsd") !== -1) {
                    strOS = "Open BSD";
                } else if (strUserAgent.indexOf("sunos") !== -1) {
                    strOS = "Sun OS";
                } else if (strUserAgent.indexOf("ubuntu") !== -1) {
                    strOS = "Ubuntu";
                } else if (strUserAgent.indexOf("ipad") !== -1) {
                    strOS = "iOS (iPad)";
                } else if (strUserAgent.indexOf("ipod") !== -1) {
                    strOS = "iOS (iTouch)";
                } else if (strUserAgent.indexOf("iphone") !== -1) {
                    strOS = "iOS (iPhone)";
                } else if (strUserAgent.indexOf("mac os x beta") !== -1) {
                    strOS = "Mac OSX Beta (Kodiak)";
                } else if (strUserAgent.indexOf("mac os x 10.0") !== -1) {
                    strOS = "Mac OSX Cheetah";
                } else if (strUserAgent.indexOf("mac os x 10.1") !== -1) {
                    strOS = "Mac OSX Puma";
                } else if (strUserAgent.indexOf("mac os x 10.2") !== -1) {
                    strOS = "Mac OSX Jaguar";
                } else if (strUserAgent.indexOf("mac os x 10.3") !== -1) {
                    strOS = "Mac OSX Panther";
                } else if (strUserAgent.indexOf("mac os x 10.4") !== -1) {
                    strOS = "Mac OSX Tiger";
                } else if (strUserAgent.indexOf("mac os x 10.5") !== -1) {
                    strOS = "Mac OSX Leopard";
                } else if (strUserAgent.indexOf("mac os x 10.6") !== -1) {
                    strOS = "Mac OSX Snow Leopard";
                } else if (strUserAgent.indexOf("mac os x 10.7") !== -1) {
                    strOS = "Mac OSX Lion";
                } else if (strUserAgent.indexOf("mac os x") !== -1) {
                    strOS = "Mac OSX (Version Unknown)";
                } else if (strUserAgent.indexOf("mac_68000") !== -1) {
                    strOS = "Mac OS Classic (68000)";
                } else if (strUserAgent.indexOf("68K") !== -1) {
                    strOS = "Mac OS Classic (68000)";
                } else if (strUserAgent.indexOf("mac_powerpc") !== -1) {
                    strOS = "Mac OS Classic (PowerPC)";
                } else if (strUserAgent.indexOf("ppc mac") !== -1) {
                    strOS = "Mac OS Classic (PowerPC)";
                } else if (strUserAgent.indexOf("macintosh") !== -1) {
                    strOS = "Mac OS Classic";
                } else if (strUserAgent.indexOf("googletv") !== -1) {
                    strOS = "Android (GoogleTV)";
                } else if (strUserAgent.indexOf("xoom") !== -1) {
                    strOS = "Android (Xoom)";
                } else if (strUserAgent.indexOf("htc_flyer") !== -1) {
                    strOS = "Android (HTC Flyer)";
                } else if (strUserAgent.indexOf("android") !== -1) {
                    strOS = "Android";
                } else if (strUserAgent.indexOf("symbian") !== -1) {
                    strOS = "Symbian";
                } else if (strUserAgent.indexOf("series60") !== -1) {
                    strOS = "Symbian (Series 60)";
                } else if (strUserAgent.indexOf("series70") !== -1) {
                    strOS = "Symbian (Series 70)";
                } else if (strUserAgent.indexOf("series80") !== -1) {
                    strOS = "Symbian (Series 80)";
                } else if (strUserAgent.indexOf("series90") !== -1) {
                    strOS = "Symbian (Series 90)";
                } else if (strUserAgent.indexOf("x11") !== -1) {
                    strOS = "UNIX";
                } else if (strUserAgent.indexOf("nix") !== -1) {
                    strOS = "UNIX";
                } else if (strUserAgent.indexOf("linux") !== -1) {
                    strOS = "Linux";
                } else if (strUserAgent.indexOf("qnx") !== -1) {
                    strOS = "QNX";
                } else if (strUserAgent.indexOf("os/2") !== -1) {
                    strOS = "IBM OS/2";
                } else if (strUserAgent.indexOf("beos") !== -1) {
                    strOS = "BeOS";
                } else if (strUserAgent.indexOf("blackberry95") !== -1) {
                    strOS = "Blackberry (Storm 1/2)";
                } else if (strUserAgent.indexOf("blackberry97") !== -1) {
                    strOS = "Blackberry (Bold)";
                } else if (strUserAgent.indexOf("blackberry96") !== -1) {
                    strOS = "Blackberry (Tour)";
                } else if (strUserAgent.indexOf("blackberry89") !== -1) {
                    strOS = "Blackberry (Curve 2)";
                } else if (strUserAgent.indexOf("blackberry98") !== -1) {
                    strOS = "Blackberry (Torch)";
                } else if (strUserAgent.indexOf("playbook") !== -1) {
                    strOS = "Blackberry (Playbook)";
                } else if (strUserAgent.indexOf("wnd.rim") !== -1) {
                    strOS = "Blackberry (IE/FF Emulator)";
                } else if (strUserAgent.indexOf("blackberry") !== -1) {
                    strOS = "Blackberry";
                } else if (strUserAgent.indexOf("palm") !== -1) {
                    strOS = "Palm OS";
                } else if (strUserAgent.indexOf("webos") !== -1) {
                    strOS = "WebOS";
                } else if (strUserAgent.indexOf("hpwos") !== -1) {
                    strOS = "WebOS (HP)";
                } else if (strUserAgent.indexOf("blazer") !== -1) {
                    strOS = "Palm OS (Blazer)";
                } else if (strUserAgent.indexOf("xiino") !== -1) {
                    strOS = "Palm OS (Xiino)";
                } else if (strUserAgent.indexOf("kindle") !== -1) {
                    strOS = "Kindle";
                } else if (strUserAgent.indexOf("wii") !== -1) {
                    strOS = "Nintendo (Wii)";
                } else if (strUserAgent.indexOf("nintendo ds") !== -1) {
                    strOS = "Nintendo (DS)";
                } else if (strUserAgent.indexOf("playstation 3") !== -1) {
                    strOS = "Sony (Playstation Console)";
                } else if (strUserAgent.indexOf("playstation portable") !== -1) {
                    strOS = "Sony (Playstation Portable)";
                } else if (strUserAgent.indexOf("webtv") !== -1) {
                    strOS = "MSN TV (WebTV)";
                } else if (strUserAgent.indexOf("inferno") !== -1) {
                    strOS = "Inferno";
                } else {
                    strOS = "Unknown";
                }
                if (strPlatform.indexOf("x64") !== -1) {
                    strOSBits = "64 bits";
                } else if (strPlatform.indexOf("wow64") !== -1) {
                    strOSBits = "64 bits";
                } else if (strPlatform.indexOf("win64") !== -1) {
                    strOSBits = "64 bits";
                } else if (strPlatform.indexOf("win32") !== -1) {
                    strOSBits = "32 bits";
                } else if (strPlatform.indexOf("x64") !== -1) {
                    strOSBits = "64 bits";
                } else if (strPlatform.indexOf("x32") !== -1) {
                    strOSBits = "32 bits";
                } else if (strPlatform.indexOf("x86") !== -1) {
                    strOSBits = "32 bits*";
                } else if (strPlatform.indexOf("ppc") !== -1) {
                    strOSBits = "64 bits";
                } else if (strPlatform.indexOf("alpha") !== -1) {
                    strOSBits = "64 bits";
                } else if (strPlatform.indexOf("68k") !== -1) {
                    strOSBits = "64 bits";
                } else if (strPlatform.indexOf("iphone") !== -1) {
                    strOSBits = "32 bits";
                } else if (strPlatform.indexOf("android") !== -1) {
                    strOSBits = "32 bits";
                } else {
                    strOSBits = "Unknown";
                }
                strOut = strOS + strSep + strOSBits;
                return strOut;
            } catch (err) {
                return strOnError;
            }
        }


        function fingerprint_useragent() {
            "use strict";
            var strSep, strTmp, strUserAgent, strOut;

            strSep = "|";
            strTmp = null;
            strUserAgent = null;
            strOut = null;

            /* navigator.userAgent is supported by all major browsers */
            strUserAgent = navigator.userAgent.toLowerCase();
            /* navigator.platform is supported by all major browsers */
            strTmp = strUserAgent + strSep + navigator.platform;
            /* navigator.cpuClass only supported in IE */
            if (navigator.cpuClass) {
                strTmp += strSep + navigator.cpuClass;
            }
            /* navigator.browserLanguage only supported in IE, Safari and Chrome */
            if (navigator.browserLanguage) {
                strTmp += strSep + navigator.browserLanguage;
            } else {
                strTmp += strSep + navigator.language;
            }
            strOut = strTmp;
            return strOut;
        }

        function fingerprint_timezone() {
            "use strict";
            var strOnError, dtDate, numOffset, numGMTHours, numOut;

            strOnError = "Error";
            dtDate = null;
            numOffset = null;
            numGMTHours = null;
            numOut = null;

            try {
                dtDate = new Date();
                numOffset = dtDate.getTimezoneOffset();
                numGMTHours = (numOffset / 60) * (-1);
                numOut = numGMTHours;
                return numOut;
            } catch (err) {
                return strOnError;
            }
        }


        function fingerprint_touch() {
            "use strict";
            var bolTouchEnabled, bolOut;

            bolTouchEnabled = false;
            bolOut = null;

            try {
                if (document.createEvent("TouchEvent")) {
                    bolTouchEnabled = true;
                }
                bolOut = bolTouchEnabled;
                return bolOut;
            } catch (ignore) {
                bolOut = bolTouchEnabled
                return bolOut;
            }
        }

        function fingerprint_truebrowser() {
            "use strict";
            var strBrowser, strUserAgent, strOut;

            strBrowser = "Unknown";
            strUserAgent = null;
            strOut = null;

            strUserAgent = navigator.userAgent.toLowerCase();

            /* Checks for different browsers, cannot use Try/Catch block */
            if (document.all && document.getElementById && navigator.savePreferences && (strUserAgent.indexOf("Netfront") < 0) && navigator.appName !== "Blazer") {
                strBrowser = "Escape 5";
            } else if (navigator.vendor === "KDE") {
                strBrowser = "Konqueror";
            } else if (document.childNodes && !document.all && !navigator.taintEnabled && !navigator.accentColorName) {
                strBrowser = "Safari";
            } else if (document.childNodes && !document.all && !navigator.taintEnabled && navigator.accentColorName) {
                strBrowser = "OmniWeb 4.5+";
            } else if (navigator.__ice_version) {
                strBrowser = "ICEBrowser";
            } else if (window.ScriptEngine && ScriptEngine().indexOf("InScript") + 1 && document.createElement) {
                strBrowser = "iCab 3+";
            } else if (window.ScriptEngine && ScriptEngine().indexOf("InScript") + 1) {
                strBrowser = "iCab 2-";
            } else if (strUserAgent.indexOf("hotjava") + 1 && (navigator.accentColorName) === "undefined") {
                strBrowser = "HotJava";
            } else if (document.layers && !document.classes) {
                strBrowser = "Omniweb 4.2-";
            } else if (document.layers && !navigator.mimeTypes["*"]) {
                strBrowser = "Escape 4";
            } else if (document.layers) {
                strBrowser = "Netscape 4";
            } else if (window.opera && document.getElementsByClassName) {
                strBrowser = "Opera 9.5+";
            } else if (window.opera && window.getComputedStyle) {
                strBrowser = "Opera 8";
            } else if (window.opera && document.childNodes) {
                strBrowser = "Opera 7";
            } else if (window.opera) {
                strBrowser = "Opera " + window.opera.version();
            } else if (navigator.appName.indexOf("WebTV") + 1) {
                strBrowser = "WebTV";
            } else if (strUserAgent.indexOf("netgem") + 1) {
                strBrowser = "Netgem NetBox";
            } else if (strUserAgent.indexOf("opentv") + 1) {
                strBrowser = "OpenTV";
            } else if (strUserAgent.indexOf("ipanel") + 1) {
                strBrowser = "iPanel MicroBrowser";
            } else if (document.getElementById && !document.childNodes) {
                strBrowser = "Clue browser";
            } else if (navigator.product && navigator.product.indexOf("Hv") === 0) {
                strBrowser = "Tkhtml Hv3+";
            } else if (typeof InstallTrigger !== 'undefined') {
                strBrowser = "Firefox";
            } else if (window.atob) {
                strBrowser = "Internet Explorer 10+";
            } else if (XDomainRequest && window.performance) {
                strBrowser = "Internet Explorer 9";
            } else if (XDomainRequest) {
                strBrowser = "Internet Explorer 8";
            } else if (document.documentElement && document.documentElement.style.maxHeight !== "undefined") {
                strBrowser = "Internet Explorer 7";//xxxxx
            } else if (document.compatMode && document.all) {
                strBrowser = "Internet Explorer 6";//xxxxx
            } else if (window.createPopup) {
                strBrowser = "Internet Explorer 5.5";
            } else if (window.attachEvent) {
                strBrowser = "Internet Explorer 5";
            } else if (document.all && navigator.appName !== "Microsoft Pocket Internet Explorer") {
                strBrowser = "Internet Explorer 4";
            } else if ((strUserAgent.indexOf("msie") + 1) && window.ActiveXObject) {
                strBrowser = "Pocket Internet Explorer";
            } else if (document.getElementById && ((strUserAgent.indexOf("netfront") + 1) || navigator.appName === "Blazer" || navigator.product === "Gecko" || (navigator.appName.indexOf("PSP") + 1) || (navigator.appName.indexOf("PLAYSTATION 3") + 1))) {
                strBrowser = "NetFront 3+";
            } else if (navigator.product === "Gecko" && !navigator.savePreferences) {
                strBrowser = "Gecko engine (Mozilla, Netscape 6+ etc.)";
            } else if (window.chrome) {
                strBrowser = "Chrome";
            }
            strOut = strBrowser;
            return strOut;
        }




        var glbOnError = 'N/A'
        var glbSep = '|';

        function activeXDetect(componentClassID) {
            "use strict";
            var strComponentVersion, strOut;

            strComponentVersion = "";
            strOut = "";

            try {
                strComponentVersion = document.body.getComponentVersion('{' + componentClassID + '}', 'ComponentID');
                if (strComponentVersion !== null) {
                    strOut = strComponentVersion;
                } else {
                    strOut = false;
                }
                return strOut;
            } catch (err) {
                return glbOnError;
            }
        }

        function stripIllegalChars(strValue) {
            "use strict";
            var iCounter, strOriginal, strOut;

            iCounter = 0;
            strOriginal = "";
            strOut = "";

            try {
                strOriginal = strValue.toLowerCase();
                for (iCounter = 0; iCounter < strOriginal.length; iCounter = iCounter + 1) {
                    if (strOriginal.charAt(iCounter) !== '\n' && strOriginal.charAt(iCounter) !== '/' && strOriginal.charAt(iCounter) !== "\\") {
                        strOut = strOut + strOriginal.charAt(iCounter);
                    } else if (strOriginal.charAt(iCounter) === '\n') {
                        strOut = strOut + "n";
                    }
                }
                return strOut;
            } catch (err) {
                return glbOnError;
            }
        }

        function hashtable_containsKey(key) {
            "use strict";
            var bolExists, iCounter;

            bolExists = false;
            iCounter = 0;

            for (iCounter = 0; iCounter < this.hashtable.length; iCounter = iCounter + 1) {
                if (iCounter === key && this.hashtable[iCounter] !== null) {
                    bolExists = true;
                    break;
                }
            }
            return bolExists;
        }

        function hashtable_get(key) {
            "use strict";
            return this.hashtable[key];
        }

        function hashtable_keys() {
            "use strict";
            var keys, iCounter;

            keys = [];
            iCounter = 0;

            for (iCounter in this.hashtable) {
                if (this.hashtable[iCounter] !== null) {
                    keys.push(iCounter);
                }
            }
            return keys;
        }

        function hashtable_put(key, value) {
            "use strict";
            if (key === null || value === null) {
                throw "NullPointerException {" + key + "},{" + value + "}";
            }
            this.hashtable[key] = value;
        }

        function hashtable_size() {
            "use strict";
            var iSize, iCounter, iOut;

            iSize = 0;
            iCounter = 0;
            iOut = 0;

            for (iCounter in this.hashtable) {
                if (this.hashtable[iCounter] !== null) {
                    iSize = iSize + 1;
                }
            }
            iOut = iSize;
            return iOut;
        }

        function Hashtable() {
            "use strict";
            this.containsKey = hashtable_containsKey;
            this.get = hashtable_get;
            this.keys = hashtable_keys;
            this.put = hashtable_put;
            this.size = hashtable_size;
            this.hashtable = [];
        }

        /* Detect Plugins */
        function fingerprint_plugins() {
            "use strict";
            var htIEComponents, strKey, strName, strVersion, strTemp, bolFirst, iCount, strMimeType, strOut;

            try {
                /* Create hashtable of IE components */
                htIEComponents = new Hashtable();
                htIEComponents.put('7790769C-0471-11D2-AF11-00C04FA35D02', 'AddressBook'); // Address Book
                htIEComponents.put('47F67D00-9E55-11D1-BAEF-00C04FC2D130', 'AolArtFormat'); // AOL ART Image Format Support
                htIEComponents.put('76C19B38-F0C8-11CF-87CC-0020AFEECF20', 'ArabicDS'); // Arabic Text Display Support
                htIEComponents.put('76C19B34-F0C8-11CF-87CC-0020AFEECF20', 'ChineseSDS'); // Chinese (Simplified) Text Display Support
                htIEComponents.put('76C19B33-F0C8-11CF-87CC-0020AFEECF20', 'ChineseTDS'); // Chinese (traditional) Text Display Support
                htIEComponents.put('238F6F83-B8B4-11CF-8771-00A024541EE3', 'CitrixICA'); // Citrix ICA Client
                htIEComponents.put('283807B5-2C60-11D0-A31D-00AA00B92C03', 'DirectAnim'); // DirectAnimation
                htIEComponents.put('44BBA848-CC51-11CF-AAFA-00AA00B6015C', 'DirectShow'); // DirectShow
                htIEComponents.put('9381D8F2-0288-11D0-9501-00AA00B911A5', 'DynHTML'); // Dynamic HTML Data Binding
                htIEComponents.put('4F216970-C90C-11D1-B5C7-0000F8051515', 'DynHTML4Java'); // Dynamic HTML Data Binding for Java
                htIEComponents.put('D27CDB6E-AE6D-11CF-96B8-444553540000', 'Flash'); // Macromedia Flash
                htIEComponents.put('76C19B36-F0C8-11CF-87CC-0020AFEECF20', 'HebrewDS'); // Hebrew Text Display Support
                htIEComponents.put('630B1DA0-B465-11D1-9948-00C04F98BBC9', 'IEBrwEnh'); // Internet Explorer Browsing Enhancements
                htIEComponents.put('08B0E5C0-4FCB-11CF-AAA5-00401C608555', 'IEClass4Java'); // Internet Explorer Classes for Java
                htIEComponents.put('45EA75A0-A269-11D1-B5BF-0000F8051515', 'IEHelp'); // Internet Explorer Help
                htIEComponents.put('DE5AED00-A4BF-11D1-9948-00C04F98BBC9', 'IEHelpEng'); // Internet Explorer Help Engine
                htIEComponents.put('89820200-ECBD-11CF-8B85-00AA005B4383', 'IE5WebBrw'); // Internet Explorer 5/6 Web Browser
                htIEComponents.put('5A8D6EE0-3E18-11D0-821E-444553540000', 'InetConnectionWiz'); // Internet Connection Wizard
                htIEComponents.put('76C19B30-F0C8-11CF-87CC-0020AFEECF20', 'JapaneseDS'); // Japanese Text Display Support
                htIEComponents.put('76C19B31-F0C8-11CF-87CC-0020AFEECF20', 'KoreanDS'); // Korean Text Display Support
                htIEComponents.put('76C19B50-F0C8-11CF-87CC-0020AFEECF20', 'LanguageAS'); // Language Auto-Selection
                htIEComponents.put('08B0E5C0-4FCB-11CF-AAA5-00401C608500', 'MsftVM'); // Microsoft virtual machine
                htIEComponents.put('5945C046-LE7D-LLDL-BC44-00C04FD912BE', 'MSNMessengerSrv'); // MSN Messenger Service
                htIEComponents.put('44BBA842-CC51-11CF-AAFA-00AA00B6015B', 'NetMeetingNT'); // NetMeeting NT
                htIEComponents.put('3AF36230-A269-11D1-B5BF-0000F8051515', 'OfflineBrwPack'); // Offline Browsing Pack
                htIEComponents.put('44BBA840-CC51-11CF-AAFA-00AA00B6015C', 'OutlookExpress'); // Outlook Express
                htIEComponents.put('76C19B32-F0C8-11CF-87CC-0020AFEECF20', 'PanEuropeanDS'); // Pan-European Text Display Support
                htIEComponents.put('4063BE15-3B08-470D-A0D5-B37161CFFD69', 'QuickTime'); // Apple Quick Time
                htIEComponents.put('DE4AF3B0-F4D4-11D3-B41A-0050DA2E6C21', 'QuickTimeCheck'); // Apple Quick Time Check
                htIEComponents.put('3049C3E9-B461-4BC5-8870-4C09146192CA', 'RealPlayer'); // RealPlayer Download and Record Plugin for IE
                htIEComponents.put('2A202491-F00D-11CF-87CC-0020AFEECF20', 'ShockwaveDir'); // Macromedia Shockwave Director
                htIEComponents.put('3E01D8E0-A72B-4C9F-99BD-8A6E7B97A48D', 'Skype'); // Skype
                htIEComponents.put('CC2A9BA0-3BDD-11D0-821E-444553540000', 'TaskScheduler'); // Task Scheduler
                htIEComponents.put('76C19B35-F0C8-11CF-87CC-0020AFEECF20', 'ThaiDS'); // Thai Text Display Support
                htIEComponents.put('3BF42070-B3B1-11D1-B5C5-0000F8051515', 'Uniscribe'); // Uniscribe
                htIEComponents.put('4F645220-306D-11D2-995D-00C04F98BBC9', 'VBScripting'); // Visual Basic Scripting Support v5.6
                htIEComponents.put('76C19B37-F0C8-11CF-87CC-0020AFEECF20', 'VietnameseDS'); // Vietnamese Text Display Support
                htIEComponents.put('10072CEC-8CC1-11D1-986E-00A0C955B42F', 'VML'); // Vector Graphics Rendering (VML)
                htIEComponents.put('90E2BA2E-DD1B-4CDE-9134-7A8B86D33CA7', 'WebEx'); // WebEx Productivity Tools
                htIEComponents.put('73FA19D0-2D75-11D2-995D-00C04F98BBC9', 'WebFolders'); // Web Folders
                htIEComponents.put('89820200-ECBD-11CF-8B85-00AA005B4340', 'WinDesktopUpdateNT'); // Windows Desktop Update NT
                htIEComponents.put('9030D464-4C02-4ABF-8ECC-5164760863C6', 'WinLive'); // Windows Live ID Sign-in Helper
                htIEComponents.put('6BF52A52-394A-11D3-B153-00C04F79FAA6', 'WinMediaPlayer'); // Windows Media Player (Versions 7, 8 or 9)
                htIEComponents.put('22D6F312-B0F6-11D0-94AB-0080C74C7E95', 'WinMediaPlayerTrad'); // Windows Media Player (Traditional Versions)

                strTemp = "";
                bolFirst = true;

                /* strOpera gives full path of the file, extract the filenames, ignoring description and length */
                if (navigator.plugins.length > 0) {
                    for (iCount = 0; iCount < navigator.plugins.length; iCount = iCount + 1) {
                        if (bolFirst === true) {
                            strTemp += navigator.plugins[iCount].name;
                            bolFirst = false;
                        } else {
                            strTemp += glbSep + navigator.plugins[iCount].name;
                        }
                    }
                } else if (navigator.mimeTypes.length > 0) {
                    strMimeType = navigator.mimeTypes;
                    for (iCount = 0; iCount < strMimeType.length; iCount = iCount + 1) {
                        if (bolFirst === true) {
                            strTemp += strMimeType[iCount].description;
                            bolFirst = false;
                        } else {
                            strTemp += glbSep + strMimeType[iCount].description;
                        }
                    }
                } else {
                    document.body.addBehavior("#default#clientCaps");
                    strKey = htIEComponents.keys();
                    for (iCount = 0; iCount < htIEComponents.size(); iCount = iCount + 1) {
                        strVersion = activeXDetect(strKey[iCount]);
                        strName = htIEComponents.get(strKey[iCount]);
                        if (strVersion) {
                            if (bolFirst === true) {
                                strTemp = strName + glbPair + strVersion;
                                bolFirst = false;
                            } else {
                                strTemp += glbSep + strName + glbPair + strVersion;
                            }
                        }
                    }
                    strTemp = strTemp.replace(/,/g, ".");
                }
                strTemp = stripIllegalChars(strTemp);
                if (strTemp === "") {
                    strTemp = "None";
                }
                strOut = strTemp;
                return strOut;
            } catch (err) {
                return glbOnError;
            }
        }







        var fp = new this.Fingerprint({
            canvas: true,
            ie_activex: true,
            screen_resolution: true
        });

        var uid = fp.get();


        return uid;


    }


    // define your namespace myApp
    // window.document.addEventListener('DOMContentLoaded', function(){

    //     var adzap = new AdzapApp();
        
    //     adzap.doSessionStorage();
    //     adzap.doCookieStorage();
    //     adzap.fingerPrintGenerate();
        
    // });
    !function(t){"use strict";if(!t.fetch){var s={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(s.arrayBuffer)var e=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],r=function(t){return t&&DataView.prototype.isPrototypeOf(t)},o=ArrayBuffer.isView||function(t){return t&&-1<e.indexOf(Object.prototype.toString.call(t))};f.prototype.append=function(t,e){t=a(t),e=h(e);var r=this.map[t];this.map[t]=r?r+","+e:e},f.prototype.delete=function(t){delete this.map[a(t)]},f.prototype.get=function(t){return t=a(t),this.has(t)?this.map[t]:null},f.prototype.has=function(t){return this.map.hasOwnProperty(a(t))},f.prototype.set=function(t,e){this.map[a(t)]=h(e)},f.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},f.prototype.keys=function(){var r=[];return this.forEach(function(t,e){r.push(e)}),u(r)},f.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),u(e)},f.prototype.entries=function(){var r=[];return this.forEach(function(t,e){r.push([e,t])}),u(r)},s.iterable&&(f.prototype[Symbol.iterator]=f.prototype.entries);var i=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];b.prototype.clone=function(){return new b(this,{body:this._bodyInit})},c.call(b.prototype),c.call(w.prototype),w.prototype.clone=function(){return new w(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new f(this.headers),url:this.url})},w.error=function(){var t=new w(null,{status:0,statusText:""});return t.type="error",t};var n=[301,302,303,307,308];w.redirect=function(t,e){if(-1===n.indexOf(e))throw new RangeError("Invalid status code");return new w(null,{status:e,headers:{location:t}})},t.Headers=f,t.Request=b,t.Response=w,t.fetch=function(r,n){return new Promise(function(o,t){var e=new b(r,n),i=new XMLHttpRequest;i.onload=function(){var t,n,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",n=new f,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var e=t.split(":"),r=e.shift().trim();if(r){var o=e.join(":").trim();n.append(r,o)}}),n)};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var r="response"in i?i.response:i.responseText;o(new w(r,e))},i.onerror=function(){t(new TypeError("Network request failed"))},i.ontimeout=function(){t(new TypeError("Network request failed"))},i.open(e.method,e.url,!0),"include"===e.credentials?i.withCredentials=!0:"omit"===e.credentials&&(i.withCredentials=!1),"responseType"in i&&s.blob&&(i.responseType="blob"),e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})},t.fetch.polyfill=!0}function a(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function h(t){return"string"!=typeof t&&(t=String(t)),t}function u(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return s.iterable&&(t[Symbol.iterator]=function(){return t}),t}function f(e){this.map={},e instanceof f?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function d(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function y(r){return new Promise(function(t,e){r.onload=function(){t(r.result)},r.onerror=function(){e(r.error)}})}function l(t){var e=new FileReader,r=y(e);return e.readAsArrayBuffer(t),r}function p(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function c(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t)if("string"==typeof t)this._bodyText=t;else if(s.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(s.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(s.arrayBuffer&&s.blob&&r(t))this._bodyArrayBuffer=p(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!s.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!o(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=p(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):s.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},s.blob&&(this.blob=function(){var t=d(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?d(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(l)}),this.text=function(){var t,e,r,o=d(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=y(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s.formData&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}function b(t,e){var r,o,n=(e=e||{}).body;if(t instanceof b){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new f(t.headers)),this.method=t.method,this.mode=t.mode,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new f(e.headers)),this.method=(r=e.method||this.method||"GET",o=r.toUpperCase(),-1<i.indexOf(o)?o:r),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function m(t){var n=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),r=e.shift().replace(/\+/g," "),o=e.join("=").replace(/\+/g," ");n.append(decodeURIComponent(r),decodeURIComponent(o))}}),n}function w(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new f(e.headers),this.url=e.url||"",this._initBody(t)}}("undefined"!=typeof self?self:this);

    //polyfill for browser type and version
    navigator.browserInfo= (function(){
        var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    })();

    var adzap = new AdzapApp();

    adzap.doSessionStorage();
    adzap.doCookieStorage();
    adzap.fingerPrintGenerate();
    adzap.redirect();

})(window, undefined);
