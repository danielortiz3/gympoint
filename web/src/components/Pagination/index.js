import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MdLastPage,
  MdFirstPage,
  MdChevronRight,
  MdChevronLeft,
} from 'react-icons/md';

import { Container, Pages, PageButton } from './styles';

export default function Pagination({ setPage, currentPage, totalPages }) {
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (currentPage === 1) {
      setIsFirst(true);
    } else {
      setIsFirst(false);
    }

    if (currentPage === totalPages) {
      setIsLast(true);
    } else {
      setIsLast(false);
    }

    const newPages = [];
    if (totalPages > 7) {
      if (currentPage > 4) {
        newPages.push({
          key: 'prev',
          noLink: true,
          page: '...',
          current: false,
        });
        for (let i = currentPage - 3; i <= currentPage + 3; i += 1) {
          newPages.push({ key: i, page: i, current: i === currentPage });
          if (i >= totalPages) break;
        }
        if (currentPage < totalPages - 3) {
          newPages.push({
            key: 'next',
            noLink: true,
            page: '...',
            current: false,
          });
        }
      } else {
        for (let i = 1; i <= 7; i += 1) {
          newPages.push({ key: i, page: i, current: i === currentPage });
        }
        newPages.push({
          key: 'next',
          noLink: true,
          page: '...',
          current: false,
        });
      }
    } else {
      for (let i = 1; i <= totalPages; i += 1) {
        newPages.push({ key: i, page: i, current: i === currentPage });
      }
    }

    setPages(newPages);
    console.tron.log(currentPage, newPages, totalPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  function goNextPage() {
    setPage(currentPage + 1);
  }

  function goPrevPage() {
    setPage(currentPage - 1);
  }

  return (
    <Container>
      {totalPages > 1 ? (
        <Pages>
          <PageButton disabled={isFirst} onClick={() => setPage(1)}>
            <MdFirstPage />
          </PageButton>
          <PageButton disabled={isFirst} onClick={() => goPrevPage()}>
            <MdChevronLeft />
          </PageButton>

          {pages.map(page => (
            <PageButton
              current={page.current}
              key={page.key}
              onClick={() => page.noLink || setPage(page.page)}
            >
              {page.page}
            </PageButton>
          ))}

          <PageButton disabled={isLast} onClick={() => goNextPage()}>
            <MdChevronRight />
          </PageButton>
          <PageButton disabled={isLast} onClick={() => setPage(totalPages)}>
            <MdLastPage />
          </PageButton>
        </Pages>
      ) : (
        ''
      )}
    </Container>
  );
}

Pagination.propTypes = {
  setPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
