import React, { useEffect } from 'react';

export default function ErrorMessage(props) {
  useEffect(() => {
    console.log(props);
  });

  let message = '';
  if (JSON.stringify(props.errors) !== {}) {
    // message = props.errors.products[0]
    console.log(props.errors);
  }

  return (
    <div>
      <button type="button" onClick={() => console.log(props)}>
        props
      </button>
    </div>
  );
}
