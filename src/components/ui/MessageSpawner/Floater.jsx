import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const Floater = ({ from, text, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal">

      {`${from}: ${text}`}
    </div>,
    document.body,
  );
};
export default Floater;
