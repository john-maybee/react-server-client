import{useState, useEffect} from 'react';
import axios from 'axios';
import ListItem from '../ListItem/ListItem';

// const creatureData = [
  // {id: 1, name :'Unicorn', origin: 'Britain'},
  // {id: 2, name : 'Sphinx', origin: 'Egypt'},
  // {id: 3, name: 'Jackalope', origin: 'America'},
  // {id: 4, name : 'Nickleback', origin: 'Purgatory'}
// ]; // This information isn't being used now that we added the below information to add the new data

function App () {
  const [creatureList, setCreatureList] = useState([]);
  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');

  useEffect(() => {
    fetchCreatures();
  }, []);


  const fetchCreatures = () => {
    // axios({
    //   method : 'GET',
    //   url: '/creature'
    // })

    axios.get('/creature')
    .then((response) => {
      console.log('response from GET creatures', response.data);
      setCreatureList(response.data);
    })
    .catch((error) => {
      console.log('error getting creatures', error);
    });
  }

  const addCreature = (event) => {
    event.preventDefault();
    console.log('add creature clicked!', newCreatureName, newCreatureOrigin);
    // post request
    axios({
      method : 'POST',
      url: '/creature',
      data: {
        name: newCreatureName,
        origin: newCreatureOrigin
      }
    })
    .then((response) => {
      console.log(response);
      fetchCreatures();
      setNewCreatureName('');
      setNewCreatureOrigin('');
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  
  return (
    <div>
      <h2>Add Creature</h2>
      <h4>{newCreatureName}</h4>
      <h4>{newCreatureOrigin}</h4>
      <form onSubmit={addCreature}>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          value={newCreatureName}
          onChange={(e) => setNewCreatureName(e.target.value)}
        />
        <label htmlFor="origin">Origin: </label>
        <input id="origin" value={newCreatureOrigin} onChange={(event) => setNewCreatureOrigin(event.target.value)} />
        <button type="submit">Add New Creature</button>
      </form>
      {/* <p>{JSON.stringify(creatureList)}</p> */}
      <ul>
        {creatureList.map(item => (
          <ListItem key={item.id} creature={item} />
          // <li key={item.id}>
          //   {item.name} is from {item.origin}
          // </li> // when learning how to make components, we commented this out to move to the ListItem.jsx //
        ))}
      </ul>
    </div>
  );

}

export default App
