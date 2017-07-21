import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import * as firebase from 'firebase';
import {BrowserRouter as Router,
        Route,
        Link, withRouter} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

class Logged extends Component{
  static muiName = 'FlatButton'
    render(){
        return(
            <div>
                <Link to='/login'><FlatButton onClick={() => {
                    
                        firebase.auth().signOut();
                        
                }
                }
                label="Logout" />
            </Link>                
            </div>
        )
    }
}

class UnLogged extends Component{
 static muiName = 'FlatButton'
    render(){
        return(
            <div>
                <Link to='/login'><FlatButton  label="Login" /></Link>
                <Link to='/signup'><FlatButton  label="SignUp"/></Link>
            </div>
        )
    }
}




class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {
            logged : false,
            open: false,
            type: null
        }
    }


    componentDidMount(){

        firebase.auth().onAuthStateChanged(() => {
            if(firebase.auth().currentUser){
                this.setState({
                    logged:true
                })

                firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', snap => {

                    if (snap.val().type === 'user'){

                            this.setState({

                                type: 'user'

                            });

                    }
                    else if (snap.val().type === 'admin'){

                        this.setState({

                                type: 'admin'

                        });

                    }


                });

            }
            else{
                this.setState({
                    logged:false
                })
            }
        })
    }

handleToggle = () => this.setState({open: !this.state.open});

handleClose = () => this.setState({open: false});

    render(){
        return(
            <div>
                <AppBar
                    
                    zDepth={1}
                    title="Car Parking Booking"
                    titleStyle={{cursor:'pointer'}}
                    iconElementLeft={this.state.logged ? <img
                    style={{cursor:'pointer'}} 
                    src={require('../images/menu.png')} 
                    onClick={this.handleToggle}/> : <span></span> }
                
                    iconElementRight={this.state.logged ? <Logged /> : <UnLogged />}
                />


                <Drawer
                width={200}
                docked={false}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
                >


               {this.state.type === 'user' ?
               <div>
                <MenuItem onClick={this.handleClose.bind(this)}>Locations</MenuItem>
                <MenuItem onClick={this.handleClose.bind(this)}>Bookings</MenuItem>
                <MenuItem onClick={this.handleClose.bind(this)}>Give Feedback</MenuItem>
                </div> :
                <div>
                <MenuItem onClick={this.handleClose.bind(this)}>Add Locations</MenuItem>
                <MenuItem onClick={this.handleClose.bind(this)}>View Bookings</MenuItem>
                <MenuItem onClick={this.handleClose.bind(this)}>View Users</MenuItem>
                <MenuItem onClick={this.handleClose.bind(this)}>Users Feedback</MenuItem>
                </div>}
                
            </Drawer>
            </div>
        )
    }
}
export default Navbar