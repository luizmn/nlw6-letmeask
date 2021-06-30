import './styles.scss';

import logoImg from '../../assets/images/logo.svg';

import { RoomCode } from "../RoomCode";
import { Link, useParams } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { database } from "../../services/firebase";
// import { useEffect } from "react";
// import { useState } from "react";


type RoomParams = {
  id: string;
}


export function Header() {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  // const { user } = useAuth();
  // const [roomOwner, setRoomOwner] = useState('');

  // useEffect(() => {
  //   const roomRef = database.ref(`rooms/${roomId}`); // Get the room reference
      
  //   // .orderBy("createdAt", "asc").limit(10)
  //    roomRef.on('value', room => { // Get room questions
  //     const databaseRoom = room.val();
  //     const firebaseAuthor: string = databaseRoom.authorId ?? {};
  //     setRoomOwner(firebaseAuthor);
     
  //   })  

  // }, [roomId, user?.id]);
  
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