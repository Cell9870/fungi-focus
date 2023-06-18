import { Box, Button, Container, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

interface TaskFormProps {
    onNewTask: (name: string, state: string, description?: string) => void
}

export default function TaskForm({ onNewTask }: TaskFormProps) {
    const { register, handleSubmit }: UseFormReturn = useForm();

    const [state, setState] = useState('notStarted');

    const handleFormSubmit = ({ task, description }: any) => {
        let _name: string = task
        let _state: string = state
        let _description: string = description

        onNewTask(_name, _state, _description)
    }

    const handleStateChange = (event: SelectChangeEvent) => {
        setState(event.target.value)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                >
                <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
                    <Grid container justifyContent={"left"} rowSpacing={1} columns={3} columnSpacing={2} rowGap={2} columnGap={2}>
                        <Grid item>
                            <TextField
                                {...register('task')}
                                required
                                fullWidth
                                label='Nueva Tarea'
                                autoFocus
                                autoComplete="off"
                                variant="standard"
                                sx={{ input: { color: 'white' }, }}
                                InputLabelProps={{ style: { color: 'gray' } }}
                            />
                        </Grid>
                        <Grid item>
                            <InputLabel id='select-label'></InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={state}
                                sx={{ color: 'gray' }}
                                onChange={handleStateChange}
                            >
                                <MenuItem value={'notStarted'}>No Empezado</MenuItem>
                                <MenuItem value={'pending'}>Pendiente</MenuItem>
                                <MenuItem value={'done'}>Finalizado</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item>
                            <TextField
                                {...register('description')}
                                label="Descripcion"
                                multiline
                                rows={3}
                                autoComplete="off"
                                variant="standard"
                                inputProps={{ style: { color: 'white' } }}
                                InputLabelProps={{ style: { color: 'gray' } }}
                            />
                        </Grid>
                        <Grid item>
                        <Button
                            type="submit"
                            sx={{ position: 'relative', left: '5%' }}
                            variant="contained"
                        >
                            Añadir Tarea
                        </Button>
                        </Grid>
                    </Grid>
                    
                </Box>
            </Box>
        </Container>
    );
}