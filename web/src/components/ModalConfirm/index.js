import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Background, Container, Content, Actions } from './styles';

export default function ModalConfirm({
  children,
  handleConfirm,
  handleCancel,
  show,
}) {
  return (
    <>
      {show ? (
        <Modal>
          <Background />
          <Container>
            <Content>
              <div>{children}</div>

              <Actions>
                <button className="cancel" type="button" onClick={handleCancel}>
                  Cancel
                </button>
                <button
                  className="confirm"
                  type="button"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </Actions>
            </Content>
          </Container>
        </Modal>
      ) : (
        ''
      )}
    </>
  );
}

ModalConfirm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

ModalConfirm.defaultProps = {
  show: false,
};
