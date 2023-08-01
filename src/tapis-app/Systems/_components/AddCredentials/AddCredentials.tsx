import React from 'react';
import { Button } from 'reactstrap';
import { useCreateCredentials, useDetails } from 'tapis-hooks/systems';
import { useTapisConfig } from 'tapis-hooks/context';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import { Formik, Form } from 'formik';
import { Systems } from '@tapis/tapis-typescript';
import { AuthnEnum } from '@tapis/tapis-typescript-systems';
import Password from './AuthenticationMethods/Password';
import Token from './AuthenticationMethods/Token';
import PkiKeys from './AuthenticationMethods/PkiKeys';
import Cert from './AuthenticationMethods/Cert';
import AccessKey from './AuthenticationMethods/AccessKey';
import * as Yup from 'yup';

type AddCredentialsProps = {
  systemId: string;
};

const AddCredentials: React.FC<AddCredentialsProps> = ({ systemId }) => {
  const { data } = useDetails({
    systemId,
    select: 'allAttributes',
  });

  const system: Systems.TapisSystem | undefined = data?.result;

  const isPassword = system?.defaultAuthnMethod === AuthnEnum.Password;
  const isPkiKeys = system?.defaultAuthnMethod === AuthnEnum.PkiKeys;
  const isAccessKey = system?.defaultAuthnMethod === AuthnEnum.AccessKey;
  const isToken = system?.defaultAuthnMethod === AuthnEnum.Token;
  const isCert = system?.defaultAuthnMethod === AuthnEnum.Cert;

  const { isLoading, isSuccess, error, createCredentials } =
    useCreateCredentials();
  const { claims } = useTapisConfig();
  const currentUsername = claims['tapis/username'];

  const onSubmit = ({
    username,
    password,
    privateKey,
    publicKey,
    accessKey,
    accessSecret,
    accessToken,
    refreshToken,
    certificate,
  }: {
    username?: string;
    password?: string;
    privateKey?: string;
    publicKey?: string;
    accessKey?: string;
    accessSecret?: string;
    accessToken?: string;
    refreshToken?: string;
    certificate?: string;
  }) => {
    createCredentials({
      systemId,
      userName: currentUsername,
      reqUpdateCredential: {
        loginUser: username,
        password,
        privateKey,
        publicKey,
        accessKey,
        accessSecret,
        accessToken,
        refreshToken,
        certificate,
      },
    });
  };

  const loginSchema = Yup.object({
    // username: Yup.string().required(),
    // password: Yup.string().required(),
    // privateKey: Yup.string().required(),
    // publicKey: Yup.string().required(),
    // accessKey: Yup.string().required(),
    // accessSecret: Yup.string().required(),
    // accessToken: Yup.string().required(),
    // refreshToken: Yup.string().required(),
    // certificate: Yup.string().required(),
  });

  const initialValues = {
    username: '',
    password: '',
    privateKey: '',
    publicKey: '',
    accessKey: '',
    accessSecret: '',
    accessToken: '',
    refreshToken: '',
    certificate: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      <Form>
        Credentials are not valid and must be added!
        {isPassword ? <Password /> : null}
        {isPkiKeys ? <PkiKeys system={system} /> : null}
        {isAccessKey ? <AccessKey /> : null}
        {isToken ? <Token /> : null}
        {isCert ? <Cert /> : null}
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
