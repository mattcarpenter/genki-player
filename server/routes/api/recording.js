
'use strict'

import { getRecording } from '../../lib/dao'
import Joi from 'joi'
import Boom from 'boom'

export default {
    method: 'GET',
    path: '/api/recording/{id}',
    config: {
        validate: {
            params: {
                id: Joi.string().min(24).max(24)
            }
        },
        handler: (request, reply) => {
            getRecording(request.params.id)
                .then((doc) => {
                    if (doc) {
                        reply(doc);
                    } else {
                        reply(Boom.notFound('could not find reading'))
                    }
                })
                .catch((err) => {
                    reply(Boom.wrap(err, 400))
                })
        }
    }
}
