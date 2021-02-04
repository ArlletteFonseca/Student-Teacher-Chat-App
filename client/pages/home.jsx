import React from 'react';

export default function Home(props) {
  return (
    <div className="container my-container d-flex flex-column justify-content-center align-items-center">
      <div className="row my-row">
        <div className="col my-column">
          <h1 className="logo">CHAT BOX</h1>
        </div>
      </div>
      <div className="row my-row">
        <div className="col my-column">
          <h4 className="heading">Teacher Login</h4>
        </div>
      </div>
      <form className=" justify-content-center align-items-center w-70">
        <div className="row  form-group">
          <div className="col my-column">
            <label className="label">Email address</label>
            <input type="text" placeholder="Enter email" className="input"/>
        </div>
          </div>
          <div className="row form-group">
            <div className="col my-column">
              <label className="label">Password</label>
              <input type="text" placeholder="Enter password" className="input"/>
        </div>
            </div>
            <div className="row form-group my-row">
              <div className="col my-column ">
                <button type="button" className="btn button">Teacher Login</button>
              </div>
            </div>
    </form>

        </div>
  );
}
