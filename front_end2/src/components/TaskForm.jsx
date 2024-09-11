import { useState } from 'react';

function TaskForm() {
  const [task, setTask] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Tarea enviada:', task);
    setTask('');
  };

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={handleChange}
        autoFocus
      />
      <button type="submit">
        Enviar
      </button>
    </form>
  );
}

export default TaskForm;