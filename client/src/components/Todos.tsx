import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getTodos } from '../utils/api.helper'
import NewTodo from './NewTodo'
import TodoItem from './TodoItem'

const useStyles = makeStyles(() => ({
    container: {
        maxWidth: '600px',
        margin: 'auto'
    }
}))

const Todos = () => {
    const classes = useStyles();
    const [todos, setTodos] = useState<any[]>([]);

    useEffect(() => {
        fetchTodos();
    }, [])

    const fetchTodos = async () => {
        try {
            const res = await getTodos();
            setTodos(res.data)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <Box className={classes.container}>
            <NewTodo setTodos={setTodos}/>
            {todos.map((todo: any) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    setTodos={(val: any[]) => setTodos(val)} />
            ))}
        </Box>
    )
}

export default Todos