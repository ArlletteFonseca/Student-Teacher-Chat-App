import React from 'react';
import { Link } from 'react-router-dom';

export default function chatScreen(props) {

  return (
    <div className="chatContainer container-fluid d-flex flex-column justify-content-between">
      <Link to='./teacherSearch'><i className="fas fa-chevron-left fa-2x back"></i></Link>
      <div className="chatContainer d-flex flex-column justify-content-around">
        <ul id="messageList" className="messages">
          <li id="first"></li>
        </ul>
        <form onSubmit={props.onSubmit} className="form" action="">

          <div className="col p-0 d-flex justify-content-around align-items-end chat">
              <input id="chatMessage" className="chatInput" onChange={props.onChange}/>
            <button className="btn-success">Send</button>
          </div>
        </form>
      </div>

    </div>

  );
}
