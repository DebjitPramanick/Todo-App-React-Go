import axios from "axios";

const API = axios.create({
    baseURL: 'http://127.0.0.1:4000/api',
});

export const getTodos = async () => {
    const result = await API.get("/todos")
    .then(res => res)
    .catch(err => {
        console.log("ERROR ==> ", err)
        throw new Error("Error occurred when fetching todos.")
    })
    return result;
}

export const createTodo = async (data: any) => {
    const result = await API.post("/todo")
    .then(res => res)
    .catch(err => {
        console.log("ERROR ==> ", err)
        throw new Error("Error occurred when creating todo.")
    })
    return result;
}

export const checkTodo = async (id: number) => {
    const result = await API.patch(`/todo/${id}/check`)
    .then(res => res)
    .catch(err => {
        console.log("ERROR ==> ", err)
        throw new Error("Error occurred when checking todo.")
    })
    return result;
}

export const unCheckTodo = async (id: number) => {
    const result = await API.patch(`/todo/${id}/uncheck`)
    .then(res => res)
    .catch(err => {
        console.log("ERROR ==> ", err)
        throw new Error("Error occurred when unchecking todo.")
    })
    return result;
}