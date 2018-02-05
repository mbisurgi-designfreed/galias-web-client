const CanalReducer = (state = [], action) => {
    switch(action.type) {
        case 'canales_list':
            return action.payload.canales;
        default:
            return state;
    }
};

export default CanalReducer;