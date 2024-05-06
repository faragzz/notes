export type Note = {
    title:string,
    content:string,
    color:string,
    date:Date
}
export const Color =['bg-yellow-100','bg-red-100','bg-yellow-200','bg-blue-100'];
export type user = {
    name:string,
    email:string,
    password:string,
    notes:Note[]
}

export type NoteType = {
    title:string,
    content:string,
    color:string,
    date:string
}