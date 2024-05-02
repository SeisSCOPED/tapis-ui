import { cleanup } from '@testing-library/react';
import renderComponent from 'utils/testing';
import CreateSystemModal from './CreateSystemModal';

afterEach(cleanup);

describe('CreateSystemModal', () => {
  it('render CreateSystemModal component', () => {
    const { getAllByText } = renderComponent(
      <CreateSystemModal toggle={() => {}} />
    );
    expect(getAllByText('Create a new system').length).toBeGreaterThanOrEqual(
      1
    );
  });
});
