import { Form } from 'formik';
import { FormikInput } from 'tapis-ui/_common';
import { FormikSelect } from 'tapis-ui/_common/FieldWrapperFormik';
import {
    RuntimeTypeEnum,
    SchedulerTypeEnum,
  } from '@tapis/tapis-typescript-systems';

const runtimeTypes = Object.values(RuntimeTypeEnum);
const schedulerTypes = Object.values(SchedulerTypeEnum);
const booleanValues = ['True', 'False'];

type AdvancedSettingsProp = {
    simplified: boolean,
  }
  
  const AdvancedSettings: React.FC<AdvancedSettingsProp> = ({simplified}) => {
    if (simplified) {
      return (
        <Form>
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
          <FormikSelect
            name="canRunBatch"
            description="Decides if the system can run batch"
            label="Can Run Batch"
            required={false}
            data-testid="canRunBatch"
          >
            <option disabled value="">
              Select a run batch option
            </option>
            {booleanValues.map((values) => {
              return <option>{values}</option>;
            })}
            </FormikSelect>
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
        </Form>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }

  export default AdvancedSettings