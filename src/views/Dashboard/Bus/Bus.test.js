import React from 'react';
import { shallow } from 'enzyme';
import { Batch } from './index';
import { Button } from 'antd';
import DataTable from 'components/DataTable';
import GridView from 'components/GridView';

describe('Dashhboard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Batch />);
  });

  it('should render correctly ', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('Component state', () => {
    it('have default view state', () => {
      expect(wrapper.find(DataTable)).toHaveLength(1);
      expect(wrapper.find(GridView)).toHaveLength(0);
    });

    describe('When click change view', () => {
      beforeAll(() => {
        console.log(wrapper.find(Button));
      });
      // it("")
    });
  });
});
