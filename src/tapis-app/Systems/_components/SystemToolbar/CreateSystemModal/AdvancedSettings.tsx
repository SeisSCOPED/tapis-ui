import { Form, useFormikContext } from 'formik';
import { FormikInput } from 'tapis-ui/_common';
import { FormikSelect } from 'tapis-ui/_common/FieldWrapperFormik';
import {
  RuntimeTypeEnum,
  SystemTypeEnum
} from '@tapis/tapis-typescript-systems';
import { useMemo } from 'react';
import { Systems } from '@tapis/tapis-typescript';
import BatchSettings from './BatchSettings';

const runtimeTypes = Object.values(RuntimeTypeEnum);

type AdvancedSettingsProp = {
  simplified: boolean;
};

const AdvancedSettings: React.FC<AdvancedSettingsProp> = ({ simplified }) => {

  if (simplified) {
    return (
      <Form style={{ paddingTop: '25px' }}>
        Advanced Settings
        <FormikInput
          name="rootDir"
          label="Root Directory"
          required={false}
          description={`Root directory`}
          aria-label="Input"
        />
        <FormikInput
          name="jobWorkingDir"
          label="Job Working Directory"
          required={false}
          description={`Job working directory`}
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
          description={`Effective user id`}
          aria-label="Input"
        />
        <BatchSettings />
      </Form>
    );
  } else {
    return null;
  }
};

export default AdvancedSettings;
