import React from 'react';
import {Route} from 'react-router';
import Main from './components/main/Main';
import Home from './components/main/Home';

export default (
  <Route>
        <Route component={Main}> 
            <Route path='/' component={Home}/>
        </Route>
  </Route>
);
