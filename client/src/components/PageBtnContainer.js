import React from 'react';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

const PageBtnContainer = () => {
    const { numOfPages, page, changePage } = useAppContext();

    const prevPage = () => {
        let newPage = page - 1;
        if (newPage < 1) {
            newPage = numOfPages;
        }
        changePage(newPage);
    };
    const nextPage = () => {
        let newPage = page + 1;
        if (newPage > numOfPages) {
            newPage = 1;
        }
        changePage(newPage);
    };

    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1;
    });

    return (
        <Wrapper>
            <button className='prev-btn' onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
            </button>
            <div className='btn-container'>
                {pages.map((numPages) => {
                    return (
                        <button
                            key={numPages}
                            className={numPages === page ? ' pageBtn active' : 'pageBtn'}
                            onClick={() => changePage(numPages)}
                        >
                            {numPages}
                        </button>
                    );
                })}
            </div>
            <button className='next-btn' onClick={nextPage}>
                <HiChevronDoubleRight />
                next
            </button>
        </Wrapper >
    );
};

export default PageBtnContainer;
