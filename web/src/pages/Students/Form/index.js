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

export default function ComponentForm() {
  const Schema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name must contain at least 3 characters')
      .required('Nome is required!'),
    email: Yup.string()
      .email('Type a valid e-mail!')
      .required('E-mail is required!'),
    age: Yup.number()
      .typeError('Enter your age correctly!')
      .integer('Enter your age correctly!')
      .moreThan(0, 'Enter your age correctly!')
      .lessThan(150, 'Enter your age correctly!')
      .required('Age is required!'),
    weight: Yup.number('Enter your weight correctly!')
      .typeError('Enter your weight correctly')
      .moreThan(0, 'Enter your weight correctly')
      .lessThan(600, 'Enter your weight correctly')
      .required('Weight is required!'),
    height: Yup.number('Enter your height correctly')
      .typeError('Enter your height correctly!')
      .moreThan(0, 'Enter your height correctly!')
      .lessThan(3, 'Enter your height correctly!')
      .required('Height is required!'),
  });

  const { student_id } = useParams();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getStudent() {
      try {
        setLoading(true);
        const response = await api.get('/students', {
          params: {
            id: student_id,
          },
        });

        setStudent(response.data[0]);
      } catch (error) {
        toast.error('Failed to fetch students!\nTry again later!');
      } finally {
        setLoading(false);
      }
    }

    if (student_id) getStudent();
  }, [student_id]);

  async function handleSubmit(data) {
    try {
      if (student_id) {
        const response = await api.put(`student/${student.id}`, data);
        toast.success('Student successfully updated');
        setStudent(response.data);
      } else {
        const response = await api.post('student', data);
        toast.success('Student successfully saved');
        setStudent(response.data);
      }
    } catch (error) {
      toast.error(
        'There was an error saving! Please check the data and try again!'
      );
    }
  }

  return (
    <Container>
      <Form schema={Schema} onSubmit={handleSubmit} initialData={student}>
        <TitleActions>
          <Title>{student ? 'Student Edition' : 'Student Registration'}</Title>

          <Actions>
            <Link className="cancel" to="/alunos">
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
              <strong>FULL NAME</strong>
              <Input name="name" placeholder="John Doe" />
            </div>

            <div>
              <strong>E-MAIL ADDRESS</strong>
              <Input name="email" placeholder="johndoe@johndoe.com" />
            </div>

            <OneLine>
              <div>
                <strong>AGE</strong>
                <InputMaskNumber name="age" placeholder="30" />
              </div>
              <div>
                <strong>WEIGHT (in kg)</strong>
                <InputMaskNumber name="weight" placeholder="75.2" suffix="kg" />
              </div>
              <div>
                <strong>HEIGHT</strong>
                <InputMaskNumber name="height" placeholder="1.70" suffix="m" />
              </div>
            </OneLine>
          </FormContainer>
        )}
      </Form>
    </Container>
  );
}
