import React, { Component } from 'react'
import { object, func } from 'prop-types'
import Table from 'react-bootstrap/lib/Table'
import Bullet from 'react-icons/lib/md/adjust'

class SearchResultItem extends Component {

  _onClick = () => {
    this.props.onSelectItem(this.props.item)
  }

  render() {
    const { item } = this.props
    return (
      <button onClick={this._onClick} type="button" className="list-group-item">
        <Table hover condensed>
          <tbody>
            <tr>
              <td width="10"><span className="btn-icon btn-inline"><Bullet /></span></td>
              <td width="100"><small className="text-primary">{item.get('code')}</small></td>
              <td>{item.get('name')}</td>
            </tr>
          </tbody>
        </Table>
      </button>
    )
  }
}

SearchResultItem.propTypes = {
  item: object,
  onSelectItem: func,
}

export default SearchResultItem
