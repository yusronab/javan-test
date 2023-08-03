import React, { useState } from 'react';

interface FilterFormProps {
    categories: string[];
    onFilter: (filterValue: string, searchValue: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ categories, onFilter }) => {
    const [filterValue, setFilterValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onFilter(filterValue, searchValue);
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex gap-5">
            <select value={filterValue} onChange={handleFilterChange}>
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category} className="p-2">
                        {category}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
                className="border-b border-black mr-3"
            />
            <button
                type="submit"
                className="p-2 border bg-red-700 text-white border-none rounded-md">
                Filter
            </button>
        </form>
    );
};

export default FilterForm;
