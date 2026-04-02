import React, { useEffect, type ReactElement } from 'react'
import styled from './Modal.module.css'


interface ModalProps {
  visible: boolean;
  title?: string;
  onClose?: () => void;
  onConfirm?:() => void;
  maskClosable?: true;
  children?: React.ReactElement[]
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  onClose,
  onConfirm,
  maskClosable = true,
  children
}) => {

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [visible])

  const handleMaskClick = () => {
    if (!maskClosable) return;
    onClose?.();
  }

  const slots = {
    title: null,
    content: null,
    footer: null,
  }
  React.Children.forEach(children, (child: ReactElement) => {
    const { slot } = child.props;
    if (slots && Object.prototype.hasOwnProperty.call(slots, slot)) {
      slots[slot] = child;
    }
  })

  if (!visible) return null;
  return (
    <div className={styled['modal-overlay']} onClick={handleMaskClick}>
      <div className={ styled['modal-content'] } onClick={(e) => e.stopPropagation()}>
        {
          slots.title && <div className='modal-header'>
            { slots.title }
          </div>
        }
        {
          slots.content && <div className='modal-body'>
            { slots.content }
          </div>
        }
        {
          slots.footer && <div className='modal-footer'>
            { slots.footer }
          </div>
        }
      </div>
    </div>
  )
}

interface ModalSlotType {
  children?: React.ReactNode;
  slot: string;
}

export const ModalSlot = ({ children }: ModalSlotType) => children;

export default Modal;
