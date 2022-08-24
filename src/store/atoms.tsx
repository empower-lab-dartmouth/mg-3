import {atom, selector} from "recoil";

export const status = atom({
    key: "status",
    default: 0,
})

export const words = atom({
    key: "words",
    default: "NA",
})

export const laststep = atom<number[]>({
    key: "laststep",
    default: [],
})

export const parentname = atom({
    key: "parent-name",
    default: "PA",
})

export const childname = atom({
    key: "child-name",
    default: "CH",
})