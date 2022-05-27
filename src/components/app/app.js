import React from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form'

import './app.css'

export default class App extends React.Component {

  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    searchItem: ""
  }

  createTodoItem(label) {
    return{
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    
    this.setState(({ todoData }) => {

      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [
        ...todoData.slice(0, idx), 
        ...todoData.slice(idx + 1)
      ]

      return {
        todoData: newArray
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState( ({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ]
      return{
        todoData: newArr
      }
    })
  }

  itemFilter = (array, searchItem) => {
    if(searchItem === 0) {
      return array
    }
    return array.filter((element) => element.label.includes(searchItem))
  }

  toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id)

      const oldItem = arr[idx]
      const newItem = {...oldItem, 
        [propName]: !oldItem[propName]}
      
      return [
        ...arr.slice(0, idx), 
        newItem,
        ...arr.slice(idx + 1)
      ]
    }
  

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  onItemSearched = (value) => {
    this.setState({searchItem: value})
  }

  render() {

    const doneCount = this.state.todoData
                      .filter((el) => el.done).length

    const todoCount = this.state.todoData.length - doneCount

    return (
      <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel onItemSearched={this.onItemSearched}/>
        <ItemStatusFilter />
      </div>

      <TodoList 
      todos={this.itemFilter(this.state.todoData, this.state.searchItem)}
      onDeleted={ this.deleteItem } 
      onToggleImportant={this.onToggleImportant}
      onToggleDone={this.onToggleDone} />
      <div>
        <ItemAddForm
        onItemAdded={this.addItem} />
        </div>
    </div>
    )
  }
}
