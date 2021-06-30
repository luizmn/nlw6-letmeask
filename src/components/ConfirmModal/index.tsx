import { useState } from 'react';
import ReactModal from 'react-modal';

export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleOpenModal: () => void;
}

export function ConfirmModal({isOpen, onRequestClose}: ModalProps) {
  
     return (
      <div>
        
          <h1>Teste modal</h1>

      </div>
    );
  

}