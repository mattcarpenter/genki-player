
'use strict'

import { getRecording } from '../../lib/dao'
import { furiganize, invert } from '../../lib/convert'
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
                        doc.phrases.forEach(function (phrase) {
                            // Furiganize the whole transcript
                            phrase.furiganized = furiganize(phrase.transcript)

                            // Invert each word
                            phrase.words.forEach(function (word) {
                                word.inverted = invert(word.word)
                            });
                        })
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
