import { useHistory, useParams } from 'react-router-dom'

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import deleteImg from '../../assets/images/delete.svg';
import closeImg from '../../assets/images/close.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import { Button } from '../../components/Button';
import { Question } from '../../components/Question';

import './styles.scss';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import { useState } from 'react';
import Modal from 'react-modal';
import { Header } from '../../components/Header';

Modal.setAppElement('#root');

type RoomParams = {
  id: string;
  // authorId: string;
}


export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const {questions, title } = useRoom(roomId);
  
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  //____________________BEGIN Modal layout_________________________________
  //TODO: create a modal component

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      overflow: 'auto',
    }
};
 //____________________END Modal layout_________________________________


 function handleOpenModal () {
  setmodalIsOpen(true);
  }
  
  function handleCloseModal () {
    setmodalIsOpen(false);
  }


  async function handleEndRoom() {
     if (window.confirm('Warning: This action is irreversible. Do you want to terminate this room?  ')) {
      await database.ref(`rooms/${roomId}`).update({
        closedAt: new Date(),
      })

      history.push('/');
      }
    
  }

  async function handleDeleteQuestion(questionId: string) {
       await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
       handleCloseModal();
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  
  async function handleHighlightQuestion(questionId: string) {
  
  const isHighlighted = await database.ref(`rooms/${roomId}/questions/${questionId}/isHighlighted`).once('value');

  
  if (isHighlighted.val() !== true) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  } else {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: false,
    });
  }
  }
  return (
    <div id="page-room">
      <Header />
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} question(s)</span> }
          <div className="terminate-button">
            <Button 
            isOutlined 
            onClick={handleEndRoom}
            >
              Terminate Room
            </Button>
          </div>
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
              createdAt={format(parseISO(question.createdAt), 'dd/MMM/yyyy - HH:mm:ss a', { locale: ptBR }) || "N/A"}
              >
                <div>
                 {!question.isAnswered && (
                   <>
                    <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={checkImg} alt="Mark question as answered"/>
                    </button>
                    <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={answerImg} alt="Highlight the question"/>
                    </button>
                   </>
                 )}
                  <button
                  type="button"
                  onClick={handleOpenModal}
                  >
                    <img src={deleteImg} alt="Delete question"/>
                  </button>
                </div>
                <Modal 
                id="confirm-modal"
                isOpen={modalIsOpen}
                style={customStyles}
                >
                  <button 
                    type="button" 
                    onClick={handleCloseModal} 
                    className="react-modal-close"
                  >
                  <img src={closeImg} alt="Fechar modal" />
                  </button>
                  <h2>Warning!</h2>
                  <span>This action is irreversible. Do you want to delete the question?</span>
                  <div className="confirm-buttons">
                    <p>
                      <Button 
                      isOutlined 
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="confirm-button"
                      >
                        Yes, delete.
                      </Button>
                      <Button
                      onClick={handleCloseModal}
                      className="confirm-button"
                      >
                        Cancel
                      </Button>
                    </p>
                  </div>
                </Modal>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}