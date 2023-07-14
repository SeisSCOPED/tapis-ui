import { Button, Input, FormGroup, Label } from 'reactstrap';
import { GenericModal } from 'tapis-ui/_common';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import { ToolbarModalProps } from '../SystemToolbar';
import { Form, Formik } from 'formik';
import { FormikInput } from 'tapis-ui/_common';
import { FormikSelect } from 'tapis-ui/_common/FieldWrapperFormik';
import { useMakeNewSystem } from 'tapis-hooks/systems';
import { useEffect, useCallback, useState } from 'react';
import styles from './CreateSystemModal.module.scss';
import * as Yup from 'yup';
import {
  SystemTypeEnum,
  AuthnEnum,
  RuntimeTypeEnum,
  LogicalQueue,
  SchedulerTypeEnum,
} from '@tapis/tapis-typescript-systems';
import { useQueryClient } from 'react-query';
import { default as queryKeys } from 'tapis-hooks/systems/queryKeys';
import AdvancedSettings from './AdvancedSettings';

//Arrays that are used in the drop-down menus
const systemTypes = Object.values(SystemTypeEnum);
const authnMethods = Object.values(AuthnEnum);
const booleanValues = ['True', 'False'];

const CreateSystemModal: React.FC<ToolbarModalProps> = ({ toggle }) => {
  //Allows the system list to update without the user having to refresh the page
  const queryClient = useQueryClient();
  const onSuccess = useCallback(() => {
    queryClient.invalidateQueries(queryKeys.list);
  }, [queryClient]);

  const { makeNewSystem, isLoading, error, isSuccess, reset } =
    useMakeNewSystem();

  useEffect(() => {
    reset();
  }, [reset]);

  const [simplified, setSimplified] = useState(false);
  const onChange = useCallback(() => {
    setSimplified(!simplified);
  }, [setSimplified, simplified]);

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
    root: Yup.string(),
    jobWorkingDir: Yup.string(),
    effectiveUserId: Yup.string(),
    batchSchedulerProfile: Yup.string(),
    batchDefaultLogicalQueue: Yup.string(),
  });

  const initialValues = {
    sysname: '',
    systemType: SystemTypeEnum.Linux,
    host: 'stampede2.tacc.utexas.edu',
    defaultAuthnMethod: AuthnEnum.Password,
    canExec: 'True',
    rootDir: '/',
    jobWorkingDir: 'HOST_EVAL($SCRATCH)',
    jobRuntimes: RuntimeTypeEnum.Singularity,
    effectiveUserId: '${apiUserId}',
    canRunBatch: 'True',
    batchScheduler: SchedulerTypeEnum.Slurm,
    batchSchedulerProfile: 'tacc',
    batchDefaultLogicalQueue: 'tapisNormal',
    batchLogicalQueues: [
      {
        name: 'tapisNormal',
        hpcQueueName: 'normal',
        maxJobs: 50,
        maxJobsPerUser: 10,
        minNodeCount: 1,
        maxNodeCount: 16,
        minCoresPerNode: 1,
        maxCoresPerNode: 68,
        minMemoryMB: 1,
        maxMemoryMB: 16384,
        minMinutes: 1,
        maxMinutes: 60,
      },
    ],
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
    effectiveUserId,
    canRunBatch,
    batchScheduler,
    batchSchedulerProfile,
    batchDefaultLogicalQueue,
    batchLogicalQueues,
  }: {
    sysname: string;
    systemType: SystemTypeEnum;
    host: string;
    defaultAuthnMethod: AuthnEnum;
    canExec: string;
    rootDir: string;
    jobWorkingDir: string;
    jobRuntimes: RuntimeTypeEnum;
    effectiveUserId: string;
    canRunBatch: string;
    batchScheduler: SchedulerTypeEnum;
    batchSchedulerProfile: string;
    batchDefaultLogicalQueue: string;
    batchLogicalQueues: Array<LogicalQueue>;
  }) => {
    //Converting the string into a boolean value
    const canExecBool = canExec.toLowerCase() === 'true';
    const canRunBatchBool = canRunBatch.toLowerCase() === 'true';

    const jobRuntimesArray = [{ runtimeType: jobRuntimes }]

    //Creating the new system
    makeNewSystem(
      {
        id: sysname,
        systemType,
        host,
        defaultAuthnMethod,
        canExec: canExecBool,
        rootDir,
        jobWorkingDir,
        jobRuntimes: jobRuntimesArray,
        effectiveUserId,
        canRunBatch: canRunBatchBool,
        batchScheduler,
        batchSchedulerProfile,
        batchDefaultLogicalQueue,
        batchLogicalQueues,
      },
      true,
      { onSuccess }
    );
  };

  return (
    <GenericModal
      toggle={toggle}
      className={simplified ? styles['advanced-settings']: ''}
      title="Create New System"
      body={
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form id="newsystem-form">
                <FormGroup check>
                  <Label check size="sm" className={`form-field__label`}>
                    <Input type="checkbox" onChange={onChange} />
                    Advanced Settings
                  </Label>
                </FormGroup>
                <FormikInput
                  name="sysname"
                  label="System Name"
                  required={true}
                  description={`System name`}
                  aria-label="Input"
                />
                <FormikSelect
                  name="systemType"
                  description="The system type"
                  label="System Type"
                  required={true}
                  data-testid="systemType"
                >
                  <option disabled value={''}>
                    Select a system type
                  </option>
                  {systemTypes.map((values) => {
                    return <option>{values}</option>;
                  })}
                </FormikSelect>
                <FormikInput
                  name="host"
                  label="Host"
                  required={true}
                  description={`Host of the system`}
                  aria-label="Input"
                />
                <FormikSelect
                  name="defaultAuthnMethod"
                  description="Authentication method for the system"
                  label="Default Authentication Method"
                  required={true}
                  data-testid="defaultAuthnMethod"
                >
                  <option disabled value="">
                    Select a default athenication method
                  </option>
                  {authnMethods.map((values) => {
                    return <option>{values}</option>;
                  })}
                </FormikSelect>
                <FormikSelect
                  name="canExec"
                  description="Decides if the system can execute"
                  label="Can Execute"
                  required={true}
                  data-testid="canExec"
                >
                  <option disabled value="">
                    Select an execute option
                  </option>
                  {booleanValues.map((values) => {
                    return <option>{values}</option>;
                  })}
                </FormikSelect>
                <AdvancedSettings simplified={simplified}/>
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
