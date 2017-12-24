// @flow
import { h, Component } from 'preact'
import { connect } from 'preact-fela'
import Input from './input'
import User from './user'

class AutocompleteUsers extends Component {
  constructor() {
    super()
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputFocusOut = this.handleInputFocusOut.bind(this)
    this.state = {
      clickedOnInput: true
    }
  }
  handleClickOutside(event: Event) {
    console.log(this.suggestUserElement, event.target)
  }

  handleInputFocus(event: Event) {
    console.log('focus')
    this.setState({clickedOnInput: true})
  }

  handleInputFocusOut(event: Event) {
    console.log('focus out')
    this.setState({clickedOnInput: false})
  }
  render() {
    return (
      <div>
        <Input label='Участники' placeholder='Например, Тор Одинович'
          ref={(ref) => this.inputElement = ref}
            onFocus={this.handleInputFocus}
            onFocusOut={this.handleInputFocusOut} />
        <div>
          {this.state.clickedOnInput && (
            <div>
              <User userName='лекс хаха' userPhoto='https://avatars0.githubusercontent.com/u/1813468?s=460&v=4' />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default AutocompleteUsers