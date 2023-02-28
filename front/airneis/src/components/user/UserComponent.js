import React from 'react';
import UserLink from './UserLink';

function UserComponent() {
  function handleUserLinkClick() {
    // Ouvrir la page de connexion ou de profil de l'utilisateur
  }

  return (
    <div>
      <UserLink onClick={handleUserLinkClick} />
    </div>
  );
}

export default UserComponent;
