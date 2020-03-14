/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';

import { TitleActions, Title, Actions, Search } from '~/styles/titleActions';
import { List } from '~/styles/list';
import { Container, LoadingContainer } from './styles';

import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';

import ModalConfirm from '~/components/ModalConfirm';

import api from '~/services/api';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [studentConfirm, setStudentConfirm] = useState({});

  const getStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/students', {
        params: {
          q: search,
          page,
        },
      });

      setTotalPages(parseInt(response.headers.count / 20, 10));

      setStudents(response.data);
    } catch (error) {
      toast.error('Failed to fetch students!\nTry again later!');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  async function handleConfirm(id) {
    setStudentConfirm(id);
    setConfirm(true);
  }

  async function handleCancel() {
    setStudentConfirm(null);
    setConfirm(false);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/students/${id}`);

      getStudents();
      toast.success('Student successfully removed!');
    } catch (error) {
      toast.error('Failed to fetch students!\nTry again later!');
    } finally {
      setStudentConfirm(null);
      setConfirm(false);
    }
  }

  return (
    <Container>
      <ModalConfirm
        show={confirm}
        handleCancel={() => handleCancel()}
        handleConfirm={() => handleDelete(studentConfirm)}
      >
        <div>Do you really want to remove the student?</div>
      </ModalConfirm>

      <TitleActions>
        <Title>Student Management</Title>

        <Actions>
          <Link to="/alunos/adicionar">
            <MdAdd size={20} color="#fff" />
            REGISTER
          </Link>

          <Search>
            <input
              placeholder="Student search"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
            <MdSearch color="#999" size={16} />
          </Search>
        </Actions>
      </TitleActions>
      {loading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <>
          <List>
            <thead>
              <tr>
                <th>NAME</th>
                <th width="300px">E-MAIL</th>
                <th width="300px" className="text-center">
                  AGE
                </th>
                <th width="20px" />
                <th width="20px" />
              </tr>
            </thead>

            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td align="center">{student.age}</td>
                  <td>
                    <Link to={`/alunos/editar/${student.id}`} className="edit">
                      edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="remove"
                      type="button"
                      onClick={() => handleConfirm(student.id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </List>
          <Pagination
            setPage={setPage}
            currentPage={page}
            totalPages={totalPages}
          />
        </>
      )}
    </Container>
  );
}
