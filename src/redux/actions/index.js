/**
 * save user_object
 * @param {object} user_object 
 * @return {{type: string, user_obejct}}
 */
export function saveUserObject(user_object) {
    return {type: "SAVE_USER_OBJECT", user_object};
}

