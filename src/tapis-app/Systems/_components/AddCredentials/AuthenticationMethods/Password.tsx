import { FormikInput } from 'tapis-ui/_common';

const Password: React.FC = () => {
  return (
    <>
    <FormikInput
          name="username"
          label="Username"
          required={true}
          description="Your TAPIS username"
        />
        <FormikInput
          name="password"
          label="Password"
          required={true}
          description="Your TAPIS password"
          type="password"
        />
        </>
  );
};

export default Password;
