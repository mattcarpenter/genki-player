
'use strict'

var fs = require('fs');

export default {
    method: 'GET',
    path: '/recording/{id}',
    config: {
        handler: (request, reply) => {
            var html = fs.readFileSync('templates/index.html').toString();
        	reply(html.replace('%%RECORDINGS%%', 'null'));
        }
    }
}
