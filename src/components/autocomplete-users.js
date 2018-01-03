// @flow
import { h, Component } from 'preact'
import fuzzysearch from 'fuzzysearch'
import { filter, uniq } from 'ramda'
import Input from './input'
import User, { UserSelect, UserParticipant } from './user'

import s from '../styles/autocomplete-users.css'

type Props = {
  users: Object,
  usersArray: Array<Object>,
  setParticipants: Function
};

const filterUsersBySearchQuery = (users, searchQuery) =>
  users.filter(user => {
    return fuzzysearch(
      searchQuery.toLowerCase(),
      user.username.toLowerCase()
    )
  })

const filterUsersByAlreadySelected =
  (users: array, alreadySelectedUsers: array) =>
    users.filter(user => !alreadySelectedUsers.includes(user.id))

class AutocompleteUsers extends Component<Props> {
  constructor() {
    super()
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputFocusOut = this.handleInputFocusOut.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSelectUser = this.handleSelectUser.bind(this)
    this.handleRemoveUser = this.handleRemoveUser.bind(this)

    this.state = {
      clickedOnInput: false,
      searchQuery: '',
      selectedUsers: []
    }
  }

  handleInputFocus(event: Event) {
    this.setState({clickedOnInput: true})
  }

  handleInputFocusOut(event: Event) {
    event.preventDefault()
    setTimeout(() => {
      // this.setState({clickedOnInput: false})
    }, 200)
  }

  handleInput(event: Event) {
    this.setState({
      searchQuery: event.target.value
    })
  }

  handleSelectUser(event, userId) {
    console.log(userId)
    this.setState({
      selectedUsers:
        uniq([...this.state.selectedUsers, userId])
    }, () => {
      this.props.setParticipants(this.state.selectedUsers)
    })
    this.setState({clickedOnInput: false})
    console.log(this.state)
  }

  handleRemoveUser(event, userId) {
    this.setState({
      selectedUsers: this.state.selectedUsers
        .filter(_userId => _userId !== userId)
    })
  }

  renderSuggestedUsers() {
    const suggestedUsers = filterUsersBySearchQuery(
      this.props.usersArray,
      this.state.searchQuery
    )
    const filteredUsers = filterUsersByAlreadySelected(
      suggestedUsers,
      this.state.selectedUsers
    )
    const users = filteredUsers.map(user => (
      <UserSelect userName={user.username}
        userPhoto={user.avatarUrl}
        homeFloor={user.homeFloor.toString()}
        id={user.id}
        onClick={this.handleSelectUser} />
    ))
    return users
  }

  renderSelectedUsers() {
    const selectedUsers = this.props.usersArray
      .filter(user => this.state.selectedUsers.includes(user.id))
      .map(user => (
        <UserParticipant userName={user.username}
          userPhoto={user.avatarUrl}
          id={user.id}
          onClick={this.handleSelectUser} 
          onCloseButtonClick={this.handleRemoveUser} />
        ))
    return (
      <div className={s.selectedUsers}>
        {selectedUsers}
      </div>
    )
  }

  render({ styles }) {
    return (
      <div>
        <Input label='Участники' placeholder='Например, Тор Одинович'
          ref={(ref) => this.inputElement = ref}
            onFocus={this.handleInputFocus}
            value={this.state.searchQuery}
            onFocusOut={this.handleInputFocusOut}
            onInput={this.handleInput} />
        <div className={s.suggestedUsersContainer}>
          {this.state.clickedOnInput && (
            <div className={s.suggestedUsers}>
              {this.renderSuggestedUsers()}
            </div>
          )}
        </div>
        <div>
          {this.renderSelectedUsers()}
        </div>
      </div>
    )
  }
}

export default AutocompleteUsers