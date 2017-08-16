import React, { Component } from 'react'
import { Row, Field } from 'tforms'
import { Input } from 'bisu-react-input'
import errBlock from 'bisu-react-input/lib/err-block'
import { Control } from 'react-redux-form/immutable'
import SearchIcon from 'react-icons/lib/md/search'
import ThreeBounce from 'better-react-spinkit/dist/ThreeBounce'

class BisuReactRowSearch extends Component {
  // F10 - keyCode = 121 (open search)
  // Enter - keyCode = 13 (trigger search)
  _onKeyDown = e => {
    if (e.keyCode === 121) {
      this.props.openSearch()
    } else if (e.keyCode === 13) {
      e.preventDefault()
      this.props.onInputSearch(e.target.value)
    }
  }

  _onFocus = e => {
    // attempt to add class .isfocused to the field tforms--field
    const field = e.target.closest('.tforms--field')
    if (!field) {
      this.props.onFocus && this.props.onFocus()
      return
    }
    field.classList.add('isfocused')
    this.props.onFocus && this.props.onFocus()
  }

  _onBlur = e => {
    // removed .isfocused to the field
    const field = e.target.closest('.tforms--field')
    if (!field) {
      this.props.onFocus && this.props.onBlur()
      return
    }
    field.classList.remove('isfocused')
    this.props.onFocus && this.props.onBlur()
  }

  render() {
    const {
      children,
      model0,
      model1,
      model2,
      label1,
      label2,
      required,
      disabled,
      searching,
      autoFocus,
      openSearch,
    } = this.props
    return (
      <Row className="bisu--react-row-search">
        <Field
          span="1"
          className="bisu--react-input"
          data-disabled={disabled ? 'true' : ''}
        >
          <div>
            <label htmlFor={model1}>
              {label1} {required && <span className="req">*</span>}
            </label>
            <div className="input-group">
              <span className="input-group-btn">
                <button
                  type="button"
                  tabIndex="-1"
                  disabled={disabled}
                  onClick={openSearch}
                  className="btn-icon"
                >
                  {searching
                    ? <ThreeBounce
                        color="#aaa"
                        size={6}
                        className="searching"
                      />
                    : <SearchIcon />}
                </button>
              </span>
              <Control.text
                model={model1}
                className="form-control"
                onKeyDown={this._onKeyDown}
                onFocus={this._onFocus}
                onBlur={this._onBlur}
                disabled={disabled}
                autoFocus={autoFocus}
              />
              {errBlock(model0)}
            </div>
          </div>
        </Field>
        <Field span="3" data-disabled="true" className="display">
          <Input model={model2} label={label2} disabled />
        </Field>
        {children}
      </Row>
    )
  }
}
export default BisuReactRowSearch
