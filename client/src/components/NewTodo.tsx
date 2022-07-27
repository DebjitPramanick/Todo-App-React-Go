import { Box, Button, Collapse, IconButton, makeStyles, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTodo } from '../utils/api.helper';

const useStyles = makeStyles(() => ({
    container: {
        borderRadius: '6px',
        boxShadow: '2px 2px 4px lightgrey',
        padding: '6px 10px',
        margin: '10px 0',
        color: 'grey',
        cursor: 'pointer',
        gap: '10px'
    },
    cta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    inputField: {
        margin: '16px 0',
        display: 'block',
        width: '100%',
        "& input": {
            padding: '10px'
        },
        "& .MuiOutlinedInput-multiline": {
            padding: '10px'
        }
    },
    btnStyle: {
        background: '#67e7bd', 
        color: '#fff', 
        marginLeft: 'auto', 
        display: 'block'
    }
}))

const initialData = {
    title: '',
    body: ''
}

const NewTodo:React.FC<any> = ({setTodos}) => {
    const classes = useStyles();
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [data, setData] = useState<{ title: string, body: any }>(initialData);

    const handleChange = (val: any, field: string) => {
        if (field === 'title') {
            setData({ ...data, title: val })
        } else {
            setData({ ...data, body: val })
        }
    }

    console.log(data)

    const handleCreate =async () => {
        try{
            const res = await createTodo(data)
            setTodos(res.data)
            setShowEditor(false)
        } catch(err) {
            alert(err)
        }
    }

    return (
        <Box className={classes.container}>
            {showEditor ? (
                <Box className={classes.cta} onClick={() => setShowEditor(!showEditor)}>
                    <Typography variant='h5'>Close Editor</Typography>
                    <IconButton size="small">
                        <ExpandLessIcon fontSize='large' />
                    </IconButton>
                </Box>
            ) : (
                <Box className={classes.cta} onClick={() => setShowEditor(!showEditor)}>
                    <Typography variant='h5'>Add Todo</Typography>
                    <IconButton size="small">
                        <ExpandMoreIcon fontSize='large' />
                    </IconButton>
                </Box>
            )}
            <Collapse in={showEditor} unmountOnExit>
                {showEditor && (
                    <>
                        <TextField
                            required
                            value={data?.title}
                            onChange={(e: any) => handleChange(e.target.value, 'title')}
                            placeholder="Enter title"
                            id="outlined-required"
                            className={classes.inputField}
                            variant="outlined"
                        />
                        <TextField
                            value={data?.body}
                            onChange={(e: any) => handleChange(e.target.value, 'body')}
                            className={classes.inputField}
                            placeholder="Enter body"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                        />
                        <Button variant='contained' className={classes.btnStyle}
                        onClick={handleCreate}>
                            Create
                        </Button>
                    </>
                )}
            </Collapse>
        </Box>
    )
}

export default NewTodo