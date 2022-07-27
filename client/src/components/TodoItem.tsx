import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { checkTodo, unCheckTodo } from '../utils/api.helper';

const useStyles = makeStyles(() => ({
    container: {
        borderRadius: '6px',
        boxShadow: '2px 2px 4px lightgrey',
        padding: '6px 10px',
        margin: '10px 0',
        color: 'grey',
        cursor: 'pointer',
        display: 'flex',
        gap: '10px'
    }
}))

interface ItemProps {
    todo: any,
    setTodos: (val: any[]) => void
}

const TodoItem: React.FC<ItemProps> = ({ todo, setTodos }) => {

    const classes = useStyles();

    const handleCheckUncheck = async () => {
        try {
            let result;
            if (!todo.done) {
                result = await checkTodo(todo.id);
            } else {
                result = await unCheckTodo(todo.id);
            }
            setTodos(result.data)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <Box className={classes.container} style={{
            background: `${todo.done ? '#f3f3f3' : '#fff'}`,
            textDecoration: `${todo.done ? 'line-through' : ''}`,
        }}>
            <IconButton style={{ height: 'fit-content' }} size="small">
                {todo.done ?
                    <CheckCircleIcon style={{ color: '#67e7bd' }} onClick={handleCheckUncheck} />
                    : <RadioButtonUncheckedIcon style={{ color: '#b3b3b3' }} onClick={handleCheckUncheck} />
                }
            </IconButton>
            <Box>
                <Typography variant='h5'>{todo.title}</Typography>
                <Typography variant='body1' style={{ display: 'block', marginTop: '6px' }}>{todo.body}</Typography>
            </Box>
        </Box>
    )
}

export default TodoItem