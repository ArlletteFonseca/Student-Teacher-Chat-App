import React from 'react';
import { Link } from 'react-router-dom';

export default function chatScreen(props) {
  const listMessages = props.oldMessages.map(msg =>

    <ul key={msg.chatID} className="list-group m-2 listWidth">
      <li className="list-group-item d-flex justify-content-between align-items-center">{msg.message}</li>
      </ul>
  );

  const textOfRecvMessages = props.recvMessages.map((msg, chatID) =>
    <ul key={chatID} className="list-group m-2 listWidth">
      <li className="list-group-item d-flex justify-content-between align-items-center">{msg}</li>
    </ul>
  );

  return (
    <div className="container-fluid my-container d-flex flex-column align-items-center  ">
      <Link to='./teacherSearch' className="arrowWidth"><i className="fas fa-chevron-left fa-2x back arrowWidth"></i></Link>

      {listMessages}
      {textOfRecvMessages}
      <form onSubmit={props.onSubmit} id="form" className="form fixed  " action="">
             <input id="input" className="chatInput" onChange={props.onChange} />
           <button className="btn-success">Send</button>
       </form>
    </div>
  );
}
