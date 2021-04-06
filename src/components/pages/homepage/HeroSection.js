import './HeroSection.css';
import { HomeButton } from './HomeButton';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import paletka from '../../../images/rakietka2.png';
import stolik from '../../../images/stolik.svg';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


const mapStyles = {
  width: '100%',
  height: '100%',
};

const containerStyle = {
  position: 'relative',  
  width: '500px',
  height: '350px'
}

export class HeroSection extends Component{
constructor() {
  super();

  this.state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };
}
  

onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
 
  render() {
    return (
      <>
        <div className='home__hero-section'>
          <div className='home_container'>
            <div
              className='home_row home__hero-row'
              style={{
                display: 'flex',
                flexDirection: 'home_row'
              }}
            >
              <div className='home_col'>
                <div className='home__hero-text-wrapper'>
                  <div className='top-line'>Ping-Pong madness</div>
                  <h1 className='heading dark'>
                    Unlimited FUN only with US
                  </h1>
                  <p
                    className={
                        'home__hero-subtitle dark'
                    }
                  >
                    Our company provides special places where you can play the best game in the world - Table Tennis.
                  </p>
                  <Link to='/Registration'>
                    <HomeButton buttonSize='home_btn--wide' buttonColor='red'>
                      Get Started
                    </HomeButton>
                  </Link>
                </div>
              </div>
              <div className='home_col'>
                <div className='home__hero-img-wrapper'>
                  <img src={paletka} alt='Paletka' className='home__hero-img' />
                </div>
              </div>
            </div>
          </div>
        </div>







        <div
        className='home__hero-section darkBg'
      >
        <div className='home_container'>
          <div
            className='home_row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: 'row-reverse'
            }}
          >
            <div className='home_col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>CONVENIENT PLACES</div>
                <h1 className='heading'>
                  Gliwice
                </h1>
                <p
                  className= 'home__hero-subtitle'
                >
                  Akademicka 16, 44-100 Gliwice
                </p>
                <Link to='/Registration'>
                  <HomeButton buttonSize='home_btn--wide' buttonColor='red'>
                    Book now
                  </HomeButton>
                </Link>
              </div>
            </div>
            <div className='home_col'>
                  <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    containerStyle={containerStyle}
                    initialCenter={
                      {
                        lat: 50.288620528249055,
                        lng: 18.67799575608431
                      }
                    }
                  > 
                    <Marker
                      onClick={this.onMarkerClick}
                      name={'Akademicka 16, 44-100 Gliwice'}
                    />
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                    >
                      <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                      </div>
                    </InfoWindow>
                  </Map>  
            </div>
          </div>
        </div>
      </div>





      <div
        className='home__hero-section'
      >
        <div className='home_container'>
          <div
            className='home_row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: 'home-row'
            }}
          >
            <div className='home_col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>CONVENIENT PLACES</div>
                <h1 className='heading dark'>
                  Brzóski Stare
                </h1>
                <p
                  className= 'home__hero-subtitle'
                >
                  Brzóski Stare 25, 18-200 Brzóski Stare
                </p>
                <Link to='/Registration'>
                  <HomeButton buttonSize='home_btn--wide' buttonColor='red'>
                    Book now
                  </HomeButton>
                </Link>
              </div>
            </div>
            <div className='home_col'>
                  <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    containerStyle={containerStyle}
                    initialCenter={
                      {
                        lat: 52.90882984715951, 
                        lng: 22.592093811955063
                      }
                    }
                  > 
                    <Marker
                      onClick={this.onMarkerClick}
                      name={'Brzóski Stare 25, 18-200 Brzóski Stare'}
                    />
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                    >
                      <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                      </div>
                    </InfoWindow>
                  </Map>  
            </div>
          </div>
        </div>
      </div>






      <div
        className='home__hero-section darkBg'
      >
        <div className='home_container'>
          <div
            className='home_row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: 'row-reverse'
            }}
          >
            <div className='home_col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>CONVENIENT PLACES</div>
                <h1 className='heading'>
                  Ruda Śląska
                </h1>
                <p
                  className= 'home__hero-subtitle'
                >
                  Kłodnicka 54, 41-706 Ruda Śląska
                </p>
                <Link to='/Registration'>
                  <HomeButton buttonSize='home_btn--wide' buttonColor='red'>
                    Book now
                  </HomeButton>
                </Link>
              </div>
            </div>
            <div className='home_col'>
                  <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    containerStyle={containerStyle}
                    initialCenter={
                      {
                        lat: 50.24048053124295, 
                        lng: 18.853585222372146
                      }
                    }
                  > 
                    <Marker
                      onClick={this.onMarkerClick}
                      name={'Kłodnicka 54, 41-706 Ruda Śląska'}
                    />
                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                    >
                      <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                      </div>
                    </InfoWindow>
                  </Map>  
            </div>
          </div>
        </div>
      </div>






      <div className='home__hero-section'>
          <div className='home_container'>
            <div
              className='home_row home__hero-row'
              style={{
                display: 'flex',
                flexDirection: 'home_row'
              }}
            >
              <div className='home_col'>
                <div className='home__hero-text-wrapper'>
                  <div className='top-line'>PROFESSIONAL EQUIPMENT</div>
                  <h1 className='heading dark'>
                    We have both professional and amateur type tables
                  </h1>
                  <p
                    className={
                        'home__hero-subtitle dark'
                    }
                  >
                    Cornilleau, Donic, Enero, Buffalo, Bat, Giant, Sponeta, Kettler. Do YOU want to try them all?
                  </p>
                  <Link to='/Registration'>
                    <HomeButton buttonSize='home_btn--wide' buttonColor='red'>
                      Get Started
                    </HomeButton>
                  </Link>
                </div>
              </div>
              <div className='home_col'>
                <div className='home__hero-img-wrapper'>
                  <img src={stolik} alt='stolik' className='home__hero-img' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
  

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCu_668Q5Ho4qG0zc1NlpWvSYLs3D5t0qE'
})(HeroSection); 