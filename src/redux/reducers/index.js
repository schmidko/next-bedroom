const initialState = {
    user_object: {}
};

/**
 * Reducer for Redux
 * @param {*} state 
 * @param {*} action 
 * @return {object} state
 */
function rootReducer(state = initialState, action) {

    switch (action.type) {
    case "SAVE_USER_OBJECT":
        return Object.assign({}, state, {
            user_object: action.user_object
        });
    }
    return state;
}
export default rootReducer;
