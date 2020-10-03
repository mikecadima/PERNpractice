import React from 'react'
//imr
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Home from "./routes/Home"
import UpdatePage from "./routes/UpdatePage"
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import { RestaurantContextProvider } from './context/RestaurantContext';

const App = () =>{
    return (
        <RestaurantContextProvider>
    <div className="container">
        <Router> 
            <Switch> 
                <Route exact path="/" component={Home}/>
                <Route exact path="/restaurants/:id/update" component={UpdatePage}/>
                <Route exact path="/restaurants/:id" component={RestaurantdetailPage}/>

            </Switch>
        </Router>
        </div>
        </RestaurantContextProvider>
    )}

export default App;