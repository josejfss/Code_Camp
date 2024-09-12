import {Navigate, Outlet} from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({isAllowed, children, redirectTo = "/"}) =>{
    if(!isAllowed){
        return <Navigate to={redirectTo} />;
    }

    return children ? children : <Outlet />;
}

// Add the 'isAllowed' prop to the props validation
ProtectedRoute.propTypes = {
    isAllowed: PropTypes.bool.isRequired,
    children: PropTypes.node,
    redirectTo: PropTypes.string
}