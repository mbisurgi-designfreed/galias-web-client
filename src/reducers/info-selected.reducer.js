import _ from 'lodash';

const InfoSelectedReducer = (state = {}, action) => {
    switch (action.type) {
        case 'info_selected':
            return { ...state, [action.payload._id]: action.payload };
        case 'info_unselected':
            return _.omit(state, action.payload._id);
        case 'unselect_all':
            return {};
        default:
            return state;
    }
};

export default InfoSelectedReducer;