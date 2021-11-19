import { DialogContent, DialogOverlay } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import '@reach/dialog/styles.css';
import styled from 'styled-components';

const DialogStyles = styled.div`
  @media (max-width: 1000px) {
    div[data-reach-dialog-content] {
      width: 55vw;
    }
  }
  @media (max-width: 800px) {
    div[data-reach-dialog-content] {
      width: 60vw;
    }
  }
  @media (max-width: 650px) {
    div[data-reach-dialog-content] {
      width: 70vw;
    }
  }
  @media (max-width: 600px) {
    div[data-reach-dialog-content] {
      width: 80vw;
    }
  }
  @media (max-width: 550px) {
    div[data-reach-dialog-content] {
      width: 90vw;
    }
  }
  @media (max-width: 500px) {
    div[data-reach-dialog-content] {
      width: 95vw;
    }
  }
`;

const ModalCloseStyles = styled.button`
  color: var(--black);
  font-size: 2.5rem;
  text-shadow: none;

  &:hover {
    transition: 0.3s ease transform;
    transform: translate3d(0, -2px, 0);
  }
`;

const StandardModalHeader = (props) => {
  const { onHide, caption } = props;
  return (
    <>
      <div
        className="modal-header"
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className="modal-title">{caption}</div>
        <ModalCloseStyles
          type="button"
          className="close-button"
          onClick={onHide}
        >
          <VisuallyHidden>Close</VisuallyHidden>
          <span>×</span>
        </ModalCloseStyles>
      </div>
      <hr />
    </>
  );
};

export default function Modal({
  isOpen,
  onHide,
  contentLabel,
  headerCaption,
  focusRef = null,
  children,
}) {
  return (
    <DialogOverlay
      allowPinchZoom
      initialFocusRef={focusRef}
      onDismiss={onHide}
      isOpen={isOpen}
    >
      <DialogStyles>
        <DialogContent
          aria-label={contentLabel}
          style={{
            background: 'var(--modalBackground)',
            boxShadow: 'var(--level-4)',
            borderRadius: 'var(--borderRadius)',
            maxWidth: '55rem',
          }}
        >
          <div>
            <div>
              <StandardModalHeader caption={headerCaption} onHide={onHide} />
              {children}
            </div>
          </div>
        </DialogContent>
      </DialogStyles>
    </DialogOverlay>
  );
}
