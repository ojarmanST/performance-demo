import "./App.css";
import { useState, useMemo, useCallback, lazy, Suspense } from "react";

// import MyButton from "./MyButton";
// MyButton will only run once we use this variable
const MyButton = lazy(() => import("./MyButton"));

/*
//how can we make our renders more efficient?

* initially with every render, we're re-calculating fib
* fib only needs to re-render when num changes
* we can use memoization with some parameters that say when we 
  need to calculate this again (otherwise we'll just use previous value of fib)
* this is a great way to improve code performance when you have complicated
  functions that need to be memoized
*/

export default function App() {
  const [num, setNum] = useState(10);
  const [logValue, setLogValue] = useState("");

  //fibValue is the return value of this useMemo
  //if num changes, call useMemo again, otherwise render with previous value
  const fibValue = useMemo(() => {
    console.log("calculating fibValue");
    return fib(num);
  }, [num]);

  const onClickLog = useCallback(() => {
    console.log(logValue);
  }, [logValue]);

  /* ALTERNATIVE TO USECALLBACK:
   * useMemo memoizes the value whereas 
   * useCallback memoizes the function thats passed in as a prop.

  const onClickLog = useMemo(() => {
    return () => {
      console.log(logValue);
    };
  }, [logValue]);

  */

  return (
    <div className="App">
      <h1>
        Fib {num} is {fibValue}
      </h1>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(parseInt(e.target.value))}
      />
      <input
        type="text"
        value={logValue}
        onChange={(e) => setLogValue(e.target.value)}
      />
      {logValue.length > 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <MyButton onClick={onClickLog}>Log Value</MyButton>
        </Suspense>
      ) : null}
    </div>
  );
}

/* basic implementation of fibonacci sequence */
/*The next number is found by adding up the two numbers before it */
function fib(n) {
  if (n === 2) return 1;
  if (n === 1) return 0;
  return fib(n - 1) + fib(n - 2);
}
