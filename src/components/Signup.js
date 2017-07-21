import React from 'react';
import {RaisedButton} from 'material-ui';
import * as firebase from 'firebase';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const style = {

   
    
    width: '20%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '70px',
  
    
        
}


export default class Signin extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            email:'',
            name:'',
            pass:''
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

        if(ev.target.name==="email"){
            this.setState({
                email: ev.target.value
            })
        }
        else if(ev.target.name==="pass"){
            this.setState({
                pass: ev.target.value
            })
        }
        else if(ev.target.name==="name"){
            this.setState({
                name: ev.target.value
            })
        }
    }


    handleSubmit(e){


        e.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then(data=>{

            console.log("Account created in");

            firebase.auth().currentUser.updateProfile({
                displayName: this.state.name
            });

            firebase.database().ref('users/'+ firebase.auth().currentUser.uid).set({

                name:this.state.name,
                email:this.state.email,
                password:this.state.pass,
                type: 'user'

            })

            this.props.history.push('/user');

        }).catch(function(error) {
            alert(error.message)
        });
    }


 
    render(){
        return(
            <div>
               
                <ValidatorForm onSubmit={this.handleSubmit}
                style={style}>

                        <TextValidator
                            value={this.state.name}
                            onChange={this.handleChange}
                            floatingLabelText="Name"
                            name="name"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <TextValidator
                            value={this.state.email}
                            onChange={this.handleChange}
                            floatingLabelText="Email"
                            name="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />

                        <TextValidator
                            value={this.state.pass}
                            onChange={this.handleChange}
                            floatingLabelText="Password"
                            name="pass"
                            type="password"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <RaisedButton label="Signup" primary={true} type="submit"/>

                    </ValidatorForm>
                
                    
                
                    {/*this.props.history.push('/user')*/}
            </div>
        )
    }
}