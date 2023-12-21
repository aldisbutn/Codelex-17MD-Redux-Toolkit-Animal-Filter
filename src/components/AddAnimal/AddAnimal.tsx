import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { AnimalSchema } from '../../services/zod/schemas';
import { addAnimal } from '../../services/redux/animalSlice';
import { toast } from 'react-toastify';
import { z } from 'zod';

import Button from '../Button/Button';
import Input from '../Input/Input';

import Style from './AddAnimal.module.css';

const AddAnimal = () => {
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const animal = { id: uuidv4(), name, photoURL };
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      AnimalSchema.parse(animal);
      dispatch(addAnimal(animal));
      toast.success('Animal added successfully!');
      setName('');
      setPhotoURL('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errMessages = error.errors.map((message) => toast.error(message.message));
        return errMessages;
      } else {
        return error;
      }
    }
  };

  return (
    <div className={Style.addAnimalWrapper}>
      <form onSubmit={(e) => handleSubmit(e)} className={Style.formWrapper}>
        <Input value={name} name='animalName' placeholder='Animal name' onChange={(e) => setName(e.target.value)} />
        <Input
          value={photoURL}
          name='animalPhoto'
          placeholder='Animal photo URL'
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <Button type='submit' text='Add animal' styleType='add' />
      </form>
    </div>
  );
};

export default AddAnimal;
