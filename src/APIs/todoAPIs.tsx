const baseURL = "http://localhost:3000/todos";

interface ITodo {
    id?: string,
    content: string
}

export const getTodos = () => {
    return fetch(baseURL).then((res) => res.json());
};
export const createTodo = (newTodo: ITodo) => {
    return fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
    }).then((res) => res.json());
};

export const updateTodo = (id: ITodo["id"] , partialTodo: ITodo["content"]) => {
    console.log("In API Call: ", id, partialTodo)
    return fetch(baseURL + `/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(partialTodo),
    }).then((res) => res.json());
};

export const deleteTodo = (id: ITodo["id"]) => {
    console.log("id", id);
    return fetch(`${baseURL}/${id}`, { method: "DELETE" }).then((res) =>
        res.json()
    );
};