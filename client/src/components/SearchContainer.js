import React, { useMemo, useState } from 'react';
import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';

const SearchContainer = () => {
    const [localSearch, setLocalSearch] = useState('');
    const {
        isLoading,
        handleChange,
        sort,
        searchType,
        searchStatus,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        clearFilters,
    } = useAppContext();

    const handleSearch = (e) => {
        handleChange({ name: e.target.name, value: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalSearch('');
        clearFilters();
    };

    const debounce = () => {
        let timeoutID;
        return (e) => {
            setLocalSearch(e.target.value);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                handleChange({ name: e.target.name, value: e.target.value });
            }, 1000)
        }
    };
    // eslint-disable-next-line
    const optimizedDebounce = useMemo(() => debounce(), []);

    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                {/* search position */}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='search'
                        value={localSearch}
                        handleChange={optimizedDebounce}
                    />
                    <FormRowSelect
                        labelText='job status'
                        name='searchStatus'
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={['all', ...statusOptions]}
                    />
                    <FormRowSelect
                        labelText='job type'
                        name='searchType'
                        value={searchType}
                        handleChange={handleSearch}
                        list={['all', ...jobTypeOptions]}
                    />
                    <FormRowSelect
                        name='sort'
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    />
                    <button
                        className='btn btn-block btn-danger'
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;
