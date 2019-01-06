import React from 'react';
import ReactDOM from 'react-dom';

class MainHero extends React.Component {
  static defaultProps = {
    images: {
      mainPicture: {
        alt: "Little house in Paris, Loft, Canal",
        url: "https://s3-us-west-1.amazonaws.com/airjld-photos/174db9b0-52f1-4611-a49e-50c160b80534.jpg",
        _id: "5bd67ab5aa60ca097666899c",
      }
    }
  }

  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props, 'this is props in MainHero')
    return(
      <div className="mainHero">
        <div className="mainImage">
        <img onClick={this.props.press} src={this.props.images.mainPicture.url} alt={this.props.images.mainPicture.alt} className="img-main" width="1440" height="960"/>
        </div>
      </div>
    )
  }
}

export default MainHero;