import React from 'react'

import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';




const DeleteConfirm = ({ modal, toggle, confirmModal, id,message }) => {
    
    return (
        <Modal  isOpen={modal} toggle={toggle} className="custom-modal">           
               <ModalHeader toggle={toggle}>Delete Confirmation</ModalHeader>              
                  <ModalBody className="inner ">{message}</ModalBody>
                  <ModalFooter className="inline-flex float-right">
                      <button className="btn-custom-light mx-2" onClick={toggle}>
                        Cancel
                      </button>
                      <button className="btn-custom" onClick={() => confirmModal(id) }>
                        Delete
                      </button>
                  </ModalFooter>
        </Modal>
    )
}

export default DeleteConfirm;