import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { database } from "../services/firebase";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  createdAt: string;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  createdAt: string; //added this field to list the 10 latest questions created at room
}>

type RoomParams = {
  id: string;
}

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('');
  const params = useParams<RoomParams>();
    
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`); // Get the room reference
    // .orderBy("createdAt", "asc").limit(10)
    roomRef.on('value', room => { // Get room questions
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};


      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          createdAt: value.createdAt,
        }
      })

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })
  }, [roomId]);

  return { questions, title };
}