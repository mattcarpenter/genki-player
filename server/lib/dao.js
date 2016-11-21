 
 'use strict'

import { MongoClient, ObjectID } from 'mongodb'
import process from 'process'

var MONGO_HOST = process.env.MONGO_HOST || 'localhost'
var recordings

// Establish connection to MongoDB
MongoClient.connect('mongodb://' + MONGO_HOST + ':27017/genki', (err, db) => {
    if (!err) {
        console.log('Successfully connected to MongoDB')
        recordings = db.collection('recordings');
    } else {
        console.log('Could not connect to MongoDB')
    }
});

/**
 * Gets a recording by id
 * @param {string} id
 * @returns {promise}
 */
export function getRecording(id) {
    return new Promise((resolve, reject) => {
        recordings.findOne({ _id: new ObjectID(id) })
            .then((doc) => {
                resolve(doc)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * Gets multiple recordings
 * @param {array} ids
 * @returns {promise}
 */
export function getRecordings(ids) {
    return new Promise((resolve, reject) => {
        recordings.find({ _id: { '$in': ids.map((id) => new ObjectID(id)) || [] } })
            .toArray()
            .then((docs) => {
                resolve(docs)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * Gets all recordings
 * @returns {promise}
 */
export function getAllRecordings() {
    return new Promise((resolve, reject) => {
        recordings.find({})
            .toArray()
            .then((docs) => {
                resolve(docs)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
