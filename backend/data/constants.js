

function isValidUser(u) {

    if ((typeof u) !== 'object') {
        return false
    } else if (u === null) {
        return false
    }

    let usernameIsValid = (typeof u.name) === 'string'
    usernameIsValid = usernameIsValid && u.name !== ''

    let passwordIsValid = (typeof u.password) === 'string'
    passwordIsValid = passwordIsValid && u.password !== ''


    if (!usernameIsValid || !passwordIsValid) {
        return false
    }
    return true

}


export default isValidUser