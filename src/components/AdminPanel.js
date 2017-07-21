import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Location from './adminPanel/Location';
import {BrowserRouter as Router,
        Route,
        Link, withRouter} from 'react-router-dom';


class AdminPanel extends Component{

render(){

    return(
        
        <Router>

            <Route path='/' component={Location}/>

        </Router>
        
        

    );

    
}

}

export default AdminPanel;