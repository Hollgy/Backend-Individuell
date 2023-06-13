import { atom } from "recoil";

export const loginState = atom({
    key: 'loginState',
    default: false
})

export const usernameAtom = atom({
    key: 'username',
    default: ''
})

export const messagesAtom = atom({
    key: 'messagesAtom',
    default: []
})