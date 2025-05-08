import React from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@mui/material/Button';
const NavBar = () => {
    // Define variables for reusable styles
    const navbarStyles = {
        backgroundColor: '#333',
        padding: '10px 0',
    }

    const navItemStyles = {
        marginRight: '20px', // Add space between the items
    }

    const linkStyles = {
        color: '#fff',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    }

    const svgStyles = {
        marginRight: '10px',
    }

    const backButton={
        display: 'inline-flex',
        alignItems: 'center',
        margin:'5px',
        backgroundColor: '#3F51B5', // Blue background
        color: '#ffffff', // White text
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px', // Rounded corners
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#0041a8', // Slightly darker blue on hover
        },
    }

    const navbarListStyles = {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'row', // Display items in a row
        justifyContent: 'space-around', // Space out the links evenly
        alignItems: 'center', // Align items vertically in the middle
    }

    const handleBackToDashboard = () => {
        window.history.pushState({}, '', '/dashboard');
        window.dispatchEvent(new PopStateEvent('popstate'));
      };
    
    return (
        <div>
           <Button 

        onClick={handleBackToDashboard}
       style={backButton}
        startIcon={<ArrowBackIcon />}
      >
        Back to Main Dashboard
      </Button>
            <nav className="navbar" style={navbarStyles}>
                <ul className="navbar-nav" style={navbarListStyles}>
                    <li className="nav-item" style={navItemStyles}>
                        <Link to="/billingdashboard" className="nav-link" style={linkStyles}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pie-chart" style={svgStyles}>
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                            </svg>
                            <span className="link-text">Billing Dashboard</span>
                        </Link>
                    </li>
                    
                    <li className="nav-item" style={navItemStyles}>
                        <Link to="/invoice" className="nav-link" style={linkStyles}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus" style={svgStyles}>
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span className="link-text">Create</span>
                        </Link>
                    </li>
                    
                    <li className="nav-item" style={navItemStyles}>
                        <Link to="/invoices" className="nav-link" style={linkStyles}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layers" style={svgStyles}>
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 12 17 22 12"></polyline>
                            </svg>
                            <span className="link-text">Invoices</span>
                        </Link>
                    </li>
                    
                    <li className="nav-item" style={navItemStyles}>
                        <Link to="/customers" className="nav-link" style={linkStyles}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users" style={svgStyles}>
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span className="link-text">Customers</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
