import './App.css';
import Auth from './pages/Auth';
import Forum from './pages/Forum';

import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'


import { BrowserRouter, Switch, Route} from "react-router-dom"
import { blueGrey, teal } from '@material-ui/core/colors';

import { getUser } from './api/users';

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
    password2: ''
  });

  // FETCH GET _____ userConnected
  // const userConnectedId = 3
  
  const [userConnected, setUserConnected] = useState('')
  // console.log(sessionStorage.getItem('jwt'))
  // console.log(sessionStorage.getItem('hello'))

  // useEffect(() => {
  //   if (sessionStorage.getItem('jwt')){
  //     console.log('super token')

  //     // Get token from db and check if same as the ls
  //     // => user ID

  //     // set userConnected



  //   } else {
  //     console.log('need token')
  //   }
  // },[]);

  // console.log('userConnected', userConnected)

  // const fetchUserConnected = (userConnectedId) => getUser(userConnectedId) //res is what we get
  //   .then(data => setUserConnected(data)) 

  // useEffect(() => {
  //   fetchUserConnected(userConnectedId)
  // }, []);

  // console.log(userConnected)
  


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
              userConnected={userConnected}
              setUserConnected={setUserConnected}
            />
          </Route>
          <Route path="/Forum" exact >
            <Forum 
              authValues={authValues} 
              setAuthValues={setAuthValues} 
              userConnected={userConnected}
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

