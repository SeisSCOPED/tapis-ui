import { Systems } from '@tapis/tapis-typescript';
import { apiGenerator, errorDecoder } from 'tapis-api/utils';

const createCredentials = (
  params: Systems.CreateUserCredentialRequest,
  basePath: string = 'https://scoped.tapis.io',
  jwt: string
) => {
  const api: Systems.CredentialsApi = apiGenerator<Systems.CredentialsApi>(
    Systems,
    Systems.CredentialsApi,
    basePath,
    jwt
  );

  return errorDecoder<Systems.RespBasic>(() =>
    api.createUserCredential(params)
  );
};

export default createCredentials;
