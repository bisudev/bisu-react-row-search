import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { Form, actions } from 'react-redux-form/immutable'
import { Fieldset } from 'tforms'
import SearchModal, {
  ResultWrapper,
  ResultHeader,
  ResultItemWrapper,
  ResultSpan,
} from 'bisu-react-search-modal'

import { searchStudent } from './actions'
import SearchResultItem from './search-result-item'
import ThisComponent from '../../src'
import './demo.scss'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openSearch1: false,
    }
  }

  componentDidMount() {
    this.props.dispatch()
  }

  _openSearch1 = () => {
    this.setState({ openSearch1: true })
  }

  _closeSearch1 = () => {
    this.setState({ openSearch1: false })
  }

  _onSearch1 = search => {
    this.props.dispatch(searchStudent(search.get('q')))
  }

  _onDirectSearch1 = term => {
    this.props.dispatch(searchStudent(term)).then(res => {
      if (res.payload.data && res.payload.data.length > 0) {
        this._onSelectItem(fromJS(res.payload.data[0]))
      } else {
        this._reset()
      }
    })
  }

  _onSelectItem = item => {
    // set the models
    // model0="formState.student_id"
    // model1 = 'formState.student_id_input'
    // model2 = 'formState.student_name'
    const { dispatch } = this.props
    dispatch(actions.change('formState.student_id', item.get('id')))
    dispatch(actions.change('formState.student_id_input', item.get('code')))
    dispatch(
      actions.change(
        'formState.student_name',
        item.get('id') + ' - ' + item.get('name')
      )
    )
    this._closeSearch1()
  }

  _reset = () => {
    const { dispatch } = this.props
    dispatch(actions.change('formState.student_id', 0))
    dispatch(actions.change('formState.student_id_input', ''))
    dispatch(actions.change('formState.student_name', ''))
  }

  _renderResults1() {
    const searchResults = this.props.__student.get('searchResults')
    if (!searchResults || searchResults.size === 0) {
      return null
    }
    return (
      <ResultWrapper>
        <ResultHeader>
          <ResultSpan>ID</ResultSpan>
          <ResultSpan>Code</ResultSpan>
          <ResultSpan w="3">Name</ResultSpan>
        </ResultHeader>
        <ResultItemWrapper>
          {searchResults.map((item, k) =>
            <SearchResultItem
              key={k}
              item={item}
              onSelectItem={this._onSelectItem}
            />
          )}
        </ResultItemWrapper>
      </ResultWrapper>
    )
  }

  _renderForm1() {
    const { openSearch1 } = this.state
    const searching = this.props.__student.get('searching')

    return (
      <Form model="formState" onSubmit={this._onSubmit1} className="tforms">
        <Fieldset legend="AJAX Form">
          <ThisComponent
            model0="formState.student_id"
            model1="formState.student_id_input"
            model2="formState.student_name"
            label1="Student ID"
            label2="Student Name"
            openSearch={this._openSearch1}
            onInputSearch={this._onDirectSearch1}
            searching={searching}
            autoFocus
            required
          >
            <SearchModal
              model="searchState"
              isOpen={openSearch1}
              searching={searching}
              placeholder="Search Item..."
              onClose={this._closeSearch1}
              onSubmit={this._onSearch1}
            >
              {this._renderResults1()}
            </SearchModal>
          </ThisComponent>
        </Fieldset>
      </Form>
    )
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <h1>bisu-react-row-search Demo</h1>
          <hr />
          {this._renderForm1()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    __student: state.student,
  }
}

export default connect(mapStateToProps)(Demo)
