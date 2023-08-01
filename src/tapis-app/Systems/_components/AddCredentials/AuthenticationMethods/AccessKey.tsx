import { FormikInput } from 'tapis-ui/_common';

const AccessKey: React.FC = () => {
  return (
    <>
    <FormikInput
          name="accessKey"
          label="Access Key"
          required={true}
          description="Access key"
        />
        <FormikInput
          name="accessSecret"
          label="Access Secret"
          required={true}
          description="Access secret"
        />
        </>
  );
};

export default AccessKey;
