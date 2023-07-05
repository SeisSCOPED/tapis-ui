import React from 'react';
import { Button } from 'reactstrap';
import { useCreateCredentials } from 'tapis-hooks/systems';
import { useTapisConfig } from 'tapis-hooks/context';
import { FormikInput } from 'tapis-ui/_common';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

type AddCredentialsProps = {
  systemId: string
}

const AddCredentials: React.FC<AddCredentialsProps> = ({systemId}) => {
  const { isLoading, isSuccess, error, createCredentials } = useCreateCredentials();
  const { claims } = useTapisConfig();
  const currentUsername = claims['tapis/username'];

  const onSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    createCredentials({systemId, userName: currentUsername, reqUpdateCredential: {loginUser: username, password}})
  };
  
  const loginSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  console.log(isLoading)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      <Form>Credentials are not valid and must be added!
          <FormikInput
            name="username"
            label="Username"
            required={true}
            description="Your TAPIS username"
          />
          <FormikInput
            name="password"
            label="Password"
            required={true}
            description="Your TAPIS password"
            type="password"
          />
          <SubmitWrapper
            isLoading={isLoading}
            error={error}
            success={isSuccess ? 'Successfully Added Credentials' : ''}
          >
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || isSuccess}
            >
              Add Credentials
            </Button>
          </SubmitWrapper>
        </Form>
    </Formik>
  );
};

export default AddCredentials;