import { useMutation, MutateOptions } from 'react-query';
import { Systems } from '@tapis/tapis-typescript';
import { createCredentials } from '../../tapis-api/systems';
import { useTapisConfig } from '..';
import QueryKeys from './queryKeys';
import { ReqUpdateCredential } from '@tapis/tapis-typescript-systems';

type AddCredentialsHookParams = {
  systemId: string;
  userName: string;
  reqUpdateCredential: ReqUpdateCredential;
};

const useCreateCredentials = () => {
  const { basePath, accessToken } = useTapisConfig();
  const jwt = accessToken?.access_token || '';

  const { mutate, isLoading, isError, isSuccess, data, error, reset } =
    useMutation<Systems.RespBasic, Error, AddCredentialsHookParams>(
      [QueryKeys.createCredentials, basePath, jwt],
      (params) => createCredentials(params, basePath, jwt)
    );

    // Return hook object with loading states and login function
  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    reset,
    createCredentials: (
      params: AddCredentialsHookParams,
      // react-query options to allow callbacks such as onSuccess
      options?: MutateOptions<
        Systems.RespBasic,
        Error,
        AddCredentialsHookParams
      >
    ) => {
      // Call mutate to trigger a single post-like API operation
      return mutate(params, options);
    },
  };
};

export default useCreateCredentials;
