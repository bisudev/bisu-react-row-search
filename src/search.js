import React, { Component } from 'react'
import SearchModal from 'bisu-react-search-modal'

import SearchResults from './search-results'

class Search extends Component {

  render() {
    const { placeholder, isOpen, handleClose, onSubmit, results, onSelectItem } = this.props

    return (
      <SearchModal
        placeholder={placeholder}
        isOpen={isOpen}
        handleClose={handleClose}
        onSubmit={onSubmit}
      >
        <SearchResults results={results} onSelectItem={onSelectItem} />
      </SearchModal>
    )
  }
}

export default Search
