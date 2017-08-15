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

import ThisComponent from '../../src'
import SearchResultItem from './search-result-item'
import { searchStudent } from './actions'

const intRequired = val => {
  return val > 0
}
const validators = {
  student_id: { intRequired },
}

class DemoAjax extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openSearch: false,
    }
  }

  _onSubmit = payload => {
    console.log('submit', payload.toJS())
  }

  _openSearch = () => {
    this.setState({ openSearch: true })
  }

  _closeSearch = () => {
    this.setState({ openSearch: false })
  }

  _onSearch = search => {
    this.props.dispatch(searchStudent(search.get('q')))
  }

  _onDirectSearch = term => {
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
    this._closeSearch()
  }

  _reset = () => {
    const { dispatch } = this.props
    dispatch(actions.change('formState.student_id', 0))
    dispatch(actions.change('formState.student_id_input', ''))
    dispatch(actions.change('formState.student_name', ''))
  }

  _renderResults() {
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

  render() {
    const { openSearch } = this.state
    const searching = this.props.__student.get('searching')

    return (
      <Form
        model="formState"
        onSubmit={this._onSubmit}
        className="tforms"
        validators={validators}
      >
        <Fieldset legend="AJAX Form">
          <ThisComponent
            model0="formState.student_id"
            model1="formState.student_id_input"
            model2="formState.student_name"
            label1="Student ID"
            label2="Student Name"
            openSearch={this._openSearch}
            onInputSearch={this._onDirectSearch}
            searching={searching}
            autoFocus
            required
          >
            <SearchModal
              model="searchState"
              isOpen={openSearch}
              searching={searching}
              placeholder="Search Item..."
              onClose={this._closeSearch}
              onSubmit={this._onSearch}
            >
              {this._renderResults()}
            </SearchModal>
          </ThisComponent>
        </Fieldset>
        <button type="submit" className="btn btn-info">
          Submit
        </button>
      </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    __student: state.student,
  }
}

export default connect(mapStateToProps)(DemoAjax)
