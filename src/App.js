import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      currentQuery: '',
      images: []
    };

  }

  handleInputChange(event) {
    this.setState({
      currentQuery: event.target.value
    });
  }

  getQuery(q) {
    const apiKey = '';
    return `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=25&offset=0&rating=G&lang=en`
  }

  componentWillUpdate(nextProps, nextState) {
    const newCurrentQuery = nextState.currentQuery;
    const oldCurrentQuery = this.state.currentQuery;

    if(newCurrentQuery !== oldCurrentQuery) {
      const query = this.getQuery(this.state.currentQuery);
      fetch(query)
      .then(res => res.json())
      .then(res => {
        this.setState({
          images: res.data
        });
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <img src={ logo } alt="Giphy"/>
        </div>
        <h2 className="app__h2">Search Thingy</h2>
        <input
          className="app__search"
          type="text"
          placeholder="Find some gifs"
          value={ this.state.currentQuery }
          onChange={ this.handleInputChange }
        />
        <div className="image-tile-container">
          {
            this.state.images.map((image, i) => {
              return <ImageTile key={ i } source={ image.images.fixed_height.mp4 } />
            })
          }
        </div>
      </div>
    );
  }
}

const ImageTile = ({
  source
}) => {
  return (
    <div className="image-tile">
      <video src={ source } autoPlay></video>
    </div>
  ); 
}

export default App;
