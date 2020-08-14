import React, { Component } from 'react';

import "./Login.css";
import axios from 'axios';
import history from './../history';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };

  
  
export class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: null,
          password: null,
          formErrors: {
            email: "",
            password: ""
          },
          items: {},
          data: {fname: 'Kishor',
          lname: 'Meshram',
          email: 'kishor@test.com', 
          accountType:'cust_',
          zip:'441601'}
        };

        this.handleClick = this.handleClick.bind(this)
        this.handlePOSTClick = this.handlePOSTClick.bind(this)
      }

    handleClick () {
    axios.get('https://www.googleapis.com/admin/directory/v1/users/')
      .then(response => this.setState({username: response.data.fname+' '+response.data.lname}))
  }


  handlePOSTClick () {
      console.log("POST Button Clicked");
    
      const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fname: '',
        lname: '',
        email: '', 
        })
    };
      axios.post('https://www.googleapis.com/admin/directory/v1/users/', this.state.data,requestOptions)
    .then(function (response) {
    console.log(response);
    })   

   

  }

         
    
      handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) {

       console.log(`
            --SUBMITTING--
            Email: ${this.state.email}
            Password: ${this.state.password}
            JSON:${this.state.items.fname}
          `);
          history.push('/');

        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    
      handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
         
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      };
    
      render() {
        const { formErrors } = this.state;
    
        return (
          
          <div className="wrapper">
            <div className="form-wrapper">
              
              <h1>Sign-in Page</h1>
              <img src="erlogo.png" alt="Education Rescue" class="picture"></img>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input
                    className={formErrors.email.length > 0 ? "error" : null}
                    placeholder="Email"
                    type="email"
                    name="email"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                  )}
                </div>
                <div className="password">
                  <label htmlFor="password">Password</label>
                  <input
                    className={formErrors.password.length > 0 ? "error" : null}
                    placeholder="Password"
                    type="password"
                    name="password"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}
                </div>
                <div className="createAccount">
                  <button type="submit">Login</button>
                  <small onClick={() => history.push('/Signup')}>Don't Have an Account? Click Here</small>
                </div>
              </form>

              <button className='button' onClick={this.handleClick}>GET Data</button>
              <button className='button' onClick={this.handlePOSTClick}>POST Data</button>
               <p>{this.state.username}</p>
            </div>
          </div>
        );
      }
    
}

export default Login;