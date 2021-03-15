import React from 'react';
import { Link } from 'react-router-dom';

export default function home(props) {
  return (
    <div className="container-fluid my-container d-flex flex-column justify-content-center  align-items-center">
      <div className="row ">
        <div className="col ">
           <h1 className="logo">CHATBOX</h1>
        </div>
      </div>
      <div className="row ">
        <div className="col">
          <h4 className="heading">Chat with a Teacher!</h4>
        </div>
      </div>
      <div className="row  link-row ">
        <div className="col ">
          <Link className="link" to='/studentLogin'>Student Login </Link>
        </div>
      </div>
      <div className="row  link-row" >
        <div className="col">
          <Link className="link" to='/teacherLogin'>Teacher Login </Link>
          </div>
        </div>
      </div>
  );

}
