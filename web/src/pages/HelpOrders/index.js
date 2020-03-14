/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { TitleActions, Title } from '~/styles/titleActions';
import { List } from '~/styles/list';
import { Container, LoadingContainer, ContentModal } from './styles';

import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import ModalConfirm from '~/components/ModalConfirm';

import api from '~/services/api';

export default function HelpOrders() {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [textModal, setTextModal] = useState('');
  const [questionId, setQuestionId] = useState(null);
  const [answer, setAnswer] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getQuestions() {
      try {
        setLoading(true);
        const response = await api.get('/help-orders', {
          params: {
            page,
          },
        });

        setTotalPages(parseInt(response.headers.count / 20, 10));

        setQuestions(response.data);
      } catch (error) {
        toast.error('Failed to fetch help requests!\nPlease try again later!');
      } finally {
        setLoading(false);
      }
    }

    if (page === 0) {
      setPage(1);
    } else {
      getQuestions();
    }
  }, [page]);

  function handleAnswer(question) {
    setTextModal(question.question);
    setQuestionId(question.id);
    setShowModal(true);
  }

  async function handleConfirm(id) {
    try {
      await api.post(`/help-orders/${id}/answer`, {
        answer,
      });

      setPage(0);
      toast.success('Successfully answered question!');
    } catch (error) {
      toast.error('Error saving answer.');
    } finally {
      setQuestionId(null);
      setAnswer('');
      setShowModal(false);
    }
  }

  function handleCancel() {
    setShowModal(false);
    setTextModal('');
    setQuestionId(null);
    setAnswer('');
  }

  return (
    <Container>
      <ModalConfirm
        show={showModal}
        handleCancel={() => handleCancel()}
        handleConfirm={() => handleConfirm(questionId)}
      >
        <ContentModal>
          <strong>STUDENT QUESTION</strong>
          <div>{textModal}</div>
          <strong>YOUR ANSWER</strong>
          <textarea
            name="answer"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          >
            {answer}
          </textarea>
        </ContentModal>
      </ModalConfirm>

      <TitleActions>
        <Title>Help Requests</Title>
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
                <th>STUDENT</th>
                <th width="40px" />
              </tr>
            </thead>

            <tbody>
              {questions.map(question => (
                <tr key={question.id}>
                  <td>{question.student.name}</td>
                  <td>
                    <button
                      className="edit"
                      type="button"
                      onClick={() => handleAnswer(question)}
                    >
                      reply
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
