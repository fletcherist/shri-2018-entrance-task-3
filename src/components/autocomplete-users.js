// @flow
import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import fuzzysearch from 'fuzzysearch'
import { filter } from 'ramda'
import Input from './input'
import User from './user'

type Props = {
  users: Object,
  usersArray: Array<Object>
};

const filterUsers = (users, searchQuery) =>
  users.filter(user => {
    return fuzzysearch(
      searchQuery.toLowerCase(),
      user.username.toLowerCase()
    )
  })

class AutocompleteUsers extends Component<Props> {
  constructor() {
    super()
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputFocusOut = this.handleInputFocusOut.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.state = {
      clickedOnInput: true,
      searchQuery: ''
    }
  }
  handleClickOutside(event: Event) {
    console.log(this.suggestUserElement, event.target)
  }

  handleInputFocus(event: Event) {
    this.setState({clickedOnInput: true})
  }

  handleInputFocusOut(event: Event) {
    this.setState({clickedOnInput: false})
  }

  handleInput(event: Event) {
    this.setState({
      searchQuery: event.target.value
    })
  }

  renderSuggestedUsers() {
    const suggestedUsers = filterUsers(
      this.props.usersArray,
      this.state.searchQuery
    )
    const users = suggestedUsers.map(user => (
      <User userName={user.username}
        userPhoto={user.avatarUrl} />
    ))
    return users
  }

  render() {
    return (
      <div>
        <Input label='Участники' placeholder='Например, Тор Одинович'
          ref={(ref) => this.inputElement = ref}
            onFocus={this.handleInputFocus}
            value={this.state.searchQuery}
            onFocusOut={this.handleInputFocusOut}
            onInput={this.handleInput} />
        <div>
          {this.state.clickedOnInput && (
            <div>
              {this.renderSuggestedUsers()}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default AutocompleteUsers