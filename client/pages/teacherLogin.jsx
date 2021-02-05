import React from 'react';

export default function teacherLogin(props) {

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center ">
      <div className="row w-90">
        <div className="col">
          <h1 className="logo">CHAT BOX</h1>
        </div>
      </div>
      <div className="row">
        <div className="col my-column">
          <h4 className="heading">Teacher Login</h4>
        </div>
      </div>
      <form onSubmit={props.handleSubmit} className=" justify-content-center align-items-center">
        <div className="row  form-group input-row">
          <div className="col">
            <input type="text" placeholder="Enter email" className="input" required/>
        </div>
          </div>
          <div className="row form-group input-row">
            <div className="col ">
              <input type="text" placeholder="Enter password" className="input" required/>
        </div>
            </div>
            <div className="row submit-row">
              <div className="col ">
            <button onClick={props.handleClick} type="submit">Login </button>
              </div>
            </div>
    </form>
        </div>
  );
}
