import { FormikInput, Collapse } from 'tapis-ui/_common';
import { FormikSelect } from 'tapis-ui/_common/FieldWrapperFormik';
import { RuntimeTypeEnum } from '@tapis/tapis-typescript-systems';
import { Systems } from '@tapis/tapis-typescript';
import { useMemo } from 'react';
import { SystemTypeEnum } from '@tapis/tapis-typescript-systems';
import { useFormikContext } from 'formik';
import BatchSettings from './BatchSettings';
import ProxySettings from './ProxySettings';
import DtnSettings from './DtnSettings';

const runtimeTypes = Object.values(RuntimeTypeEnum);

type AdvancedSettingsProp = {
  simplified: boolean;
};

const AdvancedSettings: React.FC<AdvancedSettingsProp> = ({ simplified }) => {
  const { values } = useFormikContext();

  const isS3 = useMemo(
    () =>
      (values as Partial<Systems.ReqPostSystem>).systemType ===
      SystemTypeEnum.S3,
    [values]
  );

  const runtimeType = (values as Partial<Systems.ReqPostSystem>).jobRuntimes;

  if (simplified) {
    return (
      <Collapse title="Advanced Settings">
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
          label="Runtime Type"
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
          name="version"
          label={`${runtimeType} Version`}
          required={false}
          description={`Version of ${runtimeType}`}
          aria-label="Input"
          disabled={true}
        />
        <FormikInput
          name="effectiveUserId"
          label="Effective User ID"
          required={false}
          description={`Effective user id`}
          aria-label="Input"
        />
        {isS3 ? (
          <FormikInput
            name="bucketName"
            label="Bucket Name"
            required={false}
            description={`Bucket name`}
            aria-label="Input"
          />
        ) : null}
        <BatchSettings />
        <ProxySettings />
        <DtnSettings />
      </Collapse>
    );
  } else {
    return null;
  }
};

export default AdvancedSettings;
