import { h } from 'preact'
import { connect } from 'preact-redux'
import RemoveEventConfirm from '../components/remove-event-confirm'
import Modal from '../components/modal'

import { showModal, hideModal } from '../actions/modals'
import {
  removeEvent
} from '../actions/events'

export const RemoveEventConfirmModal = (props) => (
  <Modal {...props}>
    <RemoveEventConfirm {...props} />
  </Modal>
)

const MODAL_NAME = 'RemoveEventConfirm'
const mapStateToProps = state => ({
  isVisible: state.modals[MODAL_NAME].isVisible || false
})

const mapDispatchToProps = dispatch => ({
  showModalEvent: () => dispatch(showModal(MODAL_NAME)),
  hideModalEvent: () => dispatch(hideModal(MODAL_NAME)),
  removeEvent: () => dispatch(removeEvent())
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(RemoveEventConfirmModal)
