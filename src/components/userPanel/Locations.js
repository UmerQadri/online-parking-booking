import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as firebase from 'firebase';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {BrowserRouter as Router,
        Route,
        Link, withRouter} from 'react-router-dom';

const paperStyle = {


    width: '80%',
    height: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    padding: '10px'


}


class Locations extends Component{

   constructor(props){

    super(props);

    this.state = {

        locations: ''


    }



   }


   componentDidMount(){

        firebase.database().ref('locations').on('value', snap =>{

            this.setState({

                locations: snap.val()

            });


        });


   }
    

    render(){

        const locations = Object.keys(this.state.locations).map((key, i) => {

            return(

                <Paper zDepth={1} style={paperStyle} key={i++}>
                <p>Location Name: {this.state.locations[key].locationName}</p>
                <p>Total Slots: {this.state.locations[key].slotsNumber}</p>
                <Link 
    to={{ 
    pathname: '/viewLocation', 
    state: { message: key } 
  }}>
  <RaisedButton label="View" secondary={true}/></Link>
                </Paper>

            )


        })

        return(

            <div>
            {locations}
            </div>


        );


    }



}

export default Locations;