'use client'; 

import { useState } from 'react';

export default function ReadingForm() {
  const [powerOutput, setPowerOutput] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // call your POST /plants/reading API here with the input
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="number" 
        value={powerOutput} 
        onChange={e => setPowerOutput(e.target.value)} 
        placeholder="Power output"
      />
      <button type="submit">Submit Reading</button>
    </form>
  );
}
