
import Style from './ViewAnimalCard.module.css';
import Button from '../Button/Button';
import useHandleDelete from '../../pages/Animals/hooks/useHandleDelete';
import { useDispatch } from 'react-redux';

type ViewAnimalCardProps = {
  id: string;
  name: string;
  photoURL: string;
  handleEdit: (id: string) => void;
};

const ViewAnimalCard = ({ id, name, photoURL, handleEdit }: ViewAnimalCardProps) => {
  const dispatch = useDispatch();
  const handleDelete = () => useHandleDelete({ dispatch, id });
  return (
    <>
      <h1 className={Style.cardHeading}>{name}</h1>
      <img src={photoURL} alt={name} className={Style.animalPhoto} />
      <div className={Style.buttonWrapper}>
        <Button onClick={() => handleDelete()} text='Delete' styleType='delete' />
        <Button onClick={() => handleEdit(id)} text='Edit' styleType='edit' />
      </div>
    </>
  );
};

export default ViewAnimalCard;
