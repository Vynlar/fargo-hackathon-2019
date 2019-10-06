import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';
import { Redirect } from 'react-router-dom';
import css from '@styled-system/css';

import FlexBox from 'Components/FlexBox';
import Box from 'Components/Box';
import Button from 'Components/Button';
import Input from 'Components/Input';
import { useAuth } from 'Components/AuthContext';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

/*
An example of a text component. You would probably want to create a place to organize similar text related components.
An example being src/components/typography
*/
const Header = styled.h1(
  css({
    letterSpacing: 2,
    fontWeight: 'bold',
  })
);

export const RegisterForm = ({ onSubmit }) => (
  <Box minWidth={300} maxWidth={500}>
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup
          .string()
          .required('Email is required')
          .email('Invalid email address'),
        password: yup.string().required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) =>
        onSubmit(values).finally(() => setSubmitting(false))
      }
    >
      {({ isSubmitting }) => (
        <Form>
          <FlexBox flexDirection="column">
            <Header>Register</Header>

            <Input name="name" type="name" placeholder="Username" autoFocus />
            <ErrorMessage name="name" component="div" />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              data-cy="email"
            />
            <ErrorMessage name="email" component="div" />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              data-cy="password"
            />
            <ErrorMessage name="password" component="div" />

            <Button
              type="submit"
              disabled={isSubmitting}
              mt={3}
              alignSelf="flex-end"
              data-cy="submit"
            >
              Submit
            </Button>
          </FlexBox>
        </Form>
      )}
    </Formik>
  </Box>
);
RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function RegisterPage({ register, error }) {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="blue"
      flexDirection="column"
    >
      <RegisterForm onSubmit={register} />
      {error && <div>Error occurred while registering</div>}
    </FlexBox>
  );
}
RegisterPage.propTypes = {
  register: PropTypes.func,
  error: PropTypes.object,
};

const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const RegisterPageContainer = props => {
  const auth = useAuth();
  return (
    <Mutation mutation={REGISTER_MUTATION}>
      {(register, { error }) =>
        auth.isLoggedIn ? (
          <Redirect to={'/main'} />
        ) : (
          <RegisterPage
            register={values =>
              register({ variables: values }).then(res => {
                const token = res.data.signup.token;
                auth.setToken(token);
              })
            }
            error={error}
            {...props}
          />
        )
      }
    </Mutation>
  );
};

export default RegisterPageContainer;
