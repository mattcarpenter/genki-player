
'use strict'

import { getAllRecordings } from '../../lib/dao'
import { furiganize, invert } from '../../lib/convert'
import Joi from 'joi'
import Boom from 'boom'

export default {
    method: 'GET',
    path: '/api/recording/',
    config: {
        handler: (request, reply) => {
            getAllRecordings(request.params.id)
                .then((docs) => {
                    reply(docs);
                })
                .catch((err) => {
                    reply(Boom.wrap(err, 400))
                })
        }
    }
}
