import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import RaisedButton from 'material-ui/RaisedButton';
import {BrowserRouter as Router,
        Route,
        Link, withRouter} from 'react-router-dom';

class ViewLocations extends Component{


    constructor(props){

        super(props);

        this.state = {

            slotNumber: ''

        }

    }

    componentDidMount(){

        firebase.database().ref('locations/' + this.props.location.state.message).child('slotNumber').on('value', snap => {

            this.setState({

                slotNumber: snap.val()

            });
 console.log(this.state.slotNumber);
        });

        

    }

    render() {

       const slotNumber = Object.keys(this.state.slotNumber).map((key, i) => {
return(
    
        <RaisedButton label={this.state.slotNumber[key].slotName} secondary={true}/>
        
);

       });

        return(
            
            <div>
                {slotNumber}
            </div>


        );



    }



}


export default ViewLocations;