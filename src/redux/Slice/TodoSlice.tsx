import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getTodos, createTodo, updateTodo, deleteTodo  } from "../../APIs/todoAPIs"


interface ITodo{
    id?: string,
    content: string
}

type TodoState = ITodo[]

const initialState:TodoState = []

const fetchTodos = createAsyncThunk<TodoState>(
    "todos/fetchTodos",
    async () => {
        const response = await getTodos();
        console.log("In fetch todos: ", response)
        return response as TodoState ;
    }
)

const addTodo = createAsyncThunk<ITodo, ITodo>(
    "todos/addTodo",
    async(payload: ITodo): Promise<ITodo> => {
        const response = await createTodo(payload);

        console.log(response);
        return response;
    }
)

const editTodo = createAsyncThunk("todos/editTodo",async (payload:ITodo) => {
    console.log("Payload: ", payload)
    const response = await updateTodo(payload.id, payload.content);

    console.log(response);

    return response
})

const removeTodo = createAsyncThunk<string,string>("todos/removeTodo", async (id:string) => {
    const response = await deleteTodo(id)

    console.log("Remove todo: ", response);

    return response;
})

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action:PayloadAction<TodoState>) => {
            return action.payload;
        })
        .addCase(addTodo.fulfilled, (state, action:PayloadAction<ITodo>) => {
            state.push(action.payload)
        })
        .addCase(removeTodo.fulfilled, (state, action: PayloadAction<string>) => {
            state.filter((todo) => todo.id !== action.payload)
            return state
        })
        .addCase(editTodo.fulfilled, (state, action) => {
            const idx = state.findIndex((todo) => todo.id === action.payload.id)
            if(idx !== -1){
                state[idx] = action.payload
            }
        
        } )
    }
})

export {fetchTodos, addTodo, editTodo, removeTodo};

export default todoSlice.reducer