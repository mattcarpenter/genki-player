from flask import Flask, render_template
from flask_restful import Api
from flask_restful_swagger import swagger
from .resources.search import SearchResource
from .resources.recording import RecordingResource

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)
api = swagger.docs(Api(app), apiVersion='0.1')

api.add_resource(SearchResource, '/search')
api.add_resource(RecordingResource, '/recording')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/recording/<string:recording_id>')
def recording(recording_id):
    return render_template('index.html')

