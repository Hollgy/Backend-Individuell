

function isValidUser(u) {
    if ((typeof u) !== 'object') {
        return false
    } else if (u === null) {
        return false
    }

    let usernameIsValid = (typeof u.username) === 'string'
    usernameIsValid = usernameIsValid && u.name !== ''

    let passwordIsValid = (typeof u.password) === 'string'
    passwordIsValid = passwordIsValid && u.password !== ''


    if (!usernameIsValid || !passwordIsValid) {
        return false
    }
    return true

}
function isValidChannel(c) {

    if ((typeof c) !== 'object') {
        return false
    } else if (c === null) {
        return false
    }

    let channelNameIsValid = (typeof c.name) === 'string'
    channelNameIsValid = channelNameIsValid && c.name !== ''


    if (!channelNameIsValid) {
        return false
    }
    return true

}


export { isValidUser, isValidChannel }