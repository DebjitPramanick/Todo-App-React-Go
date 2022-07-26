import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { checkTodo, unCheckTodo } from '../utils/api.helper';

const useStyles = makeStyles(() => ({
    container: {
        borderRadius: '6px',
        boxShadow: '2px 2px 4px lightgrey',
        padding: '6px 4px',
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
            if(todo.done){
                result = await checkTodo(todo.id);
            } else {
                result = await unCheckTodo(todo.id);
            }
            setTodos(result.data)
        } catch (err) {
            alert("Error occurred when checking todo.")
        }
    }

    return (
        <Box className={classes.container}>
            <IconButton style={{ height: 'fit-content' }}>
                {todo.done ?
                    <CheckCircleIcon color='success' onClick={handleCheckUncheck}/>
                    : <RadioButtonUncheckedIcon color='primary'  onClick={handleCheckUncheck}/>
                }
            </IconButton>
            <Box style={{ marginTop: '6px' }}>
                <Typography variant='h5'>{todo.title}</Typography>
                <Typography variant='body1' style={{ display: 'block', marginTop: '6px' }}>{todo.body}</Typography>
            </Box>
        </Box>
    )
}

export default TodoItem