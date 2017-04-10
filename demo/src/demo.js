import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'react-redux-form/immutable'
import { Fieldset, Row, Field } from 'react-gridforms'
import Modal from 'bisu-react-modal'

import { searchStudent } from './actions'
import ThisComponent from '../../src'
import './demo.scss'

const required = (val) => val && val.length

const validators = {
  student_id: { required },
}

class Demo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
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

  _onSubmit = (formData) => {
    console.log('formData', formData.toJS())
  }

  _renderForm() {
    const { __searchResults } = this.props

    return (
      <Form model="formState" onSubmit={this._onSubmit} validators={validators} className="grid-form">
        <Fieldset legend="Form 1">
          <ThisComponent
            placeholder="Search Student ID or Last Name"
            model="formState.student_id"
            model1="formState.student_id_input"
            model2="formState.student_name"
            label1="Student ID"
            label2="Student Name"
            onSearch={searchStudent}
            searchResults={__searchResults}
            autoFocus
            required
          />
        </Fieldset>
        <hr />
        <button type="submit" className="btn btn-primary">Submit</button>
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
        </div>
        <button type="button" onClick={this._showModal} className="btn btn-info">Open this form in modal</button>
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
