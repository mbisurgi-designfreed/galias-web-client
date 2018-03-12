const SubgrupoReducer = (state = [], action) => {
    switch(action.type) {
        case 'subgrupos_list':
            return action.payload.subgrupos;
        default:
            return state;
    }
};

export default SubgrupoReducer;