import PropTypes from 'prop-types';
import TaskCard from './TaskCard'
import { useContext } from 'react';
import {UserContext} from '../context/UserContext'

function TaskList() {
  const {task, deleteTask} = useContext(UserContext)
  if (!task.length) {
    return <div>No hay tareas</div>
  }

    return (
    <div>
      {
        task.map((tarea)=>(
          <div key={tarea.id}>
         <TaskCard prueba={tarea} deleteTask={deleteTask}/>
         </div>
        ))
      }
    </div>
  );
}

export default TaskList;

TaskList.prototype = {
    tasks: PropTypes.array.isRequired
}