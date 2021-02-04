import React from 'react';

export default function Home(props) {
  return (
    <div className="container my-container d-flex flex-column justify-content-center align-items-center ">
      <div className="row my-row ">
        <div className="col my-column">
          <h1 className="logo">CHAT BOX</h1>
        </div>
      </div>
      <div className="row my-row">
        <div className="col my-column">
          <h4 className="heading">Chat with a Teacher!</h4>
        </div>
      </div>
      <div className="row my-row btn-row ">
        <div className="col my-column">
          <button type="button" className="btn button">Student Login</button>
        </div>
      </div>
      <div className="row my-row btn-row">
        <div className="col my-column">
          <button type="button" className="btn button ">Teacher Login</button>
        </div>
      </div>

    </div>
  );
}
