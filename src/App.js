import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Викликати v4 як функцію
import randomColor from 'randomcolor'; // Використовуйте правильний синтаксис імпорту
import Draggable from 'react-draggable'; // Видаліть фігурні дужки
import './App.css';

function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item !== '') {
      const newItem = {
        id: uuidv4(), // Викликати v4 як функцію
        item,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultPos: {
          x: 500,
          y: -500,
        },
      };
      setItems((prevItems) => [...prevItems, newItem]); // Додати до prevItems
      setItem('');
    } else {
      alert('Enter something...');
      setItem('');
    }
  };

  const updatePosition = (data, index) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      defaultPos: {
        x: data.x,
        y: data.y,
      },
    };
    setItems(newItems);
  };

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      newItem();
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          value={item}
          type="text" 
          placeholder="Enter something..."
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        />
        <button className="enter" onClick={newItem}>ENTER</button>
      </div>
      {
        items.map((item) => (
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(e, data) => {
              updatePosition(data, items.indexOf(item));
            }}
          >
            <div
              className="todo__item"
              style={{
                backgroundColor: item.color,
              }}
            >
              {item.item}
              <button
                className="delete"
                onClick={() => setItems(items.filter((i) => i.id !== item.id))}
              >
                X
              </button>
            </div>
          </Draggable>
        ))
      }
    </div>
  );
}

export default App;
