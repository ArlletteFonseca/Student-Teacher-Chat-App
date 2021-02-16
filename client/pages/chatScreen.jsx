import React from 'react';
import { Link } from 'react-router-dom';

export default function chatScreen(props) {

  // const listMessages = props.newMessage.map(msg =>
  //     <ul key={msg.chatID}>
  //       <li className="messageBox">{msg.message}</li>
  //     </ul>
  // );

  const textOfRecvMessages = props.recvMessages.map((msg, chatID) =>
    <ul key={chatID}>
      <li className="messageBox">{msg}</li>
    </ul>
  );

  return (
    <div className="chatContainer container-fluid d-flex flex-column justify-content-between">
      <Link to='./teacherSearch'><i className="fas fa-chevron-left fa-2x back"></i></Link>
      <div className="chatContainer d-flex flex-column justify-content-around">
        <div>
          {textOfRecvMessages}
        </div>
        <form onSubmit={props.onSubmit} id="form" className="form" action="">
          <div className="col p-0 d-flex justify-content-around align-items-end chat">
              <input id="input" className="chatInput" onChange={props.onChange} />
            <button className="btn-success">Send</button>
          </div>
        </form>
      </div>

    </div>

  );
}
