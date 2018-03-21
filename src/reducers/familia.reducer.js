const familiaReducer = (state = [], action) => {
    switch(action.type) {
        case 'familias_list':
            return action.payload.familias;
        default:
            return state;
    }
};

export default familiaReducer;