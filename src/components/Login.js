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



export default class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            user: null,
            userType: null,
            email: "",
            pass: ""
          
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    componentDidMount(){


        firebase.auth().onAuthStateChanged(() => {
            setTimeout(() => {

                this.setState({
                    user: firebase.auth().currentUser,
                })
                if(this.state.user){
                    
                    firebase.database().ref().child('users').child(this.state.user.uid).on('value', snap => {

                           if (snap.val().type === 'user') 
                            this.props.history.push('/user');
                            else if (snap.val().type === 'admin')
                                this.props.history.push('/admin')
                    });
                    
                    
                  }
                },5)
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
    }


    handleSubmit(e){

        console.log(this.state.email);

        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).then(data=>{
            console.log("logged in")
        }).catch(function(error) {
            alert(error.message)
        });


    }





    

    render(){
        return(
            <div>
                
                    <ValidatorForm onSubmit={this.handleSubmit} 
                    style={style}
                    className="login">
                        <TextValidator
                            value={this.state.email}
                            onChange={this.handleChange}
                            floatingLabelText="Email"
                            name="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        />
                        <br/>
                        <TextValidator
                            value={this.state.pass}
                            onChange={this.handleChange}
                            floatingLabelText="Password"
                            name="pass"
                            type="password"
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br/><br/>
                        
                        <RaisedButton label="Login" primary={true} type="submit"/>
                      
                    </ValidatorForm>
                
                  
            </div>
        )
    }
}