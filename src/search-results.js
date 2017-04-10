import React from 'react'
import { object, func } from 'prop-types'
import ListGroup from 'react-bootstrap/lib/ListGroup'

import SearchResultItem from './search-result-item'

const SearchResults  = ({ results, onSelectItem }) => {
  if (results.size === 0) {
    return null
  }

  return (
    <ListGroup fill>
      {results.map((item, k) => (
        <SearchResultItem key={k} item={item} onSelectItem={onSelectItem} />
      ))}
    </ListGroup>
  )
}

SearchResults.propTypes = {
  results: object,
  onSelectItem: func,
}

export default SearchResults
