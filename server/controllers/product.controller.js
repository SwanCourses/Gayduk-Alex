/**
 * Created by ankain on 01.10.16.
 */

import Product from '../models/product';
import cuid from 'cuid';

import sanitizeHtml from 'sanitize-html';
/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getProducts(req, res) {
  Product.find().sort('name').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ products });
    }
  });
}

export function addProduct(req, res) {
  if (!req.body.product.name ||
      !req.body.product.code ||
      !req.body.product.price ||
      !req.body.product.description ||
      !req.body.product.size ||
      !req.body.product.colors ||
      !req.body.product.group
      )
  {
    res.status(403).end();
  } else {

    const newProduct = new Product(req.body.product);

    // Let's sanitize inputs
    newProduct.code        = sanitizeHtml(newProduct.code);
    newProduct.name        = sanitizeHtml(newProduct.name);
    newProduct.description = sanitizeHtml(newProduct.description);
    newProduct.size        = sanitizeHtml(newProduct.size);
    newProduct.group       = sanitizeHtml(newProduct.group);

    newProduct.cuid = cuid();

    console.log(newProduct.colors);

    Object.keys(newProduct.colors).forEach((key) => {
      for (let i = 0, file; file = req.files[i]; i++) {
        if ( newProduct.colors[key].photos === undefined) {
          newProduct.colors[key].photos = [];
        }
        newProduct.colors[key].photos.push({ fileName: file.filename })
      }
    });

    newProduct.save().then((saved)=> {
      res.json({ product: saved })
    }).catch((err) => {
      res.status(500).send(err);
    });
  }
}
