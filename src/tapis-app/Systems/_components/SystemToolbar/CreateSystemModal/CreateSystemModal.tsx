import { Button, FormGroup, Label, Input } from 'reactstrap';
import { GenericModal } from 'tapis-ui/_common';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import { ToolbarModalProps } from '../SystemToolbar';
import { Form, Formik } from 'formik';
import { FormikInput } from 'tapis-ui/_common';
import { useMakeNewSystem } from 'tapis-hooks/systems';
import { useEffect, useCallback } from 'react';
import styles from './CreateSystemModal.module.scss';
import * as Yup from 'yup';
import {
  SystemTypeEnum,
  AuthnEnum,
  JobRuntime,
  RuntimeTypeEnum,
} from '@tapis/tapis-typescript-systems';
import { useQueryClient } from 'react-query';
import { default as queryKeys } from 'tapis-hooks/systems/queryKeys';

const systemTypes = ['LINUX', 'S3', 'IRODS', 'GLOBUS'];
const authnMethods = ['PASSWORD', 'PKI_KEYS', 'ACCESS_KEY', 'TOKEN', 'CERT'];
const booleanValues = ['True', 'False'];

const CreateSystemModal: React.FC<ToolbarModalProps> = ({ toggle }) => {
  const queryClient = useQueryClient();

  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries(queryKeys.list);
  }, [queryClient]);

  const { makeNewSystem, isLoading, error, isSuccess, reset } =
    useMakeNewSystem();

  useEffect(() => {
    reset();
  }, [reset]);

  const validationSchema = Yup.object({
    sysname: Yup.string()
      .min(1)
      .max(255, 'System name should not be longer than 255 characters')
      .matches(
        /^[a-zA-Z0-9_.-]+$/,
        "Must contain only alphanumeric characters and the following: '.', '_', '-'"
      )
      .required('System name is a required field'),
    host: Yup.string()
      .min(1)
      .max(255, 'Host name should not be longer than 255 characters')
      .matches(
        /^[a-zA-Z0-9_.-]+$/,
        "Must contain only alphanumeric characters and the following: '.', '_', '-'"
      )
      .required('Host name is a required field'),
  });

  const initialValues = {
    sysname: '',
    systemType: SystemTypeEnum.Linux,
    host: 'stampede2.tacc.utexas.edu',
    defaultAuthnMethod: AuthnEnum.Password,
    canExec: 'True',
    rootDir: '/',
    jobWorkingDir: 'HOST_EVAL($SCRATCH)',
    jobRuntimes: [{ runtimeType: RuntimeTypeEnum.Singularity }],
  };

  const onSubmit = ({
    sysname,
    systemType,
    host,
    defaultAuthnMethod,
    canExec,
    rootDir,
    jobWorkingDir,
    jobRuntimes,
  }: {
    sysname: string;
    systemType: SystemTypeEnum;
    host: string;
    defaultAuthnMethod: AuthnEnum;
    canExec: string;
    rootDir: string;
    jobWorkingDir: string;
    jobRuntimes: Array<JobRuntime>;
  }) => {
    const canExecBool = canExec.toLowerCase() === 'true';
    makeNewSystem(
      {
        id: sysname,
        systemType,
        host,
        defaultAuthnMethod,
        canExec: canExecBool,
        rootDir,
        jobWorkingDir,
        jobRuntimes,
      },
      true,
      { onSuccess }
    );
  };

  return (
    <GenericModal
      toggle={toggle}
      className={styles['modal']}
      title="Create New System"
      body={
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, handleChange }) => (
              <Form id="newsystem-form">
                <FormikInput
                  name="sysname"
                  label="System Name"
                  required={false}
                  description={`System name`}
                  aria-label="Input"
                />
                <FormGroup>
                  <Label
                    style={{ fontSize: 14, fontWeight: 'bold' }}
                    for="systemType"
                  >
                    System Type
                  </Label>
                  <Input
                    id="systemType"
                    name="systemType"
                    type="select"
                    value={values.systemType}
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      Select a system type
                    </option>
                    {systemTypes.map((values) => {
                      return <option>{values}</option>;
                    })}
                  </Input>
                </FormGroup>
                <FormikInput
                  name="host"
                  label="Host"
                  required={false}
                  description={`Host of the system`}
                  aria-label="Input"
                />
                <FormGroup>
                  <Label
                    style={{ fontSize: 14, fontWeight: 'bold' }}
                    for="defaultAuthnMethod"
                  >
                    Default Authentication Method
                  </Label>
                  <Input
                    id="defaultAuthnMethod"
                    name="defaultAuthnMethod"
                    type="select"
                    value={values.defaultAuthnMethod}
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      Select a default athenication method
                    </option>
                    {authnMethods.map((values) => {
                      return <option>{values}</option>;
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label
                    style={{ fontSize: 14, fontWeight: 'bold' }}
                    for="canExec"
                  >
                    Can Execute
                  </Label>
                  <Input
                    id="canExec"
                    name="canExec"
                    type="select"
                    value={values.canExec}
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      Select an execute option
                    </option>
                    {booleanValues.map((values) => {
                      return <option>{values}</option>;
                    })}
                  </Input>
                  <FormikInput
                    name="rootDir"
                    label="Root Directory"
                    required={false}
                    description={`Root Directory`}
                    aria-label="Input"
                  />
                </FormGroup>
              </Form>
            )}
          </Formik>
        </div>
      }
      footer={
        <SubmitWrapper
          isLoading={isLoading}
          error={error}
          success={isSuccess ? `Successfully created a new system` : ''}
          reverse={true}
        >
          <Button
            form="newsystem-form"
            color="primary"
            disabled={isLoading || isSuccess}
            aria-label="Submit"
            type="submit"
          >
            Create a new system
          </Button>
        </SubmitWrapper>
      }
    />
  );
};

export default CreateSystemModal;
