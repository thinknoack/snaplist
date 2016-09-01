import request     from 'superagent';
import config      from '../../../config';

/**
 * Request
 *
 * A wrapper for the superagent request library.
 * Provides a place for global request settings
 * and response handling.
 */
var Request = {

    get (url, options, callback) {
        handleRequest(url, options, function (url, options) {
            request.get(url)
                .set(options.headers)
                .query(options.query)
                .end(function (err, res) {
                    handleResponse(err, res, callback);
                });
        });
    },
    post (url, options, callback) {
        handleRequest(url, options, function (url, options) {
            request.post(url)
                .set(options.headers)
                .query(options.query)
                .send(options.body)
                .end(function (err, res) {
                    handleResponse(err, res, callback);
                });
        });
    },

    put (url, options, callback) {
        handleRequest(url, options, function (url, options) {
            request.put(url)
                .set(options.headers)
                .query(options.query)
                .send(options.body)
                .end(function (err, res) {
                    handleResponse(err, res, callback);
                });
        });
    },

    del (url, callback) {
        handleRequest(url, {}, function (url, options) {
            request.del(url)
                .set(options.headers)
                .query(options.query)
                .end(function (err, res) {
                    handleResponse(err, res, callback);
                });
        });
    },

};


/**
 * Handle Request
 *
 * A generic request handler used to intercept
 * requests before they request out.
 */

function handleRequest (url, options, callback) {
    options = normalizeOptions(options);
    callback(url, options);
}


/**
 * Handle Response
 *
 * A generic response handler used to intercept
 * responses before returning them to the main
 * callback.
 */
function handleResponse (err, res, callback) {
    callback(err, res);
}



/**
 * Normalize Options
 *
 * Takes a request options object and
 * normalizes it so requests won't fail.
 */
function normalizeOptions (options) {
    if (!options.headers) {options.headers = {};}
    if (!options.query)   {options.query   = {};}
    return options;
}


export default Request;

