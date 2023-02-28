import React from 'react';

function UserLink(props) {
  return (
    <a href="#" onClick={props.onClick}>
      Mon compte
    </a>
  );
}

export default UserLink;
