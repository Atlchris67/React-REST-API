import React,{ useContext } from 'react';
import Context from '../Context'

export default () => {
  const context = useContext(Context.appContext)

  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.firstName} is authenticated!</h1>
      <p>Your username is {authUser.emailAddress}.</p>
    </div>
  </div>
  );
}