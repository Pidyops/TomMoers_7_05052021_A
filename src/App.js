import './App.css';
import Auth from './pages/Auth';
import Forum from './pages/Forum';

import NotFound from './pages/NotFound';
import { useState } from 'react'


import { BrowserRouter, Switch, Route} from "react-router-dom"


const App = () => {
  const[authValues, setAuthValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });
  // const isLogin = false
  return (
    <div>
      <BrowserRouter>
        <Switch>
        {/* {!isLogin?(<Route path="/" exact component={Auth} />) : (<Route path="/Forum" exact component={Forum} />)} */}
          <Route path="/" exact >
            <Auth
              authValues={authValues} 
              setAuthValues={setAuthValues} 
            />
          </Route>
          <Route path="/Forum" exact >
            <Forum 
              authValues={authValues} 
              setAuthValues={setAuthValues} 
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>



      {/* <Signin />
      <Forum />
      <NotFound />
      <Form /> */}


    </div>
  )
}

export default App

