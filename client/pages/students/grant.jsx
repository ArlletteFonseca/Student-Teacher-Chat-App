import React from 'react';
import { Link } from 'react-router-dom';

export default function brown() {
  return (
    <div className="container-fluid my-container d-flex flex-column justify-content-center align-items-center">
      <div className="m-2 chatLink d-flex justify-content-start">
        <Link to='./teacherSearch'><i className="fas fa-chevron-left fa-2x back"></i></Link>
      </div>
      <div className="card text-center ">
        <div className="card-header">
          <div className="card">
            <img src='img/joshgrant2.jpeg' alt="Student Michael Brown" />
          </div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">Josh Grant</h5>
        <p className="card-text">Senior</p>
        <a href="#" className="chatBtn btn-primary">Start Chat</a>
      </div>
    </div>
  );
}
