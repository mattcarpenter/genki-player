
'use strict'

var fs = require('fs');

export default {
    method: 'GET',
    path: '/',
    config: {
        handler: (request, reply) => {
        	var html = fs.readFileSync('templates/index.html').toString();
        	request.server.inject('/api/recording/', (res) => {
        		html = html.replace('%%RECORDINGS%%', res.raw.res.output[1].toString());
        		reply(html);
        	});
        }
    }
}
