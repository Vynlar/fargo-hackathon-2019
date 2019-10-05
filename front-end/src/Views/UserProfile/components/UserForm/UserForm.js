import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

import Input from 'Components/Input';
import Button from 'Components/Button';
import FlexBox from 'Components/FlexBox';

const UserForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={yup.object().shape({
        first_name: yup.string().required('First name is required'),
        last_name: yup.string().required('Last name is required'),
      })}
      enableReinitialize // this means that if the mutation returns a modified value, initial values will change, meaning this form will be set to that value automatically
    >
      {() => (
        <Form>
          <FlexBox col maxWidth={500}>
            <FlexBox col component="label">
              First name
              <Input name="first_name" type="text" placeholder="" />
              <ErrorMessage name="first_name" />
            </FlexBox>

            <FlexBox col component="label">
              Last name
              <Input name="last_name" type="text" placeholder="" />
              <ErrorMessage name="last_name" />
            </FlexBox>

            <Button type="submit">Save</Button>
          </FlexBox>
        </Form>
      )}
    </Formik>
  );
};

UserForm.propTypes = {
  initialValues: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  initialValues: {
    first_name: '',
    last_name: '',
  },
};

export default UserForm;
