import { useDispatch, useSelector } from "react-redux"
import { Box, Typography, Button } from "@mui/material";
// import { Nav, Button } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../app/authenticationSlice";


const Navbar = () => {
    const { isLoggedIn } = useSelector(state => state.authenticationSlice);
    const dispatch = useDispatch();

    // return <Nav className='navbar' style={{ backgroundColor: '#e4fff2' }}>
    //     <h1 style={{ fontFamily: 'Brush Script MT, cursive' }}>My Expenses</h1>
    //     {
    //         isLoggedIn
    //             ? <div style={{ display: 'flex', alignItems: 'center' }}>
    //                 <NavLink style={{ marginLeft: '1rem' }} variant='link' to="/">Home</NavLink>
    //                 <NavLink style={{ marginLeft: '1rem' }} variant='link' to="/statistics">Statistics</NavLink>
    //                 <Button variant='link' href='/signin' onClick={() => dispatch(logout())}>Log out</Button>
    //             </div>
    //             : <div style={{ display: 'flex' }}>
    //                 <NavLink to='/signup'>Sign up</NavLink>
    //                 <NavLink to='/signin' style={{ marginLeft: '1rem' }}>Sign in</NavLink>
    //             </div>
    //     }
    // </Nav>
    return (
        <Box>
            <Typography variant="h4" sx={{ fontFamily: 'Brush Script MT, cursive' }}>
                My Expenses
            </Typography>
            {isLoggedIn ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                        component={RouterLink} 
                        to="/" 
                        color="primary"
                        sx={{ marginLeft: '1rem' }}
                    >
                        Home
                    </Button>
                    <Button 
                        component={RouterLink} 
                        to="/statistics" 
                        color="primary"
                        sx={{ marginLeft: '1rem' }}
                    >
                        Statistics
                    </Button>
                    <Button 
                        color="secondary" 
                        onClick={() => dispatch(logout())} 
                        sx={{ marginLeft: '1rem' }}
                    >
                        Log out
                    </Button>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'right', marginRight: '5rem' }}>
                    <Button 
                        component={RouterLink} 
                        to="/signup" 
                        color="primary"
                    >
                        Sign up
                    </Button>
                    <Button 
                        component={RouterLink} 
                        to="/signin" 
                        color="primary" 
                        sx={{ marginLeft: '1rem' }}
                    >
                        Sign in
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Navbar;