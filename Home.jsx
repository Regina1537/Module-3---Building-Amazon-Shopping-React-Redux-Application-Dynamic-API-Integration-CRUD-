import React, { useState } from 'react';
import { useGetProductsQuery } from '../features/products/productsApi';
import ProductCard from '../components/ProductCard';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/usersSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Users from FakeStore API</h2>
      <ul>
        {list.map((user) => (
          <li key={user.id}>
            {user.name.firstname} {user.name.lastname} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
const [page, setPage] = useState(1);
const [search, setSearch] = useState('');


const { data, error, isLoading } = useGetProductsQuery({ page, limit: 12, search });


if (isLoading) return <div>Loading...</div>;
if (error) return <div>Failed to load products</div>;


return (
<div>
<div className="mb-4 flex gap-2">
<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />