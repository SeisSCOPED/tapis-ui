import { Form, useFormikContext } from 'formik';
import { FormikInput, Collapse } from 'tapis-ui/_common';
import { FormikSelect, FormikCheck } from 'tapis-ui/_common/FieldWrapperFormik';
import {
  RuntimeTypeEnum,
  SchedulerTypeEnum,
} from '@tapis/tapis-typescript-systems';
import { useMemo } from 'react';
import { Systems } from '@tapis/tapis-typescript';

const runtimeTypes = Object.values(RuntimeTypeEnum);
const schedulerTypes = Object.values(SchedulerTypeEnum);

type AdvancedSettingsProp = {
  simplified: boolean;
};

const AdvancedSettings: React.FC<AdvancedSettingsProp> = ({ simplified }) => {
  const { values } = useFormikContext();
  const canRunBatch = useMemo(
    () => (values as Partial<Systems.ReqPutSystem>).canRunBatch,
    [values]
  );

  if (simplified) {
    return (
      <Form style={{ paddingTop: '25px' }}>
        Advanced Settings
        <FormikInput
          name="rootDir"
          label="Root Directory"
          required={false}
          description={`Root Directory`}
          aria-label="Input"
        />
        <FormikInput
          name="jobWorkingDir"
          label="Job Working Directory"
          required={false}
          description={`Job Working Directory`}
          aria-label="Input"
        />
        <FormikSelect
          name="jobRuntimes"
          description="The job runtime type for the system"
          label="Job Runtimes"
          required={false}
          data-testid="jobRuntimes"
        >
          <option disabled value="">
            Select a job runtime
          </option>
          {runtimeTypes.map((values) => {
            return <option>{values}</option>;
          })}
        </FormikSelect>
        <FormikInput
          name="effectiveUserId"
          label="Effective User ID"
          required={false}
          description={`Effective User ID`}
          aria-label="Input"
        />
        <FormikCheck
          name="canRunBatch"
          required={false}
          label="Can Run Batch"
          description={'Decides if the system can run batch'}
        />
        {canRunBatch ? (
          <div>
            <FormikSelect
              name="batchScheduler"
              description="Batch scheduler for the system"
              label="Batch Scheduler"
              required={false}
              data-testid="batchScheduler"
            >
              <option disabled value="">
                Select an batch scheduler
              </option>
              {schedulerTypes.map((values) => {
                return <option>{values}</option>;
              })}
            </FormikSelect>
            <FormikInput
              name="batchSchedulerProfile"
              label="Batch Scheduler Profile"
              required={false}
              description={`Batch Scheduler Profile`}
              aria-label="Input"
            />
            <FormikInput
              name="batchDefaultLogicalQueue"
              label="Batch Default Logical Queue"
              required={false}
              description={`Batch Default Logical Queue`}
              aria-label="Input"
            />
            <Collapse title="Batch Logical Queue Settings">
                <FormikInput
                name="batchLogicalQueuesName"
                label="Name"
                required={true}
                description={`Name`}
                aria-label="Input"
                />
                <FormikInput
                name="hpcQueueName"
                label="HPC Queue Name"
                required={true}
                description={`HPC Queue Name`}
                aria-label="Input"
                />
                <FormikInput
                name="maxJobs"
                label="Max Jobs"
                required={false}
                description={`Maximum Jobs`}
                aria-label="Input"
                />
                <FormikInput
                name="maxJobsPerUser"
                label="Max Jobs Per User"
                required={false}
                description={`Maximum Jobs Per User`}
                aria-label="Input"
                />
                <FormikInput
                name="minNodeCount"
                label="Min Node Count"
                required={false}
                description={`Minimum Node Count`}
                aria-label="Input"
                />
                <FormikInput
                name="maxNodeCount"
                label="Max Node Count"
                required={false}
                description={`Maximum Node Count`}
                aria-label="Input"
                />
                <FormikInput
                name="minCoresPerNode"
                label="Min Cores Per Node"
                required={false}
                description={`Minimum Cores Per Node`}
                aria-label="Input"
                />
                <FormikInput
                name="maxCoresPerNode"
                label="Max Cores Per Node"
                required={false}
                description={`Maximum Cores Per Node`}
                aria-label="Input"
                />
                <FormikInput
                name="minMemoryMB"
                label="Min Memory MB"
                required={false}
                description={`Minimum Memory MB`}
                aria-label="Input"
                />
                <FormikInput
                name="maxMemoryMB"
                label="Max Memory MB"
                required={false}
                description={`Maximum Memory MB`}
                aria-label="Input"
                />
                <FormikInput
                name="minMinutes"
                label="Min Minutes"
                required={false}
                description={`Minimum Minutes`}
                aria-label="Input"
                />
                <FormikInput
                name="maxMinutes"
                label="Max Minutes"
                required={false}
                description={`Maximum Minutes`}
                aria-label="Input"
                />
            </Collapse>
          </div>
        ) : null}
      </Form>
    );
  } else {
    return <div></div>;
  }
};

export default AdvancedSettings;
