
'use strict'

export default {
    method: 'GET',
    path: '/{params*}',
    config: {
        handler: (request, reply) => {
            reply.file('templates/index.html');
        }
    }
}
