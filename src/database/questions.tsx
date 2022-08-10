import {question} from "../models/question";
// Fruits

const aStrawberry: question = {
    question: "Strawberry!",
    yes: null,
    no: null
}

const aDragonfruit: question = {
    question: "Dragonfruit!",
    yes: null,
    no: null
}

const aBanana: question = {
    question: "Banana!",
    yes: null,
    no: null
}

const qBerry: question = {
    question: "Is it a berry?",
    yes: aStrawberry,
    no: aDragonfruit
}

const qRed: question = {
    question: "Is it red?",
    yes: qBerry,
    no: aBanana
}

// Disney

const aElsa: question = {
    question: "Elsa!",
    yes: null,
    no: null
}

const aOlaf: question = {
    question: "Olaf!",
    yes: null,
    no: null
}

const qHuman: question = {
    question: "Is your character human?",
    yes: aElsa,
    no: aOlaf
}

// Landmark

const aStatue: question = {
    question: "Statue of Liberty!",
    yes: null,
    no: null
}

const aPyramids: question = {
    question: "Pyramids of Egypt!",
    yes: null,
    no: null
}


const qGreen: question = {
    question: "Is it green?",
    yes: aStatue,
    no: aPyramids
}

export {aStrawberry, aDragonfruit, aBanana, qBerry, qRed, aElsa, aOlaf, qHuman, aStatue, aPyramids, qGreen};