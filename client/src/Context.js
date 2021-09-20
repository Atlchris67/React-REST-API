import React, {useState, useEffect, useContext, Component} from "react";


import {useHistory} from "react-router-dom";
//import Context from "../Context";
import Cookies from "js-cookie";

// import api request methods
import Data from "./Data";

export const appContext = React.createContext(); 


export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.get('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <appContext.Provider value={value}>
        {this.props.children}
      </appContext.Provider>  
    );
  }

  
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
    }
    return user;
  }

  createUser = async (newUser) => {
    const user = await this.data.createUser(newUser.firstName, newUser.lastName, newUser.emailAddress, newUser.password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      const cookieOptions = {
        expires: 1 // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
    }
    return user;
  }


  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = appContext.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <appContext.Consumer>
        {context => <Component {...props} context={context} />}
      </appContext.Consumer>
    );
  }
}

export default {withContext, appContext}
