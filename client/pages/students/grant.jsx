import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function brown(props) {
  const history = useHistory();

  function toChatScreen() {
    const path = './chatFormForTeacher';
    history.push(path);
    props.onClick(2);
  }

  return (
    <div className="container-fluid cardContainer d-flex flex-column justify-content-center">
      <Link to='./teacherSearch' className="back" onClick={props.onClickBack}><i className="fas fa-chevron-left fa-2x "></i></Link>
      <div className="card cardContainer text-center d-flex flex-column justify-content-around align-items-center">
        <div className="card-header">
          <div className="card">
            <img src='img/joshgrant2.jpeg'className="img" alt="Student Michael Brown" />
          </div>
        </div>
         <div className="card-body text-center">
        <h5 className="card-title">Josh Grant</h5>
        <p className="card-text">Senior</p>
        <button className="chatBtn " onClick={toChatScreen}>Start Chat</button>
      </div>
      </div>

    </div>
  );
}
