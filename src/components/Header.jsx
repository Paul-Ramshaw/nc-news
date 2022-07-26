import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header-container">
      <Link to="/">
        <h1 className="header-text">NC news</h1>
      </Link>
    </div>
  );
}
