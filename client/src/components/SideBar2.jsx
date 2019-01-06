import React from 'react';
import ReactDOM from 'react-dom';
import MainHero from './MainHero.jsx';
import Responsive from 'react-responsive';

class SideBar2 extends React.Component {
  render() {
    console.log(this.props, 'this is props on sidebar2')
    return (
    <div className="sidebar-two">
      <div className="image-holder">
        <img onClick={this.props.press} src={this.props.images.picture3.url} alt={this.props.images.picture3.alt} className="img-fluid img-animation"/>
      </div>
      <div className="image-holder">
        <img onClick={this.props.press} src={this.props.images.picture4.url} alt={this.props.images.picture4.alt} className="img-fluid img-animation"/>
      </div>
    </div>
    )
  }
}

export default SideBar2

// import React from 'react';
// import ReactDOM from 'react-dom';
// import MainHero from './MainHero.jsx';
// import Responsive from 'react-responsive';

// class SideBar2 extends React.Component {
//   render() {
//     console.log(this.props, 'this is props on sidebar2')
//     return (
//     <div className="sidebar-two">
//       <div className="image-holder">
//         <img onClick={this.props.press} src={this.props.images.picture3.url} alt={this.props.images.picture3.alt} className="img-fluid img-animation"/>
//       </div>
//       <div className="image-holder">
//         <img onClick={this.props.press} src={this.props.images.picture4.url} alt={this.props.images.picture4.alt} className="img-fluid img-animation"/>
//       </div>
//     </div>
//     )
//   }
// }

// export default SideBar2