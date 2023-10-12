import { errorDecoder } from 'tapis-api/utils';
// import StreamSaver from 'streamsaver';

const getContents = (
  systemId: string,
  path: string,
  destination: string,
  zip: boolean,
  onStart: null | ((response: Response) => void),
  basePath: string,
  jwt: string
): Promise<Response> => {
  const url = `${basePath}/v3/files/content/${systemId}/${path}${
    zip ? '?zip=true' : ''
  }`;

  const config = {
    headers: {
      'X-Tapis-Token': jwt,
    },
  };

  return errorDecoder<Response>(() => fetch(url, config));
};

export default getContents;
