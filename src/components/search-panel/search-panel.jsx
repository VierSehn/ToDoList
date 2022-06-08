import React from "react";

import "./search-panel.css";

export default class SearchPanel extends React.Component {
  onLabelChange = (event) => {
    this.props.onItemSearched(event.target.value.toLowerCase());
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onLabelChange}
      />
    );
  }
}
