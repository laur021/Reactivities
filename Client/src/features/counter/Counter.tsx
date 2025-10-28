import { Button, ButtonGroup, Typography } from "@mui/material";
import { Observer } from "mobx-react-lite";
import { useStore } from "../../lib/hooks/useStore";

export default function Counter() {
  const { counterStore } = useStore();
  return (
    <>
      <Observer>
        {() => (
          <>
            <Typography variant="h4" gutterBottom>
              {counterStore.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              The count is: {counterStore.count}
            </Typography>
          </>
        )}
      </Observer>
      <ButtonGroup sx={{ mt: 3 }}>
        <Button onClick={() => counterStore.decrement()} variant="contained" color="error">
          Decrement
        </Button>
        <Button onClick={() => counterStore.increment()} variant="contained" color="info" >increment</Button>
        <Button onClick={() => counterStore.increment(5)} variant="contained" color="success" >increment by 5</Button>
      </ButtonGroup>
    </>
  );
}
