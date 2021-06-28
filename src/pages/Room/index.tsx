import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom'

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import './styles.scss';
import { useRoom } from '../../hooks/useRoom';

type RoomParams = {
  id: string;
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const {questions, title } = useRoom(roomId);
  

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const createdFormatted = today.toISOString();

    console.log("time formatted:");
    console.log(createdFormatted);

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
      createdAt: createdFormatted,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} question(s)</span> }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="What would you like to ask?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>To send a question, <button>you must log in</button>.</span>
            ) }
            <Button type="submit" disabled={!user}>Send question</Button>
          </div>
        </form>

        {/* {JSON.stringify(questions)} display question object*/}
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
              key={question.id}
              content={question.content}
              author={question.author}
              createdAt={format(parseISO(question.createdAt), 'dd/MMM/yyyy - HH:mm:ss a', { locale: ptBR }) || "N/A"}
              />
            );

          })}
        </div>
      </main>
    </div>
  );
}