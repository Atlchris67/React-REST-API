import React, { useState, useContext} from 'react';
import { Link, useHistory} from 'react-router-dom';
import Form from './Form';
import Context from '../Context'



export default function UserSignUp() {
  const context = useContext(Context.appContext)
  let history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [errors,setErrors] = useState([])
  const change = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case "firstName":
        setFirstName(value);
        break;
        case "lastName":
          setLastName(value);
          break;  
      case "emailAddress":
        setEmail(value);
        break;
      case "password":
        setPass(value);
        break;
      default:
        return;
    }
  }

  const submit = () => {
    // Create user
    const newUser = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data.createUser(newUser)
      .then( errors => {
        if (errors.length) {
          setErrors(errors)
        } else {
          context.actions.signIn(newUser.emailAddress, newUser.password)
            .then(() => 
              //let history = useHistory();
              history.push('/authenticated')    
            );
        }
      })
      .catch((err) => {
        console.log(err);
       // context.history.push('/error');
      });
  
  }

  const cancel = () => {
   context.history.push('/');
  }
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={cancel}
            errors={errors}
            submit={submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <label for="firstName">First Name</label>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  onChange={change}  />
                <label for="lastName">Last Name</label>
                <input 
                  id="lastMame" 
                  name="lastName" 
                  type="text"
                  onChange={change} />
                <label for="emailAddress">Email Address</label>  
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  onChange={change} />
                <label for="password">Password</label>
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  onChange={change} />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
}
