import logo from './logo.svg';
import './App.css';

const api = {
  key: "b04b2a052fb4b71af764d1f2a6d8f3ab",
  base: "https://api.openweathermap.org/data/2.5"
}

function App() {

  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  return (
    <div className="app">
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='search...'
          />
        </div>
        <div className='location-box'>
          <div className='location'>
            NYC, US
          </div>
          <div className='date'>
            {dateBuilder(new Date())}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
