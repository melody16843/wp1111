import './App.css';

function Footer(prop){
    return(
      <footer className='todo-app__footer' id='todo-footer'>
          <div className='todo-app__total'>left {prop.left}</div>
          <ul className='todo-app__view-buttons'>
            <button onClick={prop.showAll}>All</button>
            <button onClick={prop.showActivate}>Activate</button>
            <button onClick={prop.showCompleted}>Completed</button>
          </ul>
          <div className='todo-app__clean'>
            <button onClick={prop.clearCompleted}>Clear completed</button>
          </div>
        </footer>
    );
  }

export default Footer;