import React from 'react';
import { Link } from 'react-router-dom';

export default function chatScreen() {
  return (
    <div className="chatContainer container-fluid d-flex flex-column justify-content-between">
      <Link to='./teacherSearch'><i className="fas fa-chevron-left fa-2x back"></i></Link>
      <div className="chatContainer d-flex flex-column justify-content-around">
        <ul className="messages"></ul>
        <form className="form" action="">

          <div className="col p-0 d-flex justify-content-between align-items-end">
            <i className="fas fa-plus green fa-2x"></i>
              <input className="input"/>
            <i className="fas fa-arrow-right green fa-2x"></i>
          </div>
        </form>
      </div>

    </div>

  );
}
