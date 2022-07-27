import { useContext } from 'react';
import ErrorContext from '../contexts/ErrorContext';

export default function Alert() {
  const { retry } = useContext(ErrorContext);

  return (
    <div className="alert-container">
      <p className="alert-text">{retry.msg}</p>
    </div>
  );
}
