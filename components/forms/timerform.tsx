import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UseFormReturn, useForm } from "react-hook-form";

type Durations = {
    pomodoro: number,
    shortBreak: number,
    longBreak: number
}

interface TimeFormProps {
    setDurations: (durations: Durations) => void
    setOpen: (setOpen: boolean) => void
}

export default function TimerForm({ setDurations, setOpen }: TimeFormProps) {

    function isValidDuration(field: any) {
        return field && isFinite(field) && field > 0;
    }

    const { register, handleSubmit }: UseFormReturn = useForm();

    function handleFormSubmit({ pomodoro, shortBreak, longBreak }: any) {
        let durations: Durations = {
            pomodoro: isValidDuration(pomodoro) ? pomodoro : 25,
            shortBreak: isValidDuration(shortBreak) ? shortBreak : 5,
            longBreak: isValidDuration(longBreak) ? longBreak : 15,
        };

        setDurations(durations);
        setOpen(false);
    }

    return (
        <Container component='main' maxWidth='sm'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px',

                }}>
                <Typography id="modal-title" component='h2' variant='h5' sx={{ mt: 1, mb: 1 }}>
                    Personalice el tiempo del pomodoro en minutos:
                </Typography>
                <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} onReset={handleSubmit(handleFormSubmit)}>
                    <Grid container spacing={2} justifyContent={"center"}  >
                        <Grid item sx={{ mt: 1, mb: 1 }}>
                            <TextField
                                {...register('pomodoro')}
                                required
                                fullWidth
                                label="Pomodoro"
                                autoFocus
                                autoComplete="off"
                            />
                            <Grid item sx={{ mt: 1, mb: 1 }}>
                            </Grid>
                            <TextField
                                {...register('shortBreak')}
                                required
                                fullWidth
                                label="Short Break"
                                autoFocus
                                autoComplete="off"
                            />
                            <Grid item sx={{ mt: 1, mb: 1 }}>
                            </Grid>
                            <TextField
                                {...register('longBreak')}
                                required
                                fullWidth
                                label="Long Break"
                                autoFocus
                                autoComplete="off"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Confirmar
                    </Button>
                    <Button
                        type="reset"
                        variant="contained"
                        sx={{ mt: 1, mb: 1 }}>
                        Reset
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
