import React from 'react';
import ReactDOM from 'react-dom';
import MainHero from './MainHero.jsx';
import Responsive from 'react-responsive';
import SideBar1 from './SideBar1.jsx';
import SideBar2 from './SideBar2.jsx';


class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hero-header hero-test">
          <MainHero images={this.props.props} press={this.props.press} />
          <SideBar1 images={this.props.props} press={this.props.press} />
          <SideBar2 images={this.props.props} press={this.props.press} />
      </div>
    )
  }
}

export default Gallery;