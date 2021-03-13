import React from 'react';
import { useHistory } from 'react-router-dom';

export default function teacherLogin(props) {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const path = './studentSearch';
    history.push(path);
  }

  return (
    <div className="container-fluid my-container d-flex flex-column justify-content-center align-items-center ">
      <div className="row ">
        <div className="col">
          <img src='img/chatbox4.jpg' alt="chatbox logo" className="logo"/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4 className="heading">Student Login</h4>
        </div>
      </div>
      <form onSubmit={handleSubmit} className=" justify-content-center align-items-center">
        <div className="row  form-group input-row">
          <div className="col">
            <input type="text" placeholder="Enter email" className="input" required />
          </div>
        </div>
        <div className="row form-group input-row">
          <div className="col ">
            <input type="text" placeholder="Enter password" className="input" required />
          </div>
        </div>
        <div className="row submit-row">
          <div className="col ">
            <button type="submit" className="btn btnRed">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}
