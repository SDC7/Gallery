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
    
  }

  grabPhotos() {
    fetch(`http://localhost:1128/listings/${this.randomList()}`)
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.setState({
          mainPicture: result[0].urls[0],
          picture1: result[0].urls[1],
          picture2: result[0].urls[2],
          picture3: result[0].urls[3],
          picture4: result[0].urls[4],
          pictures: result[0].urls
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

  componentWillMount() {
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