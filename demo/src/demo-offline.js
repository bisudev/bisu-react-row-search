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
import { fetchStudents } from './actions'

const intRequired = val => {
  return val > 0
}
const validators = {
  student_id: { intRequired },
}

class DemoOffline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openSearch: false,
      filtered: fromJS([]),
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchStudents()).then(res => {
      this.setState({
        filtered: fromJS(res.payload.data || []),
      })
    })
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

  _fuzzySearch = term => {
    // offline search query
    const q = term.replace('%', '.*')
    const regex = new RegExp('^' + q, 'i')
    return this.props.__student
      .get('list')
      .filter(
        item =>
          item.get('code').search(regex) > -1 ||
          item.get('name').search(regex) > -1
      )
  }

  _onSearch = search => {
    this.setState({ filtered: this._fuzzySearch(search.get('q')) })
  }

  _onDirectSearch = term => {
    if (!term) {
      this._reset()
    } else {
      const filtered = this._fuzzySearch(term)
      if (filtered.size > 0) {
        this._onSelectItem(filtered.get(0))
      } else {
        this._reset()
      }
    }
  }

  _onSelectItem = item => {
    // set the models
    // model0="formState2.student_id"
    // model1 = 'formState2.student_id_input'
    // model2 = 'formState2.student_name'
    const { dispatch } = this.props
    dispatch(actions.change('formState2.student_id', item.get('id')))
    dispatch(actions.change('formState2.student_id_input', item.get('code')))
    dispatch(
      actions.change(
        'formState2.student_name',
        item.get('id') + ' - ' + item.get('name')
      )
    )
    this._closeSearch()
  }

  _reset = () => {
    const { dispatch } = this.props
    dispatch(actions.change('formState2.student_id', 0))
    dispatch(actions.change('formState2.student_id_input', ''))
    dispatch(actions.change('formState2.student_name', ''))
  }

  _renderResults() {
    const { filtered } = this.state
    if (!filtered || filtered.size === 0) {
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
          {filtered.map((item, k) =>
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
        model="formState2"
        onSubmit={this._onSubmit}
        className="tforms"
        validators={validators}
      >
        <Fieldset legend="Offline Form (Preloaded data)">
          <ThisComponent
            model0="formState2.student_id"
            model1="formState2.student_id_input"
            model2="formState2.student_name"
            label1="Student ID"
            label2="Student Name"
            openSearch={this._openSearch}
            onInputSearch={this._onDirectSearch}
            searching={searching}
            required
          >
            <SearchModal
              model="searchState"
              isOpen={openSearch}
              searching={searching}
              placeholder="Search Item..."
              onClose={this._closeSearch}
              onSubmit={this._onSearch}
              offline
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

export default connect(mapStateToProps)(DemoOffline)
