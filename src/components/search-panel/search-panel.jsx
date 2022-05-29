import React from "react"

import "./search-panel.css"

export default class SearchPanel extends React.Component {

  onLabelChange = (event) => {
    this.setState({label: event.target.value})
    this.props.onItemSearched(event.target.value)
  }

  render() {
    return (
      <input type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onLabelChange} />
    )
  }
}
