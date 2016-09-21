import request from './request';
import config from '../../../config';


export default {


// Lists

    getLists (callback) {
        request.get(config.listsnap.url + 'lists', {}, callback);
    },

    getParent (parent_id, callback) {
        request.get(config.listsnap.url + 'parent' + '/' + parent_id, {}, callback);
    },

    addList (listData, callback) {
        request.post(config.listsnap.url + 'lists', {body: listData}, callback);
    },

    editList (listname, list_id, callback) {
        request.put(config.listsnap.url + 'lists' + '/' + list_id, {body: listname}, callback);
    },

    deleteList (list_id, callback, options) {
        options = options ? options : {};
        request.del(config.listsnap.url + 'lists' + '/' + list_id + '?purge=true', options, callback);
    },


// individual snaps
    getSnaps (parent_id, callback) {
        request.get(config.listsnap.url + 'snaps' + '/' + parent_id , {}, callback);
    },

    addSnap (snapData, callback) {
        request.post(config.listsnap.url + 'snaps', {body: snapData}, callback);
    },

    editSnap (snapData, snap_id, callback) {
        request.put(config.listsnap.url + 'snaps' + '/' + snap_id, {body: snapData}, callback);
    },

    deleteSnap (snap_id, callback, options) {
        options = options ? options : {};
        request.del(config.listsnap.url + 'snaps' + '/' + snap_id + '?purge=true', options, callback);
    }
}





