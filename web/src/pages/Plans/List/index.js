/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { TitleActions, Title, Actions } from '~/styles/titleActions';
import { List } from '~/styles/list';
import { Container, LoadingContainer } from './styles';

import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import ModalConfirm from '~/components/ModalConfirm';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

export default function PlansList() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [planConfirm, setPlanConfirm] = useState({});

  const getPlans = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/plans', {
        params: {
          page,
        },
      });

      setTotalPages(parseInt(response.headers.count / 20, 10));

      const data = response.data.map(plan => ({
        ...plan,
        durationFormated: `${plan.duration} ${
          plan.duration === 1 ? `month` : `months`
        }`,
        priceFormated: formatPrice(plan.price),
      }));

      setPlans(data);
    } catch (error) {
      toast.error('Failed to fetch students!\nPlease try again later!');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    console.tron.log('Reload');
    getPlans();
  }, [getPlans, page]);

  async function handleConfirm(id) {
    setPlanConfirm(id);
    setConfirm(true);
  }

  async function handleCancel() {
    setPlanConfirm(null);
    setConfirm(false);
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/plans/${id}`);
      getPlans();

      toast.success('Plan successfully removed!');
    } catch (error) {
      toast.error('Failed to remove plan!\nPlease try again later!');
    } finally {
      setPlanConfirm(null);
      setConfirm(false);
    }
  }

  return (
    <Container>
      <ModalConfirm
        show={confirm}
        handleCancel={() => handleCancel()}
        handleConfirm={() => handleDelete(planConfirm)}
      >
        <div>Do you really want to remove the plan?</div>
      </ModalConfirm>

      <TitleActions>
        <Title>PLAN MANAGEMENT</Title>

        <Actions>
          <Link to="/planos/adicionar">
            <MdAdd size={20} color="#fff" />
            REGISTER
          </Link>
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
                <th>PLAN TITLE</th>
                <th width="300px" className="text-center">
                  DURATION
                </th>
                <th width="300px" className="text-center">
                  MONTHLY PRICE
                </th>
                <th width="60px" />
                <th width="60px" />
              </tr>
            </thead>

            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td align="center">{plan.durationFormated}</td>
                  <td align="center">{plan.priceFormated}</td>
                  <td>
                    <Link className="edit" to={`/planos/editar/${plan.id}`}>
                      edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="remove"
                      type="button"
                      onClick={() => handleConfirm(plan.id)}
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
