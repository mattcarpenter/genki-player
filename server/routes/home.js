
'use strict'

export default {
    method: 'GET',
    path: '/',
    config: {
        handler: (request, reply) => {
            reply.file('templates/index.html');
        }
    }
}
