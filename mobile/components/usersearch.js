import React from 'react'
import { connect } from 'react-redux'

import { get } from '../data-fetcher'
import { setBusy, storeResult } from '../action'
import { TextInput, View, StyleSheet } from 'react-native'
import Header from './header'
import Repositories from './repositories'

class UserForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { userName: '', data: {} }
    this.onSearchUserClick = this.onSearchUserClick.bind(this)
    this.debounce = this.debounce.bind(this)
    this.bouncer = this.debounce(this.autoTrigger, 300).bind(this)
  }

  onInputChange (userName) {
    this.setState({ userName })

    this.bouncer()
  }

  debounce (execFn, wait) {
    let timer

    return function (args) {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        execFn.apply(this, args)
      }, wait)
    }
  }

  autoTrigger () {
    if (this.cancelTokenFn) {
      this.cancelTokenFn()
      this.cancelTokenFn = null
    }
    this.props.dispatch(setBusy(false))
    this.onSearchUserClick()
  }

  onSearchUserClick () {
    if (this.props.busy) {
      return
    }

    this.props.dispatch(setBusy(true))
    get(`https://api.github.com/users/${this.state.userName}/repos`).then(data => {
      console.log(this.state.userName)
      this.props.dispatch(setBusy(false))
      this.props.dispatch(storeResult(data.data))
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Header />
        <TextInput
          style={{ height: 80, borderColor: 'gray', borderWidth: 1, marginTop: 40, padding: 10 }}
          onChange={event => this.onInputChange(event.nativeEvent.text)}
          value={this.state.userName}
          placeholder='Search your github usernamess'
                />
        <Repositories />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1 // the master container has to be flex 1
  }
})

function mapStateToProps (state) {
  return {
    busy: state.home.busy
  }
}

export default connect(mapStateToProps)(UserForm)
