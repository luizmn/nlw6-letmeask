import { useHistory, useParams } from 'react-router-dom'

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import closeImg from '../../assets/images/close.svg';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';

import './styles.scss';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import { useState } from 'react';
import Modal from 'react-modal';

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
    await database.ref(`rooms/${roomId}`).update({
      closedAt: new Date(),
    })
    
    history.push('/');
  }
  async function handleDeleteQuestion(questionId: string) {
    //TODO create modal
    // if (window.confirm('Warning: This action is irreversible. Do you want to delete question?  ')) {
       await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
       handleCloseModal();
    //}
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
                onClick={handleOpenModal}
                >
                  <img src={deleteImg} alt="Delete question"/>
                </button>

                <Modal 
                id="confirm-modal"
                isOpen={modalIsOpen}
                style={customStyles}

                appElement={document.getElementById('app') || undefined}
                ariaHideApp={false}
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
                  {/* <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button> */}
                  <Button
                  onClick={handleCloseModal}
                  className="confirm-button"
                  >
                    Cancel
                  </Button>
                  {/* <button onClick={handleCloseModal}>Cancel</button> */}
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