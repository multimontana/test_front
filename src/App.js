import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './page/Main';
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
 
import Product from "./page/Product";
 
const App = () => {
   return (<BrowserRouter>
      <Switch>
         <Route exact={true} path="/" component={Main} />
         <Route path="/signin" component={SignIn} />
         <Route path="/signUp" component={SignUp} />
 
         <Route path="/product" component={Product} />
 
      </Switch>
   </BrowserRouter>)
}
export default App;
