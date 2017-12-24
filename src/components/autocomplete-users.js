// @flow
import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import fuzzysearch from 'fuzzysearch'
import { filter, uniq } from 'ramda'
import Input from './input'
import User from './user'

type Props = {
  users: Object,
  usersArray: Array<Object>
};

const suggestedUsersContainerStyles = state => ({
  position: 'relative'
})

const suggestedUsersStyles = state => {
  console.log(state)
  return {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    boxShadow: '0 1px 10px 0 rgba(0,44,92,0.28)',
    borderRadius: '4px',
    padding: '5px 0'

  }
}

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
    this.state = {
      clickedOnInput: true,
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
      this.setState({clickedOnInput: false})
    }, 200)
  }

  handleInput(event: Event) {
    this.setState({
      searchQuery: event.target.value
    })
  }

  handleSelectUser(event, userId) {
    event.preventDefault()
    console.log(userId)
    this.setState({
      selectedUsers:
        uniq([...this.state.selectedUsers, userId])
    })
    this.setState({clickedOnInput: false})
    console.log(this.state)
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
      <User userName={user.username}
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
        <User userName={user.username}
          userPhoto={user.avatarUrl}
          id={user.id}
          onClick={this.handleSelectUser} />
        ))
    return (
      <div>
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
        <div className={styles.suggestedUsersContainerStyles}>
          {this.state.clickedOnInput && (
            <div className={styles.suggestedUsersStyles}>
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

export default connect({
  suggestedUsersContainerStyles,
  suggestedUsersStyles
})(AutocompleteUsers)