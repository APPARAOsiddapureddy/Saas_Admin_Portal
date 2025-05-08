import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';


import BillingDashboard from './components/Dashboard/BillingDashboard';
import NavBar from './components/NavBar/NavBar';
import CreateInvoice from './components/Invoice/CreateInvoice';
import InvoicesList from './components/Invoice/InvoiceList';

import ClientList from './components/Clients/ClientList'

const generateClassName = createGenerateClassName({
  productionPrefix: 'um',
});

const UserManagementApp = () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        
        <Router>
          
        <NavBar></NavBar>
       
          <Switch>
            
            
            <Route path='/' exact component={BillingDashboard} /> 
            <Route path="/invoice" component={CreateInvoice} />
            <Route path="/invoices" component={InvoicesList} />
            <Route path='/billingdashboard' component={BillingDashboard}/>
            
            <Route path="/customers" exact component={ClientList} />
            
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

export default UserManagementApp;