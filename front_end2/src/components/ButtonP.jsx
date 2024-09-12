import { CardActions, Button } from "@mui/material";

function ButtonP(texto, funcion) {
  return (
    <>
    <CardActions>
      <Button
        size="small"
        color="primary"
        onClick={() => funcion}
      >
        {texto}
      </Button>
    </CardActions>
    </>
  );
}

export default ButtonP;
