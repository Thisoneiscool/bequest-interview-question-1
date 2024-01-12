import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const API_URL = 'http://localhost:8080';

function App() {
  const [data, setData] = useState<string>();
  const [originalHash, setOriginalHash] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(API_URL);
    const { data, hash } = await response.json();
    setData(data);
    setOriginalHash(hash);
  };

  const updateData = async () => {
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    await getData();
  };

  const verifyData = async () => {
    const currentHash = CryptoJS.SHA256(data).toString();
    if (currentHash === originalHash) {
      alert('Data is verified and has not been tampered with.');
    } else {
      alert('Data verification failed: Data has been tampered with!');
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        position: 'absolute',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
        fontSize: '30px',
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: '30px' }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{ fontSize: '20px' }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: '20px' }} onClick={verifyData}>
          Verify Data
        </button>
      </div>
    </div>
  );
}

export default App;
