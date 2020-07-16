import React from 'react';
import { Form } from './Form';
import { shallow } from 'enzyme';

describe('Form component', () => {
    it('has basic markup', () => {
        const wrapper = shallow(<Form />);
        expect(wrapper.find('input').length).toBe(1);
        expect(wrapper.find('label').length).toBe(1);
    });
});
