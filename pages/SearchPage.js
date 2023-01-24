import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/products',
      query: { q: searchQuery },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search:
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchPage;
