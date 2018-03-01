const alertReducer = (state = {}, action) => {
    switch (action.type) {
        case 'add_alert':
            return { alert: action.payload };
        case 'remove_alert':
            return { alert: null }; 
        default:
            return state;
    };
};

export default alertReducer;