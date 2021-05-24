import './App.css';
import Auth from './pages/Auth';
import Forum from './pages/Forum';

import NotFound from './pages/NotFound';
import { useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'


import { BrowserRouter, Switch, Route} from "react-router-dom"
import { blueGrey, cyan, purple, teal } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme({
  palette: {
    // primary: {
    //   main: '#fefefe'
    // },
    primary: blueGrey,
    secondary: {
      light: teal[600],
      main: teal[700],
      dark: teal[900]
    }

  }
})

const App = () => {
  const[authValues, setAuthValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '2'
  });
  // const isLogin = false
  return (
    <ThemeProvider theme={theme}>
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


    </ThemeProvider>
  )
}

export default App

