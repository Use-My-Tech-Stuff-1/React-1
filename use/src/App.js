import React from 'react';
import {Button, Navbar, Card} from 'reactstrap';
import {Route, Link} from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import RenterForm from './RenterForm';
import TechList from "./TechList";
import PrivateRoute from './PrivateRoute'
import './App.css';


function App() {
  return (

    <div className="App">
      <header className="Container">

        <Navbar>
          <Link to='/'>
            <Button>Home</Button>
          </Link>
        </Navbar>

        <PrivateRoute exact path = '/techlist'>
          <TechList />
        </PrivateRoute>

        <Route path = '/'>
          <SignIn/>
        </Route>

        <Route path = '/sign-up'>
          <SignUp/>
        </Route>

        <PrivateRoute path = '/renter-form'>
          <RenterForm/>
        </PrivateRoute>

      </header>
    </div>

  );
}
export default App;

