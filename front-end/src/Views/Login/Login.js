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
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: 'bold',
  })
);

export const LoginForm = ({ onSubmit }) => (
  <Box minWidth={300} maxWidth={500}>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={yup.object().shape({
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
            <Header>Login</Header>

            <Input
              name="email"
              type="email"
              placeholder="Email"
              autoFocus
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
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function LoginPage({ login, error }) {
  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="neutral"
      flexDirection="column"
    >
      <LoginForm onSubmit={login} />
      {error && <div>Invalid email or password</div>}
    </FlexBox>
  );
}
LoginPage.propTypes = {
  login: PropTypes.func,
  error: PropTypes.object,
};

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginPageContainer = props => {
  const auth = useAuth();
  return (
    <Mutation mutation={LOGIN_MUTATION}>
      {(login, { error }) =>
        auth.isLoggedIn ? (
          <Redirect to={'/main'} />
        ) : (
          <LoginPage
            login={values =>
              login({ variables: values }).then(res => {
                const token = res.data.login.token;
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

export default LoginPageContainer;
