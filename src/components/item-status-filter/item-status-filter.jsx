import React from "react"

import "./item-status-filter.css"

export default class ItemStatusFilter extends React.Component {

  buttons =  [
    {key: "all", label: "All" },
    {key: "active", label: "Active" },
    {key: "done", label: "Done" }
  ]

  render() {

    const buttons = this.buttons.map(({key, label }) => {
     const isActive = this.props.buttonFilter === key
     const active = isActive ? "btn-info" : "btn-outline-secondary"

      return (
        <button type="button"
          className= { `btn ${active}`}
          key={key} 
          onClick={() => this.props.onItemsFiltered(key)} >
            {label}
        </button>
      )
    })

    return (
      <div className="btn-group">
       {buttons}
      </div>
    )
  }
}
