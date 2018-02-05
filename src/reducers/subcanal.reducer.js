const SubcanalReducer = (state = [], action) => {
    switch(action.type) {
        case 'subcanales_list':
            return action.payload.subcanales;
        default:
            return state;
    }
};

export default SubcanalReducer;