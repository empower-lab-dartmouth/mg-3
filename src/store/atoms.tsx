import {atom, selector} from "recoil";
import {image} from "../models/image";

export const currentimage = atom<image>({
    key: "current-image",
    default:{
        label: "apple",
        path: "apple.jpeg",
    }
})

export const status = atom({
    key: "status",
    default: 1,
})