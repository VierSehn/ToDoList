import React from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import { v4 as id } from "uuid";

import "./app.css";

export default class App extends React.Component {
  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
    searchItem: "",
    buttonFilter: "active",
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: id(),
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => el.id !== id),
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  itemFilter = (array, searchItem) => {
    if (searchItem === "") {
      return array;
    }
    return array.filter((element) => {
      const smallLabel = element.label.toLowerCase();
      return smallLabel.includes(searchItem);
    });
  };

  statusFilter = (array, buttonFilter) => {
    switch (buttonFilter) {
      case "active":
        return array.filter((element) => !element.done);
      case "done":
        return array.filter((element) => element.done);
      default:
        return array;
    }
  };

  toggleProperty(arr, id, propName) {
    return arr.map((el) =>
      el.id === id ? { ...el, [propName]: !el[propName] } : el
    );
  }

  onToggleField = (id, tag) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, tag),
      };
    });
  };

  onToggleImportant = (id) => {
    this.onToggleField(id, "important");
  };

  onToggleDone = (id) => {
    this.onToggleField(id, "done");
  };

  onItemSearched = (value) => {
    this.setState({ searchItem: value });
  };

  onItemFiltered = (value) => {
    this.setState({ buttonFilter: value });
  };

  render() {
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;
    const searchedTodos = this.itemFilter(
      this.state.todoData,
      this.state.searchItem
    );
    const todoList = this.statusFilter(searchedTodos, this.state.buttonFilter);

    return (
      <div className="todo-app">
        <AppHeader todo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onItemSearched={this.onItemSearched} />
          <ItemStatusFilter
            buttonFilter={this.state.buttonFilter}
            onItemFiltered={this.onItemFiltered}
          />
        </div>
        <TodoList
          todos={todoList}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
