import React, { Component } from 'react';

import Card from './components/card';
import Properties from './components/properties';
import Features from './components/features';

class App extends Component {

  state = {
    properties: [],
    features: [],

    country: '1',
    adults: '1',
    children: '0',
    page: '1',
    feature: 'amenities',
    propertie: '1'

  }

  componentDidMount() {
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmitSearch = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/v2/properties?country=' + this.state.country + '&adults=' + this.state.adults + '&children=' + this.state.children + '&page=' + this.state.page, { mode: 'cors' })
      .then(res => res.json())
      .then((data) => {
        this.setState({ properties: data.results })
        this.setState({ features: [] })
      })
      .catch(console.log)

  }
  onSubmitShow = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/v2/properties/' + this.state.feature + '/' + this.state.propertie + '?country=' + this.state.country + '&adults=' + this.state.adults + '&children=' + this.state.children + '&page=' + this.state.page, { mode: 'cors' })
      .then(res => res.json())
      .then((data) => {
        this.setState({ properties: [] })
        this.setState({ features: data.results })
      })
      .catch(console.log)

  }

  render() {
    return (
      <div >

        <Card />

        <div class="card">
          <form>
            <p> </p>
            <label>
              Country:
              <input
                name='country'
                value={this.state.country}
                onChange={e => this.handleChange(e)} />
            </label>
            <label>
              Adults:
              <input
                name='adults'
                value={this.state.adults}
                onChange={e => this.handleChange(e)} />
            </label>
            <label>
              Children:
              <input
                name='children'
                value={this.state.children}
                onChange={e => this.handleChange(e)} />
            </label>
            <label>
              Page:
              <input
                name='page'
                value={this.state.page}
                onChange={e => this.handleChange(e)} />
            </label>
            <button onClick={(e) => this.onSubmitSearch(e)}>Search</button>

            <p> </p>
            <label>
              Feature:
              <input
                name='feature'
                value={this.state.feature}
                onChange={e => this.handleChange(e)} />
            </label>
            <label>
              Propertie:
              <input
                name='propertie'
                value={this.state.propertie}
                onChange={e => this.handleChange(e)} />
            </label>
            <button onClick={(e) => this.onSubmitShow(e)}>Show</button>

          </form>
        </div>

        <Properties properties={this.state.properties} />

        <Features features={this.state.features} />

      </div>
    );
  }
}
export default App;
