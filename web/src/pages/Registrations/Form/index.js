import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { parseISO, format, addMonths } from 'date-fns';

import Loading from '~/components/Loading';
import { Container, LoadingContainer } from './styles';
import { FormContainer, OneLine } from '~/styles/form';
import { TitleActions, Title, Actions } from '~/styles/titleActions';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import Select from '~/components/SelectInput';
import DatePicker from '~/components/DatePicker';

export default function RegistrationForm() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endData, setEndData] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const [planChoiced, setPlanChoiced] = useState();
  const [startDate, setStartDate] = useState();
  const [registration, setRegistration] = useState([]);

  const { registration_id } = useParams();

  const Schema = Yup.object().shape({
    student_id: Yup.number()
      .integer()
      .typeError('Student name is required!')
      .required('Student name is required!'),
    plan_id: Yup.number()
      .integer()
      .typeError('Plan name is required!')
      .required('Plan name is required!'),
    start_date: Yup.date()
      .typeError('Start date is required!')
      .required('Start date is required!'),
  });

  useEffect(() => {
    async function getPlans() {
      try {
        const response = await api.get('/plans');

        const data = response.data.map(plan => ({
          value: plan.id,
          label: plan.title,
          price: plan.price,
          duration: plan.duration,
        }));

        setPlans(data);
      } catch (error) {
        toast.error('Failed to fetch students!\nTry again later!');
      }
    }
    getPlans();
  }, []);

  useEffect(() => {
    async function getRegistration() {
      try {
        setLoading(true);
        const response = await api.get('/registrations', {
          params: {
            id: registration_id,
          },
        });

        const data = {
          id: response.data[0].id,
          price: response.data[0].price,
          start_date: parseISO(response.data[0].start_date),
          end_date: parseISO(response.data[0].end_date),
          student_id: {
            value: response.data[0].student.id,
            label: response.data[0].student.name,
          },
          plan_id: {
            value: response.data[0].plan.id,
            label: response.data[0].plan.title,
            price: response.data[0].plan.price,
            duration: response.data[0].plan.duration,
          },
        };

        setRegistration(data);
        setStartDate(data.start_date);
        setPlanChoiced(data.plan_id);
      } catch (error) {
        toast.error('Failed to fetch registrations!\nPlease, try again later!');
      } finally {
        setLoading(false);
      }
    }

    if (registration_id) getRegistration();
  }, [registration_id]);

  useEffect(() => {
    if (planChoiced) {
      if (startDate) {
        const dateFormatted = format(
          addMonths(startDate, planChoiced.duration),
          "d'/'MM'/'Y"
        );
        setEndData(dateFormatted);
      }

      const price = planChoiced.price * planChoiced.duration;
      setEndPrice(formatPrice(price));
    }
  }, [startDate, planChoiced]);

  async function handleSubmit(data) {
    try {
      if (registration.id) {
        const response = await api.put(
          `registrations/${registration.id}`,
          data
        );
        setRegistration(response.data);
        toast.success('Registration successfully updated!');
      } else {
        const response = await api.post('registrations', data);
        setRegistration(response.data);
        toast.success('Registration successfully saved!');
      }
    } catch (error) {
      toast.error('There was an error saving! check the data and try again!');
    }
  }

  async function loadOptionsStudents(search, callback) {
    try {
      const response = await api.get('/students', {
        params: {
          q: search,
        },
      });
      console.tron.log(response);
      const data = response.data.map(student => ({
        value: student.id,
        label: student.name,
      }));
      callback(data);
    } catch (error) {
      console.tron.warn('Error fetching students!');
    }
  }

  return (
    <Container>
      <Form schema={Schema} onSubmit={handleSubmit} initialData={registration}>
        <TitleActions>
          <Title>
            {registration ? 'Registration Edit' : 'Registration Register'}
          </Title>

          <Actions>
            <Link className="cancel" to="/matriculas">
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
              <strong>STUDENT</strong>
              <Select name="student_id" options={loadOptionsStudents} />
            </div>

            <OneLine>
              <div>
                <strong>PLAN</strong>
                <Select
                  name="plan_id"
                  options={plans}
                  onChange={setPlanChoiced}
                />
              </div>
              <div>
                <strong>START DATE</strong>
                <DatePicker name="start_date" onChangeDate={setStartDate} />
              </div>
              <div>
                <strong>END DATE</strong>
                <input value={endData} disabled />
              </div>
              <div>
                <strong>TOTAL PRICE</strong>
                <input value={endPrice} disabled />
              </div>
            </OneLine>
          </FormContainer>
        )}
      </Form>
    </Container>
  );
}
