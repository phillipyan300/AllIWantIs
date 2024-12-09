import React from 'react';
import Snowfall from 'react-snowfall';

function SnowTest() {
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#282c34' }}>
      <Snowfall snowflakeCount={150} />
    </div>
  );
}

export default SnowTest;
