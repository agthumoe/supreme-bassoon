import { Link } from 'react-router-dom';

export function Nav() {
  return (
    <nav>
      <Link to="/about">About</Link>
      <Link to="/">Home</Link>
    </nav>
  );
}