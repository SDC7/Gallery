import React from 'react';
import ReactDOM from 'react-dom';
import Responsive from 'react-responsive';
import { library, faLongArrowRight } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'

// const Desktop = props => <Responsive {...props} minWidth={992} />;
// const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
// const Mobile = props => <Responsive {...props} maxWidth={767} />;
// const Default = props => <Responsive {...props} minWidth={768} />;

class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: {},
      currentIndex: 0,
      translateValue: 0
    }

    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      pictures: this.props.props,
    })
  }

  goToPrevSlide() {
    if(this.state.currentIndex === 0) {
      return;
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }))
  }

  goToNextSlide() {
    if(this.state.currentIndex === this.state.pictures.length - 1) {
      return this.setState({
        currentIndex: 0,
        translateValue: 0
      })
    }
    
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -(this.slideWidth())
    }));
  }

  // handleClick() {
  //   this.props.close
  // }

  slideWidth() {
    return document.querySelector('.slide').clientWidth
  }

  render() {
    console.log(this.props, 'props in lightbox')
    return (
      <div>
      <div className="closeArrow closeMe">
        <i className="fal fa-times fa-3x" onClick={this.props.close}></i>
      </div>
      <div className="slider">
        <div className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}>
            {
              Object.entries(this.state.pictures).map(([ key, image ], i) => (
                <Slide key={Math.random()*i} image={image.url} caption={image.alt}/>
              ))
            }
        </div>
      </div>
      <div>
        <LeftArrow goToPrevSlide={this.goToPrevSlide} />
        <RightArrow goToNextSlide={this.goToNextSlide} />
      </div>
      </div>
    );
  }
}

const Slide = ({ image, caption }) => {
  const styles = {

  }
  return <div className="slide" style={styles}><img className="img-fluid" src={image} alt={caption}></img><div className="captions">{caption}</div></div>
}

const LeftArrow = (props) => {
  return (
    <div className="backArrow arrow" onClick={props.goToPrevSlide}>
      <i className="fal fa-angle-left fa-10x"></i>
    </div>
  );
}


const RightArrow = (props) => {
  return (
    <div className="nextArrow arrow" onClick={props.goToNextSlide}>
      <i className="fal fa-angle-right fa-10x"></i>
    </div>
  );
}

export default Lightbox;