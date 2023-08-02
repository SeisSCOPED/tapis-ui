import { FormikInput } from 'tapis-ui/_common';

const Cert: React.FC = () => {
  return (
    <>
      <FormikInput
        name="certificate"
        label="Certificate"
        required={true}
        description="Certificate"
      />
    </>
  );
};

export default Cert;
