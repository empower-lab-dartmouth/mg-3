export type question = {
    question: string,
    yes: question | null,
    no: question | null,
}
