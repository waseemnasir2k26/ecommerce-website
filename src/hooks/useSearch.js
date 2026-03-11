import { useState, useCallback } from 'react';

export function useSearch(products = []) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = useCallback(
    (searchQuery) => {
      const trimmed = searchQuery.trim();
      setQuery(trimmed);

      if (!trimmed) {
        setResults([]);
        return;
      }

      const lowerQuery = trimmed.toLowerCase();

      const filtered = products.filter((product) => {
        const name = (product.name || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        const description = (product.description || '').toLowerCase();

        return (
          name.includes(lowerQuery) ||
          category.includes(lowerQuery) ||
          description.includes(lowerQuery)
        );
      });

      setResults(filtered);
    },
    [products]
  );

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  return { query, results, search, clearSearch };
}
