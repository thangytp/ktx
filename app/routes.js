import React from 'react';
import {Route} from 'react-router';
import Main from './components/main/Main';
import Home from './components/main/Home';
import SignUp from './components/main/user/SignUp';
import LogIn from './components/main/user/LogIn';
import InfoPage from './components/main/user/InfoPage';

export default (
  <Route>
        <Route component={Main}> 
            <Route path='/' component={Home}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/info-stu' component={InfoPage}/>
        </Route>
  </Route>
);
