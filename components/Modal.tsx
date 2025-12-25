import { ReactNode } from 'react';
import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Close,
} from '@radix-ui/react-dialog';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onHide: (open: boolean) => void;
  contentLabel: string;
  headerCaption?: ReactNode;
  children: ReactNode;
}

const OverlayStyles = styled.div`
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  top: 0%;
  left: 0%;
  right: 0%;
  bottom: 0%;
  display: grid;
  place-items: center;
  overflow-y: auto;
`;

const ContentStyles = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  background: var(--modalBackground);
  box-shadow: var(--level-4);
  padding: 15px;
  border-radius: var(--borderRadius);
  width: 50vw;

  @media (max-width: 1000px) {
    width: 65vw;
  }
  @media (max-width: 800px) {
    width: 68vw;
  }
  @media (max-width: 650px) {
    width: 70vw;
  }
  @media (max-width: 600px) {
    width: 80vw;
  }
  @media (max-width: 550px) {
    width: 90vw;
  }
  @media (max-width: 500px) {
    width: 95vw;
  }
`;
export default function Modal({
  isOpen,
  onHide,
  contentLabel,
  headerCaption,
  children,
}: ModalProps) {
  return (
    <Root open={isOpen} onOpenChange={onHide}>
      <Portal>
        <OverlayStyles>
          <Overlay>
            <ContentStyles>
              <Content>
                {/* <div style={{ display: 'grid', margin: '2rem', borderRadius: '4px'}}> */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'center',
                    justifyContent: headerCaption
                      ? 'space-between'
                      : 'flex-end',
                    marginBottom: '1rem',
                  }}
                >
                  {headerCaption && <Title>{headerCaption}</Title>}
                  <Close aria-label="Close">x</Close>
                </div>
                <Description className="sr-only">{contentLabel}</Description>
                {children}
                {/* </div> */}
              </Content>
            </ContentStyles>
          </Overlay>
        </OverlayStyles>
      </Portal>
    </Root>
  );
}
