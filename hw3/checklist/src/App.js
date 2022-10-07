import React, { Component } from 'react';
import './App.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      total:0,
      completed:0,
      left:0,
      text:[],
      value:""
    }
  }

  storeText = (event) => {this.setState(state => ({
      total:state.total,
      completed:state.completed,
      left:state.left,
      text:state.text,
      value:event.target.value 
    }))};

  showText = (event) => {
    if(event.key === "Enter"){
    this.setState(state => ({
      total:state.total+1,
      completed:state.completed,
      left:state.left+1,
      text:state.text.concat({id:state.total.toString(), value:state.value}),
      value:""
    }));
    if(this.state.total+1 !== 0){
      var Footer = document.getElementsByClassName("todo-app__footer")[0];
      console.log(Footer);
      Footer.style.display = "flex";
    }
  };

  }

  taskCompleted = (event) => {
    var text = document.getElementById("t"+event.target.id[1]);
    var box = document.getElementById(event.target.id);
    if(box.checked){
      text.style.textDecoration = "line-through" ;
      text.style.opacity = "0.5";
    }
    else{
      text.style.textDecoration = "none" ;
      text.style.opacity = "1";
    }
  }
  
  


  render() {
    return (
      <div className='todo-app__root'>
        <header className='todo-app__header'>
          <div className='todo-app__title'>todos</div>
        </header>

        <section className='todo-app__main'>
          <input className='todo-app__input' value = {this.state.value} onChange = {this.storeText} onKeyDown={this.showText}></input>
          <ul className='todo-app__list' id="todo-list">
            {this.state.text.map((item) => (
              <li key={item.id} className='todo-app__item'>
                <div className='todo-app__checkbox'>
                  <input id={"o"+item.id} type={"checkbox"} onChange={this.taskCompleted}></input>
                  <label htmlFor={"o"+item.id}></label>
                </div>
                <h1 className='todo-app__item-detail' id={"t"+item.id}>{item.value}</h1>
                <img src='/img/x.png' className='todo-app__item-x'></img>
              </li>

            ))}
          </ul>
        </section>

        <footer className='todo-app__footer' id='todo-footer'>
          <div className='todo-app__total'>left {this.state.left}</div>
          <ul className='todo-app__view-buttons'>
            <button>All</button>
            <button>Activate</button>
            <button>Completed</button>
          </ul>
          <div className='todo-app__clean'>
            <button>Clear completed</button>
          </div>
        </footer>
      </div>
      );

    
  }
}

export default App;
