
import React from 'react';

export default function teacherSearch() {
  return (
    <div className="container my-container d-flex flex-column justify-content-center align-items-center ">
      <div className="row my-row ">
        <div className="col my-column">
          <h1 className="logo">CHAT BOX</h1>
        </div>
      </div>
      <div className="row my-row">
        <div className="col my-column">
          <h4 className="heading">Help a Student!</h4>
        </div>
      </div>
      <form className=" d-flex  flex-column align-items-center justify-content-around mb-5">
        <div className="row form-group">
          <div className="col my-column">

            <input type="text" placeholder="Search by name" className="input"/>
        </div>
          </div>
          <div className="row form-group">
            <div className="col my-column">
              <button type="button" className="btn button ">Browse by Name</button>
            </div>
          </div>
    </form>
        <div className="row ">
          <div className=" my-col d-flex align-items-end">
            <div className="row-menu d-flex align-items-end justify-content-between">
              <div><i className="fas fa-sign-out-alt fa-2x"></i></div>
              <div><i className="fas fa-envelope fa-2x"></i></div>
              <div><i className="fas fa-user fa-2x"></i></div>
            </div>
          </div>
        </div>
    </div>
  );
}
