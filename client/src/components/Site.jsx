import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery.jsx';
import Lightbox from './Lightbox.jsx';

class Site extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      view: 'header',
      mainPicture: [],
      picture1: [],
      picture2: [],
      picture3: [],
      picture4: [],
      pictures: []
    }
    this.onPhotoPress = this.onPhotoPress.bind(this)
    this.onClosePress = this.onClosePress.bind(this)
    this.grabPhotos = this.grabPhotos.bind(this);
  }

  grabPhotos() {
    fetch(`/gallery/${this.randomList()}`)
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log(result);
        console.log(result[0].url);
          this.setState({
            mainPicture: { url: result[0].url, alt: result[0].alt },
            picture1: { url: result[1].url, alt: result[1].alt },
            picture2: { url: result[2].url, alt: result[2].alt },
            picture3: { url: result[3].url, alt: result[3].alt },
            picture4: { url: result[4].url, alt: result[4].alt },
            pictures: { url: result[5].url, alt: result[5].alt }
          })
      })
  }

  randomList() {
    let random = Math.floor(Math.random() * 599) + 1;
    return random;
  }

  onPhotoPress() {
    this.setState({
      view: 'lightbox'
    })
  }

  onClosePress() {
    this.setState({
      view: 'header'
    })
  }

  componentDidMount() {
    this.grabPhotos();
  }

  renderView() {
    if (this.state.view === 'header') {
      return (<Gallery props={this.state} press={this.onPhotoPress}/>)
    } else if (this.state.view === 'lightbox') {
      return (<Lightbox props={this.state} close={this.onClosePress}/>)
    }
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    )
  }
}

export default Site;