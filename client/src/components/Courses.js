import React,{ useContext } from 'react';
import Context from '../Context'

export default () => {
  const context = useContext(Context.Context)

  const authUser = context.authenticatedUser;
  return (

    <div class="wrap main--grid">
        <a className="course--module course--link" href="course-detail.html">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">Build a Basic Bookcase</h3>
        </a>

        <a className="course--module course--add--module" href="create-course.html">
            <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                New Course
            </span>
        </a>
    </div>

  );
}