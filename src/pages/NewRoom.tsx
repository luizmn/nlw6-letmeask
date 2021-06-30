import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';

import { FormEvent } from 'react';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import '../styles/global.scss';
import { useState } from 'react';
import { database } from '../services/firebase';


export function NewRoom() {

  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState('');

  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

      if (newRoom.trim() === '') {
        return;
      }

      const roomRef = database.ref('rooms');

      const firebaseRoom = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
      })

      history.push(`/rooms/${firebaseRoom.key}`)

  }

  return (

    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Q &amp; A Illustration" />
        <strong>Create Q&amp;A live rooms</strong>
        <p>Answer to your audience in realtime!</p>
      </aside>
        <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Create new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Room name"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Create room
            </Button>
          </form>
          <p>
            Want to join an existing room? <Link to="/">click here</Link>
          </p>
        </div>
      </main>
    </div>
	  )
}