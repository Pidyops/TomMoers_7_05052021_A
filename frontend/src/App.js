import './App.css';
import './styles/index.scss'
import Auth from './pages/Auth';
import Forum from './pages/Forum';


import NotFound from './pages/NotFound';
import { useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'


import { BrowserRouter, Switch, Route} from "react-router-dom"
import { blueGrey, teal } from '@material-ui/core/colors';

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

  
  const [userConnected, setUserConnected] = useState('')

  // const isLogin = false
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact >
            <Auth
              authValues={authValues} 
              setAuthValues={setAuthValues}
              userConnected={userConnected}
              setUserConnected={setUserConnected}
            />
          </Route>
          <Route path="/Forum" >
            <Forum 
              authValues={authValues} 
              setAuthValues={setAuthValues} 
              userConnected={userConnected}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>

    </ThemeProvider>
  )
}

export default App