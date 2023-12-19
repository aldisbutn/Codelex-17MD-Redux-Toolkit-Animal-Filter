import { useSelector, useDispatch } from 'react-redux';
import { Animal, addAnimal, deleteAnimal, editAnimal } from '../redux/animalSlice';
import type { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Style from './Animals.module.css';

const Animals = () => {
  const dispatch = useDispatch();
  const animalList = useSelector((state: RootState) => state.animals);

  useEffect(() => {
    console.log('hey1');
    const savedAnimalsString = localStorage.getItem('ANIMALS');
    if (savedAnimalsString) {
      const savedAnimals = JSON.parse(savedAnimalsString);
      if (savedAnimals && savedAnimals.length) {
        console.log('hey');
        savedAnimals.forEach((animal: Animal) => {
          dispatch(addAnimal(animal));
        });
      }
    }
  }, [dispatch]);

  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const [editMode, setEditMode] = useState(false);
  const [editID, setEditID] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhotoURL, setNewPhotoURL] = useState('');

  const handleEdit = (id: string) => {
    const animalToEdit = animalList.find((animal) => animal.id === id);
    if (animalToEdit) {
      setEditMode(true);
      setEditID(id);
      setNewName(animalToEdit.name);
      setNewPhotoURL(animalToEdit.photoURL);
    }
  };

  return (
    <div className='App'>
      <form>
        <input type='text' name='animalName' placeholder='Animal name' onChange={(e) => setName(e.target.value)} />
        <input
          type='text'
          name='animalPhoto'
          placeholder='Animal photo url'
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <button
          type='button'
          onClick={() =>
            dispatch(
              addAnimal({
                id: uuidv4(),
                name,
                photoURL,
              })
            )
          }
        >
          Add animal
        </button>
      </form>
      <div>
        {animalList.map((animal) => (
          <div key={animal.id}>
            {editMode && editID === animal.id ? (
              <>
                <input type='text' name='newAnimalName' value={newName} onChange={(e) => setNewName(e.target.value)} />
                <input
                  type='text'
                  name='newPhotoURL'
                  value={newPhotoURL}
                  onChange={(e) => setNewPhotoURL(e.target.value)}
                />
                <button onClick={() => setEditMode(false)}>Cancel</button>
                <button
                  onClick={() => {
                    dispatch(
                      editAnimal({
                        id: animal.id,
                        name: newName,
                        photoURL: newPhotoURL,
                      })
                    );
                    setEditMode(false);
                    setNewName('');
                    setNewPhotoURL('');
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h1>{animal.id}</h1>
                <h1>{animal.name}</h1>
                <img src={animal.photoURL} alt={animal.name} className={Style.animalPhoto} />
                <button onClick={() => dispatch(deleteAnimal(animal.id))}>Delete</button>
                <button onClick={() => handleEdit(animal.id)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animals;
