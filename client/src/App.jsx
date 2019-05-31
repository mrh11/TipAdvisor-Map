import React from 'react';
import Axios from 'axios';
import ReactDOM from 'react-dom';
import MyFancyComponent from './components/MapHOC.jsx'

class App extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    Address: '',
    City: '',
    Country: '',
    Lat: 0,
    Long: 0,
    id: 1,
    clickState: true
  }
  this.updateClickState = this.updateClickState.bind(this);
  this.getLocationData = this.getLocationData.bind(this);
}

updateClickState() {
  this.setState({clickState: !this.state.clickState})
}

getLocationData() {
  // Axios.get(`/api/locations/${location.href.slice(34, -1)}`)
  Axios.get('/api/locations/55')
  .then(({data})=>{

    let name = data[0].hotel;
    let street = data[0].Address;
    let city = data[0].City;
    let country = data[0].Country;
    let lat = Number(data[0].Lat);
    let long = Number(data[0].Long);
    let id = Number(data[0].id);

    this.setState(
      {Name: name,
       Address: street,
       City: city,
       Country: country,
       Lat: lat,
       Long: long,
       id: id
      }
    )
  })
  .catch((err)=>{console.log(err)});
}

componentDidMount() {
  this.getLocationData();
}

render() {
  return (
    <div className="R_sort-container">
        <h1 className="Location" >Location: {this.state.Name}</h1>
          <figure >
            {(this.state.clickState) 
                ? <div>
                  <div 
                    // onMouseOver={()=>{console.log('hovering')}}
                    onClick={()=>{this.updateClickState()}}
                    className="R_container">
                    <img 
                      src={`https://s3.amazonaws.com/fec-map/${this.state.id}.png`} 
                      alt="No Image Found"
                      className="R_image"
                    />
                    <div className="R_overlay">
                      <a href="http://chittagongit.com/images/full-screen-icon-png/full-screen-icon-png-17.jpg" className="R_icon" title="User Profile"></a>
                    </div>
                  </div>
                   <div className="R_wrapper">
                   <div className="R_overview">
                    <img src="https://fec-map.s3.amazonaws.com/overview.png" alt=""/>
                   </div>
                   <div className="R_info">
                    <ul>
                      <h3>{this.state.Name}</h3>
                    </ul>
                    <ul>{this.state.Address}</ul>
                    <ul>{this.state.City + ', ' + this.state.Country}</ul>
                   </div>
                   <div className="R_airport">airport</div>
                   <div className="R_stores">stores</div>
                   <div className="R_attractions">attractions</div>
                   </div>
                  </div>
                : <div>
                    <div className="R_container">
                    <button style={{right: '100px'}} onClick={(e)=>{ e.preventDefault(); this.setState({clickState: !this.state.clickState})}}>X</button>
                      <MyFancyComponent location={{lat: this.state.Lat, lng: this.state.Long}}/>
                    </div>
                  </div>
              }
          </figure>
    </div>
)}}
ReactDOM.render(<App />, document.getElementById('app'));