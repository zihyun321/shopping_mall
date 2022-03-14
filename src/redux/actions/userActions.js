const loginUser = user => {
    return {type: "LOG_IN", user};
};
const logoutUser = () => {
    return {type: "LOG_OUT"};
};
export default {loginUser, logoutUser};
