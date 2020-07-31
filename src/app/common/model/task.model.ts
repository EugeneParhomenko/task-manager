export interface Task {
    title: string,
    parent: number,
    done: boolean,
    id?: number
}