import Button from '../Button/Button';
import Input from '../Input/Input';
import Style from './EditAnimalCard.module.css';

type EditAnimalCardProps = {
  newName: string;
  setNewName: React.Dispatch<React.SetStateAction<string>>;
  newPhotoURL: string;
  setNewPhotoURL: React.Dispatch<React.SetStateAction<string>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: (id: string) => void;
  id: string;
};
const EditAnimalCard = ({
  newName,
  setNewName,
  newPhotoURL,
  setNewPhotoURL,
  setEditMode,
  handleSave,
  id,
}: EditAnimalCardProps) => {
  return (
    <div className={Style.editAnimalCardWrapper}>
      <Input name='newAnimalName' value={newName} onChange={(e) => setNewName(e.target.value)} />
      <Input name='newPhotoURL' value={newPhotoURL} onChange={(e) => setNewPhotoURL(e.target.value)} />
      <Button onClick={() => setEditMode(false)} text='Cancel' styleType='cancel' />
      <Button onClick={() => handleSave(id)} text='Save' styleType='save' />
    </div>
  );
};

export default EditAnimalCard;
