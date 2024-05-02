import { cleanup } from '@testing-library/react';
import renderComponent from 'utils/testing';
import OAuthLogin from './OAuthLogin';

afterEach(cleanup);

describe('OAuthLogin', () => {
  it('render OAuthLogin component', () => {
    const { getByTestId } = renderComponent(<OAuthLogin />);
    const tokenValue = getByTestId('token');
    expect(tokenValue).toBeInTheDocument();
  });
});
