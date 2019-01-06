import sum from '../__tests__functions/functions';
import fetchUser from '../__tests__functions/fetchUser';
import Test from '../__tests__functions/react-functions';
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import Gallery from '../client/src/components/Gallery';
import MainHero from '../client/src/components/MainHero';

describe("start tests", () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).not.toBe(5)
  })
});

describe('Simple Stateless React Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Test />);
  });

  it('includes 1 div with class foo', () => {
    expect(wrapper.find('span.bar').text()).toBe('Hey!')
  });
});

describe('Gallery Renders In Debug', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Gallery debug />);
    expect(component).toMatchSnapshot();
  });

  it('should find class name', () => {
    const wrapper = mount(<Gallery />);
    console.log(wrapper, 'this is the wrapper')
    expect(wrapper.find('div').hasClass('hero-header')).toBeTruthy()
  });

  it('should read props right', () => {
    const component = mount(<Gallery title="Events"/>);
    expect(component.prop('title')).toEqual('Events');
  });
});

describe('MainHero can have Live Props', () => {
  let output;
  const images = {
    images: {
      mainPicture: {
        alt: "Little house in Paris, Loft, Canal",
        url: "https://s3-us-west-1.amazonaws.com/airjld-photos/174db9b0-52f1-4611-a49e-50c160b80534.jpg",
        _id: "5bd67ab5aa60ca097666899c",
      }
    }
  }

  it('should read props right', () => {
    output = mount(<MainHero props={images}/>)
    console.log(output, 'output debug');
    expect(output.prop('props')).toEqual(images);
  })
  
})

