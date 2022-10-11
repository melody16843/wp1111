import React from 'react';
import './App.css';
import cross from "./img/x.png";
import Footer from'./footer';

var itemid = 0;
var total = 0;
var left = 0;

function App() {

  const [current, setCurrent] = React.useState([]);
  const [All, setAll] = React.useState([]);
  
  const showAll = () => {
    setCurrent(All.map(item =>{return item}));
  }

  const showActivate = () =>{
    setCurrent(e => All.map(item =>{return item}));
    setCurrent(e => e.filter(item => {
      return item.done == 0;
    }))
  }  
  const showCompleted = () =>{
    setCurrent(e => All.map(item =>{return item}));
    setCurrent(e => e.filter(item => {
      return item.done == 1;
    }))
  }
  
  const showText = (event) => {
    if(event.key === "Enter"){
      let item = {
        text:event.target.value,
        id:itemid,
        done:0

      };
      itemid++;
      total++;
      left++;
      setCurrent(current => [...current, item]);
      setAll(All => [...All, item]);
      event.target.value = "";
      console.log(total);
    }

  }

  const taskCompleted = (event) => {
    let newC;
    const target = current.find(item => {return item.id.toString() === event.target.id[1]});
    if(target.done === 0){
      left--;
      newC = current.map(
        obj => {
          if(obj.id == target.id){
            return{...obj, done:1};
          }
          return obj;
        }
      )
    }
    else{
      left++;
      newC = current.map(
        obj => {
          if(obj.id === target.id){
            return{...obj, done:0};
          }
          return obj;
        }
      )
    }
    setCurrent(newC);
    setAll(newC);
  }

  const taskDeleted = event => {
    console.log(event.target.id[1]);
    let newC;
    const target = current.find(item => {return item.id.toString() === event.target.id[1]});
    if(target.done === 0){
      left--;
      
    }
    setCurrent(e => e.filter(item => {
      return item.id.toString() != event.target.id[1];
    }),
    );
    setAll(e => e.filter(item => {
      return item.id.toString() != event.target.id[1];
    }),
    );
  }
  
  const clearCompleted = () =>{
    setAll(e => e.filter(item => {
      return item.done == 0;
    }))
    setCurrent(e => e.filter(item => {
      return item.done == 0;
    }))
  }


  return (
    <div className='todo-app__root'>
      <header className='todo-app__header'>
        <div className='todo-app__title'>todos</div>
      </header>

      <section className='todo-app__main'>
        <input className='todo-app__input'  onKeyDown={showText}></input>
        <ul className='todo-app__list' id="todo-list">
          {current.map((e) => (
            <li key={e.id} className='todo-app__item'>
              <div className='todo-app__checkbox'>
                <input id={"o"+e.id} type={"checkbox"} checked={e.done == 1 ? 1:0 } onChange={taskCompleted}></input>
                <label htmlFor={"o"+e.id}></label>
              </div>
              <h1 className='todo-app__item-detail' id={"t"+e.id} style={{textDecoration: e.done == 0 ? '' : 'line-through', opacity: e.done == 0 ? '' : 0.5}}>{e.text}</h1>
              <img src={cross} className='todo-app__item-x' id={"x"+e.id} onClick={taskDeleted}></img>
            </li>

          ))}
        </ul>
      </section>
      
      {total > 0 ? <Footer showAll={showAll} showActivate={showActivate} showCompleted={showCompleted} left={left} clearCompleted = {clearCompleted} ></Footer>:''}
      </div>
    );

}


export default App;
