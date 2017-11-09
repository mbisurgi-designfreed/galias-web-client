import _ from 'lodash';

const InfoReducer = (state = { notifications: 0 }, action) => {
    switch (action.type) {
        case 'info_loading':
            return { ...state, loading: true };
        case 'info_notification':
            return { ...state, notifications: action.payload };
        case 'info_notification_reset':
            return { ...state, notifications: 0 };
        case 'info_list':
            return { ...state, infos: _.mapKeys(action.payload, '_id'), loading: false };
        default:
            return state;
    }
}

export default InfoReducer;