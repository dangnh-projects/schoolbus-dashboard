import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './index';

describe('Dashhboard', () => {
  it('should render correctly ', () => {
    const component = shallow(<Dashboard />);
    expect(component).toMatchSnapshot();
  });
});
