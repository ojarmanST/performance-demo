import React from "react";
import { memo } from "react";

export default memo(function MyButton(props) {
  /**MyButton re-renders whenever fib is updated as well
   * Entire components can be memoized to improve performance as well using React.memo
   * "If props don't change, the previous version of the component will remain"
   */
  console.log("Rendering MyButton");
  return <button {...props} style={{ color: "red" }} />;
});
