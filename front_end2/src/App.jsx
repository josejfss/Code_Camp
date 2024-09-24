import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import SignIn from "./components/Login2";
import Home from "./components/Home";
import Compra from "./components/Client/Compra";
import { UserContext } from "./context/UserContext";
import Record from "./components/Client/Record";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import NoAccess from "./components/NoAccess";
import HomeAdmin from "./components/Admin/HomeAdmin";
import CategoryContainer from "./components/Admin/CategoryContainer";
import ProductContainer from "./components/Admin/ProductContainer";
import FacturaContainer from "./components/Client/FacturaContainer";
import OrdersContainer from "./components/Admin/OrdersContainer";
// import CreateUser from "./components/CreateUser";
export default function App() {
  //Contexto de usuario
  const { user } = useContext(UserContext);
  const rolUser = {
    cliente: 1,
    operadorAdministrativo: 2,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {!user ? (
                <SignIn />
              ) : user.id_rol === rolUser.cliente ? (
                <Home />
              ) : user.id_rol === rolUser.operadorAdministrativo ? (
                <HomeAdmin />
              ) : (
                <SignIn />
              )}
            </>
          }
        />
        {/* Rutas para usuario normal */}
        <Route
          path="/user/car"
          element={
            <>
              {user && user.id_rol === rolUser.cliente ? (
                <Compra />
              ) : (
                <NoAccess />
              )}
            </>
          }
        />
        <Route
          path="/user/record"
          element={
            <>
              {user && user.id_rol === rolUser.cliente ? (
                <Record />
              ) : (
                <NoAccess />
              )}
            </>
          }
        />
        <Route
          path="/user/bill"
          element={
            <>
              {user && user.id_rol === rolUser.cliente ? (
                <FacturaContainer />
              ) : (
                <NoAccess />
              )}
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              {user && user.id_rol === rolUser.cliente ? (
                <Home />
              ) : (
                <NoAccess />
              )}
            </>
          }
        />
        <Route path="/noaccess" element={<Home />} />

        {/* Rutas para usuario administrativo */}
        <Route
          path="/admin/category"
          element={
            <>
              {user && user.id_rol === rolUser.operadorAdministrativo ? (
                <CategoryContainer />
              ) : (
                <NoAccess />
              )}
            </>
          }
        />

        <Route
          path="/admin/product"
          element={
            <>
              {user && user.id_rol === rolUser.operadorAdministrativo ? (
                <ProductContainer />
              ) : (
                <NoAccess />
              )}
            </>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <>
              {user && user.id_rol === rolUser.operadorAdministrativo ? (
                <OrdersContainer />
              ) : (
                <NoAccess />
              )}
            </>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute isAllowed={!!user} redirectTo="/about">
              <>
                <TaskForm />
                <TaskList />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
