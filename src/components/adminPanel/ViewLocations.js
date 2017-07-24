import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';



const paperStyle = {


    width: '60%',
    height: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    padding: '10px'


}
class ViewLocations extends Component{


    constructor(props){

        super(props);

        this.state = {

            slots: ''

        }

    }

    componentWillMount(){

        firebase.database().ref('locations/' + this.props.location.state.message).child('slots').on('value', snap => {

            this.setState({

                slots: snap.val()

            });
 console.log(this.state.slots);
        });

        

    }

    render() {

       const slots = Object.keys(this.state.slots).map((key, i) => {
return(
    
        <button className="slotButton"
        >{this.state.slots[key].slotName}</button>
        
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


export default ViewLocations;