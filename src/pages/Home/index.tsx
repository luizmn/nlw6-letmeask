import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { Button } from '../../components/Button';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';

import '../../styles/auth.scss';
import '../../styles/global.scss';
import { FormEvent, useState } from 'react';
import { database } from '../../services/firebase';


export function Home() {
  const history = useHistory();
  const { user, sigInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await sigInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }   

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Q and A Illustration" />
        <strong>Create Q&amp;A live rooms</strong>
        <p>Answer to your audience in realtime!</p>
      </aside>
      <main>
      <div className="main-content">
        <img src={logoImg} alt="Letmeask" />
        <button onClick={handleCreateRoom} className="create-room">
          <img src={googleIconImg} alt="Google Logo" />
          Create your room with Google
        </button>
        <div className="separator">or join a room</div>
        <form onSubmit={handleJoinRoom}>
          <input 
            type="text"
            placeholder="Insert room number"
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
          />
          <Button type="submit">
            Join room
          </Button>
        </form>
      </div>   
    </main>
    </div>
  )
}