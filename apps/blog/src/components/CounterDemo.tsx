import React, { useState } from "react";

export function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br/><br/>
    </div>
  );
}