from flask_restful import Resource, Api
from flask_restful_swagger import swagger
from elasticsearch import Elasticsearch
from flask import request, Response
from bson.json_util import dumps
from bson.objectid import ObjectId

es = Elasticsearch()
from pymongo import MongoClient
mongo_client = MongoClient()
db = mongo_client['genki']

class SearchResource(Resource):
    "Search Indexed Recordings"
    @swagger.operation(
        notes='Searches indexed recordings',
        nickname='search',
        parameters=[
            {
                'name': 'query',
                'description': 'search query',
                'type': 'string',
                'paramType': 'query'

            }
        ],
        responseMessages=[
            {
                'code': 200,
                'message': 'success'
            }
        ]
    )
    def get(self):
        result = es.search(
            index='genki',
            body={'query': { 'match_phrase': { 'inverted': request.args['query'] }}}
        )

        recordings = set()

        try:
            hits = result['hits']['hits']
        except:
            hits = []

        # de-dupe recordings
        for hit in hits:
            recordings.add(ObjectId(hit['_source']['refId']))

        results = db['recordings'].find({'_id': { '$in': list(recordings)}}, { 'phrases': 0})

        return Response(dumps(results), mimetype='application/json')