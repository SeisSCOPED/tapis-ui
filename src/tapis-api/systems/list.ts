import { Systems } from '@tapis/tapis-typescript';
import { apiGenerator, errorDecoder } from 'tapis-api/utils';

const list = (
  params: Systems.GetSystemsRequest, // contains all params, example: {select: 'allAttributes', listType: ListTypeEnum.All}
  basePath: string,
  jwt: string
) => {
  const api: Systems.SystemsApi = apiGenerator<Systems.SystemsApi>(
    Systems,
    Systems.SystemsApi,
    basePath,
    jwt
  );
  return errorDecoder<Systems.RespSystems>(() => api.getSystems(params));
};

export default list;
