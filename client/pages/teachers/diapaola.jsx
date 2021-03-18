import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function brown(props) {
  const history = useHistory();

  function toChatScreen() {
    const path = './chatFormForStudent';
    history.push(path);
    props.onClick(1);
  }

  return (
    <div className="container-fluid cardContainer d-flex flex-column justify-content-center">
      <Link to='./teacherList' className="back"><i className="fas fa-chevron-left fa-2x back back-arrow"></i></Link>
      <div className="card cardContainer text-center d-flex flex-column justify-content-around align-items-center">
        <div className="card-header">
          <div className="card">
            <img src='img/brantdiapaola.jpeg' alt="Teacher Dr. Brant Diapaola" className="teacherImg" />
          </div>
        </div>
        <div className="card-body text-center">
        <h5 className="card-title">Dr. Brant Diapaola</h5>
        <p className="card-text">Algebra</p>
        <button className="chatBtn " onClick={toChatScreen}>Start Chat</button>
      </div>
      </div>

    </div>
  );
}
