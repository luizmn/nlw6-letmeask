import './styles.scss';

import logoImg from '../../assets/images/logo.svg';

import { RoomCode } from "../RoomCode";
import { Link, useParams } from "react-router-dom";

type RoomParams = {
  id: string;
}


export function Header() {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  return (
    <header>
      <div className="content">
        <Link to='/'>
          <img src={logoImg} alt="Letmeask" />
        </Link>
        <RoomCode code={roomId}/>
      </div>
    </header>
  )
}