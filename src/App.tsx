import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Animals from './pages/Animals/Animals';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Animals />
    </>
  );
};

export default App;
