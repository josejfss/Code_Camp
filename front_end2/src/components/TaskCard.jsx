import PropTypes from "prop-types";

function TaskCard({ prueba, deleteTask }) {
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

