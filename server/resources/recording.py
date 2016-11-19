from flask_restful import Resource, Api
from flask_restful_swagger import swagger
from elasticsearch import Elasticsearch
from flask import request, Response
from bson.json_util import dumps
from bson.objectid import ObjectId

from pymongo import MongoClient
mongo_client = MongoClient()
db = mongo_client['genki']

class RecordingResource(Resource):
    "Returns a Recording resource"
    @swagger.operation(
        notes='Returns a Recording resource',
        nickname='video',
        parameters=[
            {
                'name': 'recordingId',
                'description': 'Recording id',
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
        result = db['recordings'].find_one({ '_id': ObjectId(request.args['recordingId']) });
        return Response(dumps(result), mimetype='application/json')
