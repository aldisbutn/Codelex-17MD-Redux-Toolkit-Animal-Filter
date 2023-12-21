import { useDispatch } from 'react-redux';
import { resetSort, sortAnimalsAscending, sortAnimalsDescending } from '../../services/redux/animalSlice';
import Button from '../Button/Button';
import Style from './Sort.module.css';

const Sort = () => {
  const dispatch = useDispatch();
  return (
    <div className={Style.sortWrapper}>
      <h3>Sort animals</h3>
      <Button text='Reset' styleType='sort' onClick={() => dispatch(resetSort())} />
      <Button text='Ascending' styleType='sort' onClick={() => dispatch(sortAnimalsAscending())} />
      <Button text='Descending' styleType='sort' onClick={() => dispatch(sortAnimalsDescending())} />
    </div>
  );
};

export default Sort;
