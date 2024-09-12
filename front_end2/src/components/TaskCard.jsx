import { useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";

function TaskCard({ prueba, deleteTask }) {
    const valor = useContext(UserContext);
    console.log(valor);
    return (
        <>
            <h2>{prueba.title}</h2>
            <p>{prueba.description}</p>
            <button onClick={() => deleteTask(prueba.id)}>Eliminar</button>
        </>
    );
}

TaskCard.propTypes = {
    prueba: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default TaskCard;

