import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// Import your components
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';

const generateClassName = createGenerateClassName({
  productionPrefix: 'um',
});

const UserManagementApp = () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router>
          <Switch>
            <Route path='/userform' component={UserForm} />
            <Route path='/user/:id/edit' component={UserForm} />
            <Route path='/user/:id' component={UserDetails} />
            <Route path='/' component={UserList} /> 
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};

export default UserManagementApp;