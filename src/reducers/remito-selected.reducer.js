import _ from 'lodash';

const remitoSelectedReducer = (state = {}, action) => {
    switch (action.type) {
        case 'remito_selected':
            return { ...state, [action.payload._id]: action.payload };
        case 'remito_unselected':
            return _.omit(state, action.payload._id);
        case 'unselect_all':
            return {};
        default:
            return state;
    }
};

export default remitoSelectedReducer;