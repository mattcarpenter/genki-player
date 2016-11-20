
'use strict'

export default {
    method: 'GET',
    path: '/recording/{id}',
    config: {
        handler: (request, reply) => {
            reply.file('templates/index.html');
        }
    }
}
