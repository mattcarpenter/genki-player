#!/usr/bin/python

import sys
from pymongo import MongoClient
from elasticsearch import Elasticsearch
from bson import json_util

mongo_client = MongoClient()
db = mongo_client['genki']
es = Elasticsearch()

def main(argv):
    # Re-indexes the recordings in Elasticsearch
    print('Indexing in Elasticsearch')

    try:
        es.indices.delete(index='genki')
    except:
        print('genki index does not exist. we\'ll create one for you...')

    for recording in db.recordings.find():
        phrases = recording['phrases']

        for index, phrase in enumerate(phrases):
            doc = {
                'refId': str(recording['_id']),
                'phraseIndex': index,
                'original': phrase['transcript'],
                'inverted': phrase['invertedTranscript']
            }
            es_response = es.index(index='genki', doc_type='phrase', body=doc)
            print(es_response)

    print('Complete.')

if __name__ == '__main__':
    main(sys.argv[1:])
