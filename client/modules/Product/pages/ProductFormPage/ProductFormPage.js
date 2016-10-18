/**
 * Created by ankain on 01.10.16.
 */

import React, {Component} from 'react'

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { addProductRequest } from '../../ProductActions';
import {ProductColorInput} from '../../components/ProductColorInput/ProductColorInput';

import styles from '../../ProductFormPage.css'

const productSizes  = ['XS','S','M','L','XL'];
const productGroups = ['Male','Female','Children'];

class ProductFormPage extends Component {
  constructor(props){
    super(props);
    this.state = {size: productSizes[0], colors: {color_0: {name: '', photos: ''}}, group: productGroups[0]};
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  addProduct = ()=> {
    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[size]', this.state.size);
    form.append('product[group]', this.state.group);
    form.append('product[description]', this.state.description);

    Object.keys(this.state.colors).forEach((key) => {
      form.append('product[colors][' + key + '][name]', this.state.colors[key].name);
      for (let i = 0, file; file =  this.state.colors[key].photos[i]; i++) {
        form.append('product[colors][' + key + '][photos]', file, file.name);
      }
    });

    this.props.dispatch(addProductRequest(form))
  };

  render(){
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>
          <input placeholder={this.props.intl.messages.productName} value={this.state.name} onChange={this.onChange}
                 className={styles['form-field']} name="name"/>
          <input placeholder={this.props.intl.messages.productCode} value={this.state.code} onChange={this.onChange}
                 className={styles['form-field']} name="code"/>
          <select value={this.state.group} onChange={this.onChange} className={styles['form-field']} name="group">
            <option disabled>{this.props.intl.messages.productGroup}</option>
            {productGroups.map(s => <option value={s} key={s}>{s}</option>)}
          </select>
          <input placeholder={this.props.intl.messages.productPrice} value={this.state.price} onChange={this.onChange}
                 className={styles['form-field']} name="price"
                 type="number"/>
          <select value={this.state.size} onChange={this.onChange} className={styles['form-field']} name="size">
            <option disabled>{this.props.intl.messages.productSize}</option>
            {productSizes.map(s => <option value={s} key={s}>{s}</option>)}
          </select>
          <ProductColorInput colors={this.state.colors}/>
          <textarea placeholder={this.props.intl.messages.productDescription} value={this.state.description}
                    onChange={this.onChange}
                    className={styles['form-field']}
                    name="description"/>
          <div className={styles.photos}>
            <input ref="photos" type="file" name="photos" onChange={this.onFileLoad} multiple="true"/>
          </div>
          <a className={styles['post-submit-button']} href="#" onClick={this.addProduct}><FormattedMessage id="submit"/></a>
        </div>
      </div>
    )
  }
}

ProductFormPage.propTypes = {
  intl: intlShape.isRequired,
};

function mapStateToProps(store, props) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
