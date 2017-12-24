import { h } from 'preact'
import { connect } from 'preact-redux'
import CreateEventConfirm from '../components/create-event-confirm'
import Modal from '../components/modal'

import { showModal, hideModal } from '../actions/modals'

export const CreateEventConfirmModal = (props) => (
  <Modal {...props}>
    <CreateEventConfirm {...props} />
  </Modal>
)

const MODAL_NAME = 'CreateEventConfirm'
const mapStateToProps = state => {
  console.log('mapStateToProps', state.modals[MODAL_NAME])
  return {
    isVisible: state.modals[MODAL_NAME].isVisible || false,
    data: state.modals[MODAL_NAME].data || {}
  }
}

const mapDispatchToProps = dispatch => ({
  showModalEvent: () => dispatch(showModal(MODAL_NAME)),
  hideModalEvent: () => dispatch(hideModal(MODAL_NAME))
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(CreateEventConfirmModal)
