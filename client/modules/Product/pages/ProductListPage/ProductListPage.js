/**
 * Created by ankain on 09.10.16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';

import styles from './ProductListPage.css';

// Import Selectors
import { getProducts } from '../../ProductReducer';
import { setSearchQuery } from '../../ProductActions';
import { applyGroupFilter } from '../../ProductActions';

const productGroups = ['Male','Female','Children'];

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '', groupFilter: '' }
  }

  componentDidMount() {
    this.setState({ products: this.props.products });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['filter-panel']}>
          <div>
            <input type="search" value={this.props.searchQuery} placeholder="Type name..."
                   onChange={e => this.props.dispatch(setSearchQuery(e.target.value))}/>
          </div>
          <div>
            <select value={this.props.groupFilter}
                    onChange={e => this.props.dispatch(applyGroupFilter(e.target.value))}
                    name="group">
              <option disabled>Выберите группу</option>
              <option value=''>All</option>
              {productGroups.map(s => <option value={s} key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className={styles.products}>
          {
            this.props.products.map(product=> (
              <div key={product.cuid} className={styles.product}>
                <ProductListItem key={product.cuid} {...product}/>
              </div>
            ))
          }
        </div>

      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    searchQuery: state.products.searchQuery,
    groupFilter: state.products.groupFilter,
    products: getProducts(state, {name: state.products.searchQuery, group: state.products.groupFilter}),
  };
}

export default connect(mapStateToProps)(ProductListPage);
