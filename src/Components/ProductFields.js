import React from 'react';
import ProductField from './ProductField';

export default function ProductFields(props) {
  return (
    <div>
      {props.numberOfItems.map((item) => (
        <ProductField id={item.id} {...props} />
      ))}
    </div>
  );
}
