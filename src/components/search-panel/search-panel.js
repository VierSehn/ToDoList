import React from 'react'

import './search-panel.css'

state = {
  label: ''
}

onChange = (e) => {
  this.setState
}

export default class SearchPanel extends React.Component {
  render(){
    return (
      <input type="text"
        className="form-control search-input"
        onChange={this.onChange}
        placeholder="type to search" />
    )
  }
}
