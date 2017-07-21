import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as firebase from 'firebase';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter as Router,
        Route,
        Link, withRouter} from 'react-router-dom';

const style = {

   
    
    width: '20%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '70px',
  
    
        
}


const paperStyle = {


    width: '80%',
    height: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    padding: '10px'


}

class AddLocation extends Component{


    constructor(props){

        super(props);

        this.state = {
            user: null,
            locationName: '',
            slot: ''


        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount(){

        firebase.auth().onAuthStateChanged(() => {

            this.setState({
                user: firebase.auth().currentUser,
            
            })
        })
    }


        handleChange(ev){

        if(ev.target.name==="locationName"){
            this.setState({
                locationName: ev.target.value
            })
        }
        else if(ev.target.name==="slot"){
            this.setState({
                slot: ev.target.value
            })
        }
        
    }


 handleSubmit(e){


        e.preventDefault();

            let slots = [];

            for(var i = 1; i <= this.state.slot; i++){

                slots.push({
                    slotName : "Slot " + i,
                    book: "not booked"
                });
                console.log(slots[i-1].slotName);
            }

            firebase.database().ref().child('locations').push().set({

                locationName: this.state.locationName,
                slotNumber: slots

                

            });

            



            

     
    }



    render(){

        return(

            <ValidatorForm onSubmit={this.handleSubmit}
                style={style}>

                        <TextValidator
                            ref="here"
                            value={this.state.locationName}
                            onChange={this.handleChange}
                            floatingLabelText="Location Name"
                            name="locationName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <TextValidator
                            value={this.state.slot}
                            onChange={this.handleChange}
                            floatingLabelText="Slots"
                            name="slot"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />


                        <RaisedButton label="Add" secondary={true} type="submit"/>

                    </ValidatorForm>



        );


    }


}

class AvailableLocation extends Component{

   constructor(props){

    super(props);

    this.state = {

        locations: ''


    }



   }

   handleRemove(key){

    firebase.database().ref('locations/' + key).remove();



   }


   handleView() {

    


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
                <p>Slots: {this.state.locations[key].slot}</p>
                <RaisedButton label="Delete" secondary={true} onTouchTap={this.handleRemove.bind(this, key)}/>
                <Link 
    to={{ 
    pathname: '/viewLocations', 
    state: { message: key } 
  }}><RaisedButton label="View" secondary={true} onTouchTap={this.handleView.bind(this, key)}/></Link>
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

class ViewLocation extends Component{





}

class Location extends Component{

    render(){

        return(

            <Tabs>

                <Tab label="Available Locations"><AvailableLocation/></Tab>
                <Tab label="Add Locations"><AddLocation/></Tab>

            </Tabs>

        );



    }


}

export default Location;