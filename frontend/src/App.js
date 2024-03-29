import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo'
import {addTodo,generateId,findById,toggleTodo,updateTodo,removeTodo,filterTodos} from './lib/todoHelpers'
import {pipe, partial} from './lib/utils'
import {loadTodos,createTodo,saveTodo,destroyTodo} from './lib/todoService'

class App extends Component {
  state = {
    todos: [],
    currentTodo : ''
  }

  static contextTypes = {
    route : React.PropTypes.string
  }

  componentDidMount(){
    loadTodos()
      .then(todos => {
        this.setState({todos})
      })
  }

  handleRemove = (id,evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id)
    this.setState({ todos : updatedTodos})
    destroyTodo(id)
      .then(() => this.showTempMsg('todo removed'))
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    console.log(updated);
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({ todos : updatedTodos})
    saveTodo(updated)
      .then(() => this.showTempMsg('todo updated'))
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    })
  }

  showTempMsg = (msg) => {
    this.setState({ message : msg})
    setTimeout(() => this.setState({message : ''}), 2500)
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const newTodo = {title : this.state.currentTodo}
    console.log(newTodo)
    createTodo(newTodo)
      .then(() => this.showTempMsg('todo added'))
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage : "Please supply a todo name"
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    const displayTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Todo List</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
          {this.state.message && <span className="success">{this.state.message}</span>}
          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}
          />
          <TodoList
            handleToggle={this.handleToggle}
            todos={displayTodos}
            handleRemove={this.handleRemove}
          />
        </div>
      </div>
    );
  }
}

export default App;
