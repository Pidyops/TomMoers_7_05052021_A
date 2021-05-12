import './App.css';
import Auth from './pages/Auth';
import Forum from './pages/Forum';
import NotFound from './pages/NotFound';


import { BrowserRouter, Switch, Route} from "react-router-dom"


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/Forum" exact component={Forum} />
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

