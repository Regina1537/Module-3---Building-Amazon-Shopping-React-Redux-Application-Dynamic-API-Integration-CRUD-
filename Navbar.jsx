import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#f5f5f5' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}