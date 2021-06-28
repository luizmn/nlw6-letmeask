// import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
// import { useAuth } from '../../hooks/useAuth';
// import { database } from '../../services/firebase';

import './styles.scss';
import { useRoom } from '../../hooks/useRoom';
import { functionTypeParam } from '@babel/types';
import { database } from '../../services/firebase';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  // const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;

  const {questions, title } = useRoom(roomId);
  
  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    })
    
    history.push('/');
  }
  async function handleDeleteQuestion(questionId: string) {
    //TODO create modal
    if (window.confirm('Warning: This action is irreversible. Do you want to delete question?  ')) {
       await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button 
            isOutlined 
            onClick={handleEndRoom}
            >
              Terminate Room
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} question(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
              key={question.id}
              content={question.content}
              author={question.author}
              createdAt={format(parseISO(question.createdAt), 'dd/MMM/yyyy - HH:mm:ss a', { locale: ptBR }) || "N/A"}
              >
                <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Delete question"/>
                </button>
              </Question>
            );

          })}
        </div>
      </main>
    </div>
  );
}