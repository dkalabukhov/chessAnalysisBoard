import ReactDOM from 'react-dom';
import { useEffect } from 'react';

const Floater = ({ from, text, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 11000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="floaterModal">

      {`${from}: ${text}`}
    </div>,
    document.body,
  );
};
export default Floater;
