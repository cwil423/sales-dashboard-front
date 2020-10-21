import React from 'react';

export default function Total(props) {
  const { items } = props;

  let total = 0;

  items.forEach((item) => {
    total += item.price * item.quantity;
  });

  return (
    <div>
      <h3>Total: ${parseFloat(total).toFixed(2)}</h3>
    </div>
  );
}
