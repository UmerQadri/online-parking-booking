import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import {BrowserRouter as Router,
        Route,
        Link, withRouter} from 'react-router-dom';


const paperStyle = {


    width: '60%',
    height: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    padding: '10px'


}
class ViewLocation extends Component{


    constructor(props){

        super(props);

        this.state = {
         
            slots: '',
            locationID: ''
        }

    }

    componentWillMount(){

      this.setState({

        locationID: this.props.location.state.message

      });

      var a = [];

     firebase.database().ref('locations/').on('value', snap =>{ 
         var b = snap.exists();
         
    });


        firebase.database().ref('locations/' + this.props.location.state.message).child('slots').on('child_added', snap => {
            
            

           

            a.push(snap.val());
            
        this.setState({

                slots: a

            });

            
        });

        

    }

    handleClick(key){

        console.log("here");

    }

    render() {
        let i = 0;
       const slots  =  Object.keys(this.state.slots).map((key, i) => {
return(
    
        <button key={i++}className={this.state.slots[key].book === "not booked"? "slotButton" : "slotButtonBooked"}
         disabled={this.state.slots[key].book === "not booked"? false : true} 
         onClick={this.handleClick.bind(this)}
        >
        <Link to={
            this.state.slots[key].book === "not booked" ? { 
    pathname: '/bookSlot', 
    state: {locationID: this.props.location.state.message, slotNumber: key} 
  } : {pathname: '/viewLocation'}


        }>
        {this.state.slots[key].slotName}</Link>
        </button>
        
);

       });

       
        return(
            
            
                <Paper zDepth={1} style={paperStyle}>
                    <div className="slotsContainer">
                    {slots}
                    </div>
                </Paper>
            


        );



    }



}


export default ViewLocation;