import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import {BrowserRouter as Router,
        Route,
        Link, withRouter} from 'react-router-dom';

const paperStyle = {


    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    padding: '10px'


}

class BookSlot extends Component{

    constructor(props){

        super(props);

        this.state = {

            user: null,
            locationName: "",
            totalSlots:"",
            date: null,
            startTime: null,
            endTime: null,
            slots: ''
        }


    }

  handleDate(event, date){
    this.setState({date: date})



  }


  handleStartTime(event, time){

    this.setState({

        startTime: time

    });


  }

    handleEndTime(event, time){

    this.setState({

        endTime: time

    });


  }



check(){

    

    const date = new Date(this.state.date);
    const startTime = new Date(this.state.startTime);
    const endTime = new Date(this.state.endTime);

    const dateDay = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const startHours = startTime.getHours() + 1;
    const startMinutes = startTime.getMinutes() + 1;

    const endHours = endTime.getHours() + 1;
    const endMinutes = endTime.getMinutes() + 1;

    const selectedDate = dateDay + "-" + month + "-" + year;
    const selectedStartTime = startHours + ":" + startMinutes;
    const selectedEndTime = endHours + ":" + endMinutes;
    console.log(selectedDate);



    const notToShow = [];


    firebase.database().ref('bookings/').on('value', snap =>{ 


         if (snap.exists()){

                if (snap.hasChild(this.props.location.state.locationID + selectedDate)){
             
                    
   

    firebase.database().ref('bookings/').orderByChild('locationID').equalTo(this.props.location.state.locationID + selectedDate).on('child_added', snap =>{
           

       

        if (endHours >= parseInt(snap.val().endHours) && endMinutes >= parseInt(snap.val().endMinutes)){

        
            

          
            
            notToShow.push(snap.val().slotName);

        }

    

 






    });


  


}}
    
    
    


    for(var i = 0; i < this.state.slots.length; i++){

      console.log(this.state.slots.length);

    }


     });

   

    const toShow = [];
    const thisIs = this;

 



   


    //   firebase.database().ref('locations/').child(this.props.location.state.locationID).child('slots').on('child_added', snap =>{
           
    //        var flag = true;
          
          


    //         if (flag){

    //             toShow.push(snap.val());
                
    //         }


    //         if (toShow){

    //             thisIs.setState({

    //                 slots: toShow

    //             });

    //             console.log('flag');


    //         }

            
        
       

    // });





}


componentWillMount(){

const thisIs = this;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
       const userr = firebase.auth().currentUser.displayName;

           thisIs.setState({

        user: userr

    });

  } else {
    // No user is signed in.
  }
});

    

    firebase.database().ref('locations/' + this.props.location.state.locationID).on('value', snap =>{

        this.setState({

            locationName: snap.val().locationName,
            totalSlots: snap.val().slotsNumber


        });

       
    });

    var a = [];
    
          firebase.database().ref('locations/').child(this.props.location.state.locationID).child('slots').on('child_added', snap =>{

          
          
                a.push(snap.val());


                this.setState({

                    slots: a

                });

            
        
       

    });
 

}


    render(){

        



        let slots = '';

        if (this.state.slots){
        
                 let i = 0;
        slots =  Object.keys(this.state.slots).map((key, i) => {

      

return(
    
        <button key={i++}className={this.state.slots[key].book === "not booked"? "slotButton" : "slotButtonBooked"}
         disabled={this.state.slots[key].book === "not booked"? false : true} 
         
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
            
        }
      

        return(

            <Paper zDepth={1} style={paperStyle}>

                
                <p>Location Name: {this.state.locationName}</p>
                <p>Total Slots: {this.state.totalSlots}</p>
                <DatePicker hintText="Date" container="inline" value={this.state.date} onChange={this.handleDate.bind(this)} />
                <TimePicker hintText="Start Time" value={this.state.startTime} onChange={this.handleStartTime.bind(this)}/>
                <TimePicker hintText="End Timet" value={this.state.endTime} onChange={this.handleEndTime.bind(this)}/>
                <RaisedButton label="Check" secondary={true} onTouchTap={this.check.bind(this)}/>
                <p>{slots}</p>
            
                

            </Paper>



        );


    }



}

export default BookSlot;