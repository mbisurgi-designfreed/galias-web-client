import _ from 'lodash';

const InfoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'info_loading':
            return { ...state, loading: true };
        case 'info_list_last':
            return { ...state, infos: _.mapKeys(action.payload, '_id'), loading: false };
        default:
            return state;
    };
}

export default InfoReducer;