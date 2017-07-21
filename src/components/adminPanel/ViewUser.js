import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import * as firebase from 'firebase';


const paperStyle = {


    width: '80%',
    height: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    padding: '10px'


}


class ViewUsers extends Component{

    constructor(props){

        super(props);

        this.state = {

            users: ''

        }


    }

   handleRemove(key){

    firebase.database().ref('users/' + key).remove();



   }



    componentDidMount(){

        firebase.database().ref('users').orderByChild('type').equalTo('user').on('value', snap =>{

        
            this.setState({

                users: snap.val()

            });


        });



    }

    render(){

   
        const users = Object.keys(this.state.users).map((key, i) => {

            return(

                <Paper zDepth={1} style={paperStyle} key={i++}>
                <p>User Name: {this.state.users[key].name}</p>
                <p>Email: {this.state.users[key].email}</p>
                <RaisedButton label="Delete" secondary={true} onTouchTap={this.handleRemove.bind(this, key)}/>
                </Paper>


            );
        

       

        })


        return(

            <div>

                {users}

            </div>

        );



    }



}

export default ViewUsers;