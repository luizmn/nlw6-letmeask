import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';
import '../styles/global.scss';


export function NewRoom() {

  //const { user } = useAuth();

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
          <h2>Create new room</h2>
          <form>
            <input 
              type="text"
              placeholder="Room name"
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