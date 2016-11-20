var exec = require('child_process').exec;
var items = require('./items.js');
var https = require('https');
var url = require('url')
var fs = require('fs');

// auth.json: { username: '', password: '' }
var auth = require('./auth.json');
var authStr = 'Basic ' + new Buffer(auth.username + ':' +auth.password).toString('base64');

output = [];

items.forEach(function (item) {
  var root = '/Users/matt/Desktop/genki/';
  var cmd = 'curl -X POST -H "Authorization: ' + authStr + '" -H "Content-Type: audio/flac" -H "Cache-Control: no-cache" -H "Postman-Token: a58b007a-ca28-82b5-b314-30a73f65adb9" "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?timestamps=true&word_alternatives_threshold=0.9&continuous=true&model=ja-JP_BroadbandModel" --data-binary @' + root + item.filename.replace('mp3', 'flac') + ' > ' + item.filename.replace('mp3', 'json');
  
  console.log(cmd);

  /*exec(cmd,
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    });
  */

  output.push(cmd);

});

fs.writeFileSync('watson.sh', output.join('\n'));
