import React, { Component } from 'react'
import { string, bool, func, object } from 'prop-types'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import { Row, Field } from 'react-gridforms'
import InputGroup, { Button as IButton } from 'react-bootstrap/lib/InputGroup'
import { Control, actions } from 'react-redux-form/immutable'
import SearchIcon from 'react-icons/lib/md/search'
import Input from 'bisu-react-input'
import errBlock from 'bisu-react-form-error'
import trim from 'validator/lib/trim'

import Search from './search'

class BisuReactRowSearch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openSearch: false,
    }
  }

  _openSearch = () => {
    this.setState({
      openSearch: true,
    })
  }

  _closeSearch = () => {
    const { dispatch, model1 } = this.props
    this.setState({
      openSearch: false,
    })
    dispatch(actions.focus(model1))
  }

  // F10 - keyCode = 121
  _onKeyDown = (e) => {
    const { dispatch, onSearch } = this.props

    if (e.keyCode === 121) {
      // show search
      this._openSearch()
    }
    if (e.keyCode === 13) {
      e.preventDefault()
      // search directly
      const value = trim(e.target.value)
      this.props.dispatch(this.props.onSearch(value))
        .then((res) => {
          if (!res.error) {
            const result = fromJS(res.payload || [])
            if (result.size > 0) {
              this._onSelectSearchItem(result.get(0))
            } else {
              this._reset()
            }
          } else {
            this._reset()
          }
        })
    }
  }

  // fires on Search
  _onSearch = (term) => {
    this.props.dispatch(this.props.onSearch(term))
  }

  // on select search result item
  _onSelectSearchItem = (item) => {
    const { dispatch, model, model1, model2 } = this.props
    dispatch(actions.change(model, item.get('id')))
    dispatch(actions.change(model1, item.get('code')))
    dispatch(actions.change(model2, item.get('name')))
    this._closeSearch()
  }

  _reset = () => {
    const { dispatch, model, model1, model2 } = this.props
    dispatch(actions.change(model, 0))
    dispatch(actions.change(model1, ''))
    dispatch(actions.change(model2, ''))
  }

  render() {
    const { openSearch } = this.state
    const { placeholder, model, model1, model2, label1, label2, required, autoFocus, searchResults } = this.props

    return (
      <Row className="bisu--react-row-search">
        <Field span="1">
          <label htmlFor={model1}>{label1} {required && <span className="req">*</span>}</label>
          <InputGroup>
            <IButton>
              <button type="button" onClick={this._openSearch} tabIndex="-1" className="btn-icon"><SearchIcon /></button>
            </IButton>
            <Control.text
              model={model1}
              className="form-control"
              onKeyDown={this._onKeyDown}
              autoFocus={autoFocus}
            />
            {errBlock(model)}
          </InputGroup>
        </Field>
        <Field span="3" data-disabled="true" className="display">
          <Input
            model={model2}
            label={label2}
            disabled
          />
          <Search
            placeholder={placeholder}
            isOpen={openSearch}
            results={searchResults}
            handleClose={this._closeSearch}
            onSubmit={this._onSearch}
            onSelectItem={this._onSelectSearchItem}
          />
        </Field>
      </Row>
    )
  }
}

BisuReactRowSearch.propTypes = {
  placeholder: string,
  model: string,
  model1: string,
  model2: string,
  label1: string,
  label2: string,
  autoFocus: bool,
  onSearch: func,
  searchResults: object,
}

export default connect()(BisuReactRowSearch)
