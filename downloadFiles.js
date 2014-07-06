// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// App variables
var DOWNLOAD_DIR = 'downloads';
var mkdir = 'mkdir ' + DOWNLOAD_DIR;
console.log(mkdir);

var zeroPad = function (num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if( num < 0 ) {
        zeroString = '-' + zeroString;
    }

    return zeroString+n;
};

var imgUrl;

for (i = 1; i <= 2; i++) { 
    console.log('downloading');
    imgUrl = "http://svr12.labprints.com/storefront_images1/32732/593737/zoom/Ghosh" + zeroPad(i,3) + ".jpg";

    // We will be downloading the files to a directory, so make sure it's there
    // This step is not required if you have manually created the directory
    // Function to download file using HTTP.get
    var download_file_httpget = function(imgUrl) {
    var options = {
        host: url.parse(imgUrl).host,
        port: 80,
        path: url.parse(imgUrl).pathname
    };
};

    console.log('downloading');
    download_file_httpget(imgUrl);
    console.log('downloaded');

    var file_name = url.parse(imgUrl).pathname.split('/').pop();
    var file = fs.createWriteStream(DOWNLOAD_DIR + '/' + file_name);
    console.log(file_name);

    http.get(options, function(res) {
        res.on('data', function(data) {
                file.write(data);
            }).on('end', function() {
                file.end();
                console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
            });
        });
    };
}