import { render, cleanup } from '@testing-library/react';
import OAuthLogin from './OAuthLogin';

afterEach(cleanup);

describe('OAuthLogin', () => {
  it('render OAuthLogin component', () => {
    const { getByTestId } = render(<OAuthLogin />);
    const tokenValue = getByTestId('token');
    expect(tokenValue).toBeInTheDocument();
  });
});
