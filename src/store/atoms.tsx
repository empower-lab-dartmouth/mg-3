import {atom, selector} from "recoil";

export const status = atom({
    key: "status",
    default: 0,
})

export const words = atom({
    key: "words",
    default: "NA",
})