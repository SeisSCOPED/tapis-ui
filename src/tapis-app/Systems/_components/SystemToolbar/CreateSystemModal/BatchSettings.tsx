import { useFormikContext } from 'formik';
import { FormikInput, Collapse } from 'tapis-ui/_common';
import { FormikSelect, FormikCheck } from 'tapis-ui/_common/FieldWrapperFormik';
import {
  SchedulerTypeEnum,
  SystemTypeEnum,
} from '@tapis/tapis-typescript-systems';
import { useMemo } from 'react';
import { Systems } from '@tapis/tapis-typescript';

//Array that is used in the drop-down menus
const schedulerTypes = Object.values(SchedulerTypeEnum);

const BatchSettings: React.FC = () => {
  //used when trying to read the current value of a parameter
  const { values } = useFormikContext();

  //reading the canRunBatch at its current state
  const canRunBatch = useMemo(
    () => (values as Partial<Systems.ReqPostSystem>).canRunBatch,
    [values]
  );
  //reading if the systemType is Linux at its current state
  const isLinux = useMemo(
    () =>
      (values as Partial<Systems.ReqPostSystem>).systemType ===
      SystemTypeEnum.Linux,
    [values]
  );

  return (
    <div>
      {isLinux ? (
        <Collapse title="Batch Settings">
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
                  Select a batch scheduler
                </option>
                {schedulerTypes.map((values) => {
                  return <option>{values}</option>;
                })}
              </FormikSelect>
              <FormikInput
                name="batchSchedulerProfile"
                label="Batch Scheduler Profile"
                required={false}
                description={`Batch scheduler profile`}
                aria-label="Input"
              />
              <FormikInput
                name="batchDefaultLogicalQueue"
                label="Batch Default Logical Queue"
                required={false}
                description={`Batch default logical queue`}
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
                  description={`HPC queue name`}
                  aria-label="Input"
                />
                <FormikInput
                  name="maxJobs"
                  label="Max Jobs"
                  required={false}
                  description={`Maximum number of jobs`}
                  aria-label="Input"
                />
                <FormikInput
                  name="maxJobsPerUser"
                  label="Max Jobs Per User"
                  required={false}
                  description={`Maximum number of jobs per user`}
                  aria-label="Input"
                />
                <FormikInput
                  name="minNodeCount"
                  label="Min Node Count"
                  required={false}
                  description={`Minimum number of nodes`}
                  aria-label="Input"
                />
                <FormikInput
                  name="maxNodeCount"
                  label="Max Node Count"
                  required={false}
                  description={`Maximum number of nodes`}
                  aria-label="Input"
                />
                <FormikInput
                  name="minCoresPerNode"
                  label="Min Cores Per Node"
                  required={false}
                  description={`Minimum number of cores per node`}
                  aria-label="Input"
                />
                <FormikInput
                  name="maxCoresPerNode"
                  label="Max Cores Per Node"
                  required={false}
                  description={`Maximum number of cores per node`}
                  aria-label="Input"
                />
                <FormikInput
                  name="minMemoryMB"
                  label="Min Memory MB"
                  required={false}
                  description={`Minimum memory in MB`}
                  aria-label="Input"
                />
                <FormikInput
                  name="maxMemoryMB"
                  label="Max Memory MB"
                  required={false}
                  description={`Maximum memory in MB`}
                  aria-label="Input"
                />
                <FormikInput
                  name="minMinutes"
                  label="Min Minutes"
                  required={false}
                  description={`Minimum number of minutes`}
                  aria-label="Input"
                />
                <FormikInput
                  name="maxMinutes"
                  label="Max Minutes"
                  required={false}
                  description={`Maximum number of minutes`}
                  aria-label="Input"
                />
              </Collapse>
            </div>
          ) : null}
        </Collapse>
      ) : null}
    </div>
  );
};

export default BatchSettings;
