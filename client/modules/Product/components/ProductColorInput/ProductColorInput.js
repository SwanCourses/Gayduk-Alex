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

  onChange = (e) => {
    this.state.colors[e.target.name] = e.target.value;
    this.setState({ colors: this.state.colors });
  };

  render() {
    return(
      <div>
        <div id="dynColors">
          {
            Object.keys(this.state.colors).map((value, index) => {
              return <input type="text" name={value} key={value} value={this.state.colors[value]} onChange={this.onChange}/>;
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

