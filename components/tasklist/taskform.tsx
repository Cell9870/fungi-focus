import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

interface TaskFormProps {
  onNewTask: (name: string, state: string, description?: string) => void;
  close: () => void;
}


export default function TaskForm({ onNewTask, close }: TaskFormProps) {
  const { register, handleSubmit, reset }: UseFormReturn = useForm();

  const [state, setState] = useState("notStarted");

  const handleFormSubmit = ({ task, description }: any) => {
    reset({
      task: "",
      description: "",
    });
    let _name: string = task;
    let _state: string = state;
    let _description: string = description;

    onNewTask(_name, _state, _description);
    close();;
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    setState(event.target.value);
  };

  return (
    <Container>
      <Box>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          {/** GRILLA CON TASKNAME Y DESCRIPCION*/}
          <Grid
            container
            justifyContent={"left"}
            rowSpacing={1}
            columns={2}
            columnSpacing={2}
            rowGap={0}
            columnGap={1}
          >
            <Grid item>
              <TextField
                {...register("task")}
                required
                fullWidth
                label="Nueva Tarea"
                autoFocus
                autoComplete="off"
                variant="standard"
                sx={{
                  input: { color: "black" },
                  position: "relative"
                }}
                InputLabelProps={{ style: { color: "gray" } }}
              />
            </Grid>
            <Grid item>
              <TextField
                {...register("description")}
                label="Descripcion"
                multiline
                rows={0}
                autoComplete="off"
                variant="standard"
                inputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "gray" } }}
              />
            </Grid>
          </Grid>
          {/**GRID CON MENU Y BUTTON SUBMIT */}
          <Grid
            container
            justifyContent={"left"}
            rowSpacing={1}
            columns={2}
            columnSpacing={2}
            rowGap={0}
            columnGap={4}
          >
            <Grid item>
              <InputLabel id="select-label"></InputLabel>
              <Select
                labelId="select-label"
                id="select"
                value={state}
                sx={{ color: "gray", position: "relative", top: "40%" }}
                onChange={handleStateChange}
              >
                <MenuItem value={"notStarted"}>No Empezado</MenuItem>
                <MenuItem value={"pending"}>Pendiente</MenuItem>
                <MenuItem value={"done"}>Finalizado</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                sx={{ position: "relative", top: "55%", left: "12%", color: "cadetblue" }}
                variant="outlined"
              >
                Añadir Nueva Tarea
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container >
  );
}
