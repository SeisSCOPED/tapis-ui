import { FormikInput } from 'tapis-ui/_common';

const Token: React.FC = () => {
  return (
    <>
      <FormikInput
        name="accessToken"
        label="Access Token"
        required={true}
        description="Access token"
      />
      <FormikInput
        name="refreshToken"
        label="Refresh Token"
        required={true}
        description="Refresh token"
      />
    </>
  );
};

export default Token;
