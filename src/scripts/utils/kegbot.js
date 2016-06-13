import request from './request';
import config from '../../../config';


export default {

	getTaps (callback) {
        request.get(config.kegbot.url + 'taps', {}, callback);
    }

}





