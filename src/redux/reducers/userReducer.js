const currentUser = (state = {}, action) => {
    console.log('== reducers userReducer.js ===');
    console.log('action.type: ', action.type);
    console.log('action.user: ', action.user);
    switch (action.type) {
        case "LOG_IN":
            return {
                ...state,
                user: action.user,
                login: true
            };
        case "LOG_OUT":
            return {
                ...state,
                user: "",
                login: false
            }
        default:
            return state;
    }
};
export default currentUser;
