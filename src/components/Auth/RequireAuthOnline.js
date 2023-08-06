import { Navigate, Outlet } from "react-router-dom";
import useStore from '../../store/store';

const RequireAuthOnline = ({ allowed }) => {
    
    const cUser = useStore(state => state.cUser)

    const status= cUser.type ? 'loggedIN' : 'none'


    return (
        status?.includes(allowed)
            ?  
                <Outlet />
                : 
                <Navigate to="/login"  />
                    
    );
}

export default RequireAuthOnline;

