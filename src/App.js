import {useEffect} from "react"
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Signin from "./components/Signin"
import Nav from "./components/Nav"
import Mainpage from "./components/Mainpage";
import {useSelector} from "react-redux"
import { AmplifyAuthContainer } from '@aws-amplify/ui-react';
import Signup from "./components/Signup";

// import store from "./store"


// const hubstore = (() => {
//   const listeners = [];
//   const theStore = {
//       subscribe(listener) {
//           listeners.push(listener);
//       }
//   };
//   return new Proxy(theStore, {
//       set(_obj, _prop, _value) {
//           listeners.forEach(l => l());
//           return Reflect.set(...arguments);
//       }
//   });
// })();

function App(props) {
  const currentUser = useSelector(({currentUser})=>currentUser)


  useEffect(()=>{


  },[])




  return (
    <>
      <Router>
        <Route component={Nav}></Route>
        <Switch>
          <Route path="/" exact render={()=>(currentUser?<Home currentUser={currentUser}/>:<Mainpage/>)}></Route>
          <AmplifyAuthContainer>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
          </AmplifyAuthContainer>
        </Switch>
      </Router>
    </>
  )
}

export default App;
