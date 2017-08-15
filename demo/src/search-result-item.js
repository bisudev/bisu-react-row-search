import React, { Component } from 'react'
import { ResultSpan } from 'bisu-react-search-modal'

class SearchResultItem extends Component {
  _onSelectItem = () => {
    this.props.onSelectItem(this.props.item)
  }

  render() {
    const { item } = this.props
    return (
      <button onClick={this._onSelectItem} className="list-group-item">
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
    )
  }
}

export default SearchResultItem
