import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { SignInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/images/logo.svg';

export default function SignIn() {
  const loading = useSelector(state => state.auth.loading);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid e-mail')
      .required('E-mail is required!'),
    password: Yup.string().required('Password is required!'),
  });

  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(SignInRequest(email, password));
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <img src={logo} alt="GymPoint" />
      <div>
        <strong>E-MAIL</strong>
        <Input name="email" placeholder="exemple@gmail.com" />
      </div>
      <div>
        <strong>PASSWORD</strong>
        <Input name="password" type="password" placeholder="*******" />
      </div>

      <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
    </Form>
  );
}
