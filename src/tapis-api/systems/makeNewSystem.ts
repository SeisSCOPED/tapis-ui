import { Systems } from '@tapis/tapis-typescript';
import { apiGenerator, errorDecoder } from 'tapis-api/utils';

const makeNewSystem = (
  reqPostSystem: Systems.ReqPostSystem,
  basePath: string,
  jwt: string,
  skipCredentialCheck?: boolean
) => {
  const api: Systems.SystemsApi = apiGenerator<Systems.SystemsApi>(
    Systems,
    Systems.SystemsApi,
    basePath,
    jwt
  );
  return errorDecoder<Systems.RespBasic>(() =>
    api.createSystem({ reqPostSystem, skipCredentialCheck })
  );
};

export default makeNewSystem;
