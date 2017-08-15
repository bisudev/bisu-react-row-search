import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { Form } from 'react-redux-form/immutable'
import { Fieldset, Row, Field } from 'tforms'
import Modal from 'bisu-react-modal'
import {
  ResultWrapper,
  ResultHeader,
  ResultItemWrapper,
  ResultSpan,
} from 'bisu-react-search-modal'

import { searchStudent, fetchStudents } from './actions'
import ThisComponent from '../../src'
import './demo.scss'

const required = val => val && val.length

const validators = {
  student_id: { required },
}

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      offlineList: fromJS([]),
    }
  }

  componentDidMount() {
    /*this.props.dispatch(fetchStudents()).then(res => {
      if (!res.error) {
        this.setState({
          offlineList: fromJS(res.payload || []),
        })
      }
    })*/
  }

  _showModal = () => {
    this.setState({
      showModal: true,
    })
  }

  _hideModal = () => {
    this.setState({
      showModal: false,
    })
  }

  _onSubmit = formData => {
    console.log('formData', formData.toJS())
  }

  _onSearch = term => {
    console.log('on search', term)
    this.props.dispatch(searchStudent(term))
    //searchStudent(term)
  }

  _renderSearchResults() {
    const { __searchResults } = this.props
    if (!__searchResults || __searchResults.size === 0) {
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
          {__searchResults.map((item, k) =>
            <button
              key={k}
              onClick={this._onSelectItem}
              className="list-group-item"
            >
              <ResultSpan>
                {item.get('id')}
              </ResultSpan>
              <ResultSpan>
                {item.get('code')}
              </ResultSpan>
              <ResultSpan w="3">
                {item.get('name')}
              </ResultSpan>
            </button>
          )}
        </ResultItemWrapper>
      </ResultWrapper>
    )
  }

  _renderForm() {
    const { __searchResults } = this.props

    return (
      <Form
        model="formState"
        onSubmit={this._onSubmit}
        validators={validators}
        className="tforms"
      >
        <Fieldset legend="Form 1">
          <ThisComponent
            modelSearch="searchState"
            placeholderSearch="Search Item..."
            searchResults={this._renderSearchResults()}
            onSearch={this._onSearch}
            placeholder="Search Student ID or Last Name"
            model="formState.student_id"
            model1="formState.student_id_input"
            model2="formState.student_name"
            label1="Student ID"
            label2="Student Name"
            //onSearch={searchStudent}
            //searchResults={__searchResults}
            autoFocus
            required
          >
            <SearchModal isOpen>
              {this._renderSearchResults()}
            </SearchModal>
          </ThisComponent>
        </Fieldset>
        <hr />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    )
  }

  _renderForm2() {
    const { offlineList } = this.state

    return (
      <Form
        model="formState2"
        onSubmit={this._onSubmit}
        validators={validators}
        className="tforms"
      >
        <Fieldset legend="Form 2">
          <ThisComponent
            placeholder="Search Student ID or Last Name"
            model="formState2.student_id"
            model1="formState2.student_id_input"
            model2="formState2.student_name"
            label1="Student ID"
            label2="Student Name"
            searchResults={this._renderSearchResults()}
            //searchResults={offlineList}
            isOffline
            required
          />
        </Fieldset>
        <hr />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    )
  }

  _renderForm3() {
    const { offlineList } = this.state

    return (
      <Form
        model="formState2"
        onSubmit={this._onSubmit}
        validators={validators}
        className="tforms"
      >
        <Fieldset legend="Form 2" disabled>
          <ThisComponent
            placeholder="Search Student ID or Last Name"
            model="formState2.student_id"
            model1="formState2.student_id_input"
            model2="formState2.student_name"
            label1="Student ID"
            label2="Student Name"
            //searchResults={offlineList}
            searchResults={this._renderSearchResults()}
            isOffline
            disabled
            required
          />
        </Fieldset>
        <hr />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    )
  }

  render() {
    const { showModal } = this.state

    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <h1>bisu-react-row-search Demo</h1>
          {this._renderForm()}
          <Modal isOpen={showModal} handleClose={this._hideModal}>
            {this._renderForm()}
          </Modal>
          <hr />
          <h2>Offline Mode (Fuzzy search)</h2>
          {this._renderForm2()}
          <hr />
          <h2>Disabled</h2>
          {this._renderForm3()}
        </div>
        <button
          type="button"
          onClick={this._showModal}
          className="btn btn-info"
        >
          Open this form in modal
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    __searchResults: state.student.get('searchResults'),
  }
}

export default connect(mapStateToProps)(Demo)
