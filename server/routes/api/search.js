
'use strict'

import { Client } from 'elasticsearch'
import { getRecordings } from '../../lib/dao'
import Boom from 'boom'

const client = new Client({
  host: 'localhost:9200',
  log: 'trace'
});

export default {
    method: 'GET',
    path: '/api/search',
    config: {
        handler: (request, reply) => {
            let query = request.query.q;

            client.search({
            	index: 'genki',
            	body: {
            		query: {
            			match_phrase: {
            				inverted: query
            			}
            		}
            	}
            }).then((resp) => {
            	if (resp && resp.hits) {
            		var out = []
            		var ids = {}

            		resp.hits.hits.forEach((hit) => {
            			ids[hit._source.refId] = 1;
            		})

            		getRecordings(Object.keys(ids))
            			.then((docs) => {
            				reply(docs)
            			}).catch((err) => {
            				reply(Boom.wrap(err, 400))
            			})

            	} else {
            		reply([])
            	}
            }, (err) => {
            	reply(Boom.wrap(err, 400))
            })
        }
    }
}
