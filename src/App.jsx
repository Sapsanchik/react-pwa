import React, { useEffect, useState } from 'react';
import { getId } from './api';

function App() {
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    return await getId()
      .then((json) => {
        setIsLoading(false);
        setCollection(json);
        console.log(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных');
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="cart">
        {collection.length ? (
          collection.map((obj) => (
            <div className='item' key={obj.id}>
              <h3>{obj.title}</h3>
              <p>{obj.body}</p>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default App;
