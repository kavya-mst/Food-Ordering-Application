import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { foodData } from '../data/foodData';
import FoodCard from '../components/FoodCard';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category') || 'All';
  const searchParam = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    setSearchTerm(searchParam);
  }, [searchParam]);

  const categories = [
    'All',
    'North Indian',
    'South Indian',
    'Fast Food',
    'Chinese',
    'Desserts'
  ];

  const handleCategorySelect = (category) => {
    const params = {};

    if (category !== 'All') {
      params.category = category;
    }

    if (searchTerm) {
      params.search = searchTerm;
    }

    setCurrentPage(1);
    setSearchParams(params);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    const params = {};

    if (categoryParam !== 'All') {
      params.category = categoryParam;
    }

    if (query.trim()) {
      params.search = query.trim();
    }

    setCurrentPage(1);
    setSearchParams(params);
  };

  const filteredFood = foodData.filter((item) => {
    const matchesCategory =
      categoryParam === 'All' ||
      item.category === categoryParam;

    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentItems =
    filteredFood.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  const totalPages = Math.ceil(
    filteredFood.length / itemsPerPage
  );

  return (
    <div
      className="container"
      style={{ marginTop: '2rem' }}
    >
      <h2 className="section-title">
        Our Delicious Menu
      </h2>

      <div className="menu-controls">
        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${
                categoryParam === cat
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                handleCategorySelect(cat)
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-search-bar">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {filteredFood.length > 0 ? (
        <>
          <div className="menu-grid">
            {currentItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px',
                marginTop: '30px'
              }}
            >
              <button
                className="btn btn-secondary"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
              >
                Previous
              </button>

              <span
                style={{
                  fontWeight: 'bold'
                }}
              >
                Page {currentPage} of{' '}
                {totalPages}
              </span>

              <button
                className="btn btn-primary"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">
            🔍
          </span>
          <h3>No Dishes Found</h3>
          <p>
            We couldn't find any dishes
            matching "{searchTerm}".
          </p>

          <button
            className="btn btn-primary"
            onClick={() => {
              setSearchTerm('');
              setCurrentPage(1);
              setSearchParams({});
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;