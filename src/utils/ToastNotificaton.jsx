import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectLanguage, selectMode } from '@/store/ui/selectors';

const ToastNotificaton = () => {
  const language = useSelector(selectLanguage);
  const mode = useSelector(selectMode);

  return (
    <ToastContainer
      theme={mode}
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={language === "ar"}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ zIndex: 9999, fontFamily: "Tajawal" }}
    />
  );
}

export default ToastNotificaton