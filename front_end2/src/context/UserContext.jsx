/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { tasks } from "../data/task";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [task, setTask] = useState(tasks);
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);


  const deleteTask = (taskId) => {
    console.log(tasks);

    setTask(task.filter((task) => task.id !== taskId));
  };

  //Manejo de la sesión del usuario 
  const sesionStorageLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  
  const sesionStorageLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  

  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        product,
        setProduct,
        task,
        setTask,
        deleteTask,
        sesionStorageLogin,
        sesionStorageLogout
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
