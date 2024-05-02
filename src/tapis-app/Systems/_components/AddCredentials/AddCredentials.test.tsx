import { cleanup } from '@testing-library/react';
import AddCredentials from './AddCredentials';
import renderComponent from 'utils/testing';
import { useDetails, useCreateCredentials } from 'tapis-hooks/systems';

afterEach(cleanup);

jest.mock('tapis-hooks/systems');

describe('AddCredentials', () => {
  it('render AddCredentials component', () => {
    (useDetails as jest.Mock).mockReturnValue({
      data: null,
    });
    (useCreateCredentials as jest.Mock).mockReturnValue({
      isLoading: false,
      isSuccess: true,
      error: null,
      createCredentials: null,
    });
    const { getAllByText } = renderComponent(<AddCredentials systemId={''} />);
    expect(getAllByText('Add Credentials').length).toBeGreaterThanOrEqual(1);
  });

  it('render AccessKey component', () => {
    (useDetails as jest.Mock).mockReturnValue({
      data: {
        result: {
          defaultAuthnMethod: 'ACCESS_KEY',
        },
      },
    });
    (useCreateCredentials as jest.Mock).mockReturnValue({
      isLoading: true,
      isSuccess: false,
      error: null,
      createCredentials: null,
    });

    const { getAllByText } = renderComponent(<AddCredentials systemId={''} />);
    expect(getAllByText('Access Key').length).toBeGreaterThanOrEqual(1);
  });

  it('render Password component', () => {
    (useDetails as jest.Mock).mockReturnValue({
      data: {
        result: {
          defaultAuthnMethod: 'PASSWORD',
        },
      },
    });
    (useCreateCredentials as jest.Mock).mockReturnValue({
      isLoading: true,
      isSuccess: false,
      error: null,
      createCredentials: null,
    });

    const { getAllByText } = renderComponent(<AddCredentials systemId={''} />);
    expect(getAllByText('Password').length).toBeGreaterThanOrEqual(1);
  });

  it('render Cert component', () => {
    (useDetails as jest.Mock).mockReturnValue({
      data: {
        result: {
          defaultAuthnMethod: 'CERT',
        },
      },
    });
    (useCreateCredentials as jest.Mock).mockReturnValue({
      isLoading: true,
      isSuccess: false,
      error: null,
      createCredentials: null,
    });

    const { getAllByText } = renderComponent(<AddCredentials systemId={''} />);
    expect(getAllByText('Certificate').length).toBeGreaterThanOrEqual(1);
  });

  it('render PkiKeys component', () => {
    (useDetails as jest.Mock).mockReturnValue({
      data: {
        result: {
          defaultAuthnMethod: 'PKI_KEYS',
        },
      },
    });
    (useCreateCredentials as jest.Mock).mockReturnValue({
      isLoading: true,
      isSuccess: false,
      error: null,
      createCredentials: null,
    });

    const { getAllByText } = renderComponent(<AddCredentials systemId={''} />);
    expect(getAllByText('Public Key').length).toBeGreaterThanOrEqual(1);
  });

  it('render Token component', () => {
    (useDetails as jest.Mock).mockReturnValue({
      data: {
        result: {
          defaultAuthnMethod: 'TOKEN',
        },
      },
    });
    (useCreateCredentials as jest.Mock).mockReturnValue({
      isLoading: true,
      isSuccess: false,
      error: null,
      createCredentials: null,
    });

    const { getAllByText } = renderComponent(<AddCredentials systemId={''} />);
    expect(getAllByText('Access Token').length).toBeGreaterThanOrEqual(1);
  });
});
