const Hapi = require('hapi');
const Inert = require('inert');
const Lout = require('lout');
const Vision = require('vision');
import * as routes from './routes'
import Path from 'path'

const config = {
    debug: {
        request: ['error']
    }
}

const server = new Hapi.Server(config);

const port = 3000;
const host = '0.0.0.0';

server.connection({ port: port, host: host });

const loutRegister = {
    register: Lout,
    options: { endpoint: '/docs' }
};

server.register([Vision, Inert, loutRegister], function(err) {

    if (err) {
        console.error('Failed loading plugins');
        process.exit(1);
    }

    Object.keys(routes).forEach((key) => server.route(routes[key]));

    server.route({
        method: 'GET',
        path: '/js/{file*}',
        handler: {
            directory: {
                path: 'public/js'
            }
        }
    })
    
    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});