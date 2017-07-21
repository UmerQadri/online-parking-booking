import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import UserPanel from './components/UserPanel';
import AdminPanel from './components/AdminPanel';
import {BrowserRouter as Router,
        Route,
        Link, withRouter} from 'react-router-dom';
import './App.css';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {
  render() {
    return (
      
        <div>
                <Router>
                    <MuiThemeProvider>
                        <div>
                            <Navbar/>
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/user" component={UserPanel} />
                            <Route path="/admin" component={AdminPanel} />
                        </div>
                    </MuiThemeProvider>
                </Router>
            </div>
    );
  }
}

export default App;
