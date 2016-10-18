/**
 * Created by ankain on 02.10.16.
 */


import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';


export class ProductColorInput extends Component {
  constructor(props) {
    super(props);
    this.state = { colors: props.colors };
  }

  appendInput() {
    var newInput = `color_${ Object.keys(this.state.colors).length }`;
    this.state.colors[newInput] = '';
    this.setState({ colors: this.state.colors });
  }

  onChangeColor = (e) => {
    this.state.colors[e.target.name].name = e.target.value;
    this.setState({ colors: this.state.colors });
  };

  onFileLoad = (e) => {
    this.state.colors[e.target.dataset.originalName].photos = this.refs.photos.files;
    this.setState({ colors: this.state.colors });
    console.log(this.state.colors);
  };

  render() {
    return(
      <div>
        <div id="dynColors">
          {
            Object.keys(this.state.colors).map((value, index) => {
              return(
                <div>
                  <input type="text" name={value} key={value} value={this.state.colors[value].name} onChange={this.onChangeColor}/>
                  <input ref="photos" type="file" data-original-name={value} onChange={this.onFileLoad} multiple="true"/>
                </div>
              );
            })
          }
        </div>
        <button onClick={ () => this.appendInput() }>
          Add new color
        </button>
      </div>
    );
  }
}

