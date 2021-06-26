import { Button } from '../components/Button';

import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/global.scss';
import '../styles/auth.scss';

export function Main() {
  
  return (
    <main>
      <div className="main-content">
        <img src={logoImg} alt="Letmeask" />
        <button className="create-room">
          <img src={googleIconImg} alt="Google Logo" />
          Create your room with Google
        </button>
        <div className="separator">or join a room</div>
        <form>
          <input 
            type="text"
            placeholder="Insert room number"
          />
          <Button type="submit">
            Join room
          </Button>
        </form>
      </div>   
    </main>
  )
}