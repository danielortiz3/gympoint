/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import InputMaskNumber from '~/components/InputMaskNumber';

import { Container, LoadingContainer } from './styles';
import { FormContainer, OneLine } from '~/styles/form';
import { TitleActions, Title, Actions } from '~/styles/titleActions';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

export default function PlansForm({ history }) {
  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must have at least 3 characters.')
      .required('Title is required!'),
    duration: Yup.number()
      .typeError('Enter the duration correctly.')
      .integer('Enter the duration correctly.')
      .moreThan(0, 'Enter the duration correctly.')
      .required('Plan duration is required.'),
    price: Yup.number()
      .typeError('Enter the plan value correctly.')
      .moreThan(0, 'Enter the plan value correctly.')
      .required('Plan price is required.'),
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState({});
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();
  const [fullPrice, setFullPrice] = useState(0);
  const { plan_id } = useParams();

  useEffect(() => {
    async function getPlan() {
      try {
        setLoading(true);
        const response = await api.get('/plans', {
          params: {
            id: plan_id,
          },
        });

        const data = response.data[0];
        setPrice(data.price);
        setDuration(data.duration);
        setPlan(data);
      } catch (error) {
        toast.error('Failed to fetch students!\nPlease try again later!');
      } finally {
        setLoading(false);
      }
    }

    if (plan_id) getPlan();
  }, [plan_id]);

  useEffect(() => {
    let formatedPrice = 0;
    if (price && duration) {
      formatedPrice = price * duration;
    }
    setFullPrice(formatPrice(formatedPrice));
  }, [price, duration]);

  async function handleSubmit(data) {
    try {
      setLoading(true);
      if (plan.id) {
        await api.put(`plans/${plan.id}`, data);
        toast.success('Plan updated successfully!');
      } else {
        await api.post('plans', data);
        toast.success('Plan saved successfully!');
      }
      history.push('/planos');
    } catch (error) {
      toast.error('There was an error saving! check the data and try again!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Form scshema={Schema} onSubmit={handleSubmit} initialData={plan}>
        <TitleActions>
          <Title>{plan ? 'Plan editor' : 'Plan register'}</Title>

          <Actions>
            <Link className="cancel" to="/planos">
              <MdChevronLeft size={20} color="#fff" />
              BACK
            </Link>
            <button type="submit">
              <MdDone size={20} color="#fff" />
              SAVE
            </button>
          </Actions>
        </TitleActions>
        {loading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          <FormContainer>
            <div>
              <strong>PLAN TITLE</strong>
              <Input name="title" />
            </div>

            <OneLine>
              <div>
                <strong>DURATION (in months)</strong>
                <InputMaskNumber
                  name="duration"
                  onChange={setDuration}
                  thousandSeparator={false}
                  decimalScale={0}
                />
              </div>
              <div>
                <strong>MONTHLY PRICE</strong>
                <InputMaskNumber
                  onChange={setPrice}
                  name="price"
                  prefix="R$ "
                  fixedDecimalScale
                />
              </div>
              <div>
                <strong>TOTAL PRICE</strong>
                <Input name="precoTotal" value={fullPrice} disabled />
              </div>
            </OneLine>
          </FormContainer>
        )}
      </Form>
    </Container>
  );
}
