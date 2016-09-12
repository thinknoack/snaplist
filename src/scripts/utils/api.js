import request from './request';
import config from '../../../config';


export default {

	getSnaps (callback) {
        request.get(config.listsnap.url + 'snaps', {}, callback);
    },

    addSnap (snapData, callback) {
        request.post(config.listsnap.url + 'snaps', {body: snapData}, callback);
    },

    removeSnap (snapId, callback, options) {
        options = options ? options : {};
        request.del(config.listsnap.url + 'snaps' + '/' + snapId + '?purge=true', options, callback);
    },


}





