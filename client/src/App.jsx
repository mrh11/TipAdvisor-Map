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
  Axios.get('/api/location?id=49')
  .then(({data})=>{
    this.setState(
      {Name: data[0].hotel,
       Address: data[0].Address,
       City: data[0].City,
       Country: data[0].Country,
       Lat: Number(data[0].Lat),
       Long: Number(data[0].Long),
       id: Number(data[0].id)
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
    <div >
        <h1 className="Location" >Location: {this.state.Name}</h1>
          <figure >
            {(this.state.clickState) 
                ? <div>
                  <div 
                    // onMouseOver={()=>{console.log('hovering')}}
                    onClick={()=>{this.updateClickState()}}
                    className="container">
                    <img 
                      src={`https://s3.amazonaws.com/fec-map/${this.state.id}.png`} 
                      alt="No Image Found"
                      className="image"
                    />
                    <div className="overlay">
                      <a href="http://chittagongit.com/images/full-screen-icon-png/full-screen-icon-png-17.jpg" className="icon" title="User Profile"></a>
                    </div>
                  </div>
                   <div className="wrapper">
                   <div className="overview">Overview</div>
                   <div className="info">
                    <ul>
                      <h3>{this.state.Name}</h3>
                    </ul>
                    <ul>{this.state.Address}</ul>
                    <ul>{this.state.City + ', ' + this.state.Address}</ul>
                   </div>
                   <div className="airport">airport</div>
                   <div className="stores">stores</div>
                   <div className="attractions">attractions</div>
                   </div>
                  </div>
                : <div>
                    <div className="container">
                    <button style={{right: '100px'}} onClick={(e)=>{ e.preventDefault(); this.setState({clickState: !this.state.clickState})}}>X</button>
                      <MyFancyComponent location={{lat: this.state.Lat, lng: this.state.Long}}/>
                    </div>
                  </div>
              }
          </figure>
    </div>
)}}
ReactDOM.render(<App />, document.getElementById('app'));