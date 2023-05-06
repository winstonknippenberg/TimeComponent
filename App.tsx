import * as React from 'react';
import './style.css';
import { Time } from './time/Time.tsx';

export default function App() {
  return (
    <div>
      <h1>Hello Ella!</h1>
      <Time format="time-or-date-or-full-by-date" time={Date.now()} />
    </div>
  );
}
