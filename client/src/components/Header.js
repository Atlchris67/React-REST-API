import React,{ useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context'


export default function Header() {
  const that = useContext(Context.Context)
  const authUser = that.authenticatedUser;

  return (
    <div className="header">
        <div className="bounds">
          <h1 className="header--logo">MyAuth</h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.name}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
  )
}
