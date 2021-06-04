import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalOverlayStyles = styled.div`
  background-color: #999999;
  height: 100vh;
  left: 0;
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 500;
`;

const ModalWrapperStyles = styled.div`
  display: flex;
  justify-content: center;
  left: 0;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 25%;
  width: 100%;
  z-index: 1000;
`;

const ModalStyles = styled.div`
  align-items: center;
  background: var(--background);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin: 1.8rem;
  max-width: 500px;
  position: relative;
  z-index: 100;
`;

const ModalHeaderStyles = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 1.8rem 0.95rem;
`;

const ModalTitleStyles = styled.h2`
  margin-bottom: 0.4rem;
`;

const ModalButtonStyles = styled.button`
  // border-top: 1px solid var(--primary);
  cursor: pointer;
  font-weight: bold;
  padding: 2rem;
  width: 100%;
`;

const ModalDescriptionStyles = styled.span`
  padding: 2rem;
  font-size: 2rem;
  text-align: center;
`;

const Modal = ({ isVisible, hideModal, title, message, children }) =>
  isVisible
    ? createPortal(
        <>
          <ModalOverlayStyles />
          <ModalWrapperStyles
            aria-modal
            aria-hidden={!isVisible}
            tabIndex={-1}
            role="dialog"
            aria-label={title}
          >
            <ModalStyles>
              <ModalHeaderStyles>
                <ModalTitleStyles>{title}</ModalTitleStyles>
                <ModalDescriptionStyles>
                  {message}
                  {children}
                </ModalDescriptionStyles>
              </ModalHeaderStyles>
              <ModalButtonStyles type="button" onClick={hideModal}>
                Close
              </ModalButtonStyles>
            </ModalStyles>
          </ModalWrapperStyles>
        </>,
        document.body
      )
    : null;

export default Modal;
