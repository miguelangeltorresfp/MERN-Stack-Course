/* eslint-disable */
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      tasks: [],
      _id: ''
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /* [name] es una forma de usar variables de tipo string como claves
  It's the new ES2015 (the EcmaScript spec formally known as ES6) computed property name syntax. It's a shorthand for the someObject[someKey] assignment that you know from ES3/5:
  links -
  https://stackoverflow.com/questions/32515598/square-brackets-javascript-object-key
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names
  */
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    console.log('didMount');
    this.fetchTasks();
  }

  // Fetch por defecto envía una petición get y por tanto no hay que configurar nada
  fetchTasks() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.setState({ tasks: data });
        console.log(this.state.tasks);
      });
  }

  deleteTask(id) {
    if(confirm('Are you sure you want to delete it ?')) {
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          M.toast({html: 'Task Deleted'})
          this.fetchTasks();
      })
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        title:data.title,
        description:data.description,
        _id: data._id
      })
    })
  }


  /* No hace falta indicar la ruta del servidor porque es el mismo del backend
   * Fetch se incorpora en los navagadores últimos
   */
  addTask(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res=>res.json())
      .then(data=> {
        console.log(data)
        M.toast({html:'Task Updated'})
        this.setState({title: '', description: '', _id:''})
        this.fetchTasks();
      })
    } else {
      fetch('/api/tasks', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(this.state), // data can be `string` or {object}!
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({ html: 'Task Saved' }); // M es una variable global de Materialize - toast muestra avisos por pantalla
          this.setState({ title: '', description: '' });
          this.fetchTasks();
        })
        .catch(err => console.log(err));
    }

  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">
                MERN Stack
              </a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Task Title"
                          value={this.state.title}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          name="description"
                          onChange={this.handleChange}
                          placeholder="Task Description"
                          className="materialize-textarea"
                          value={this.state.description}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.tasks.map(task => (
                    <tr key={task._id}>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>
                      <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}>
                        <i className="material-icons">delete</i>
                      </button>
                      <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin:'1rem'}}>
                        <i className="material-icons">edit</i>
                      </button>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
