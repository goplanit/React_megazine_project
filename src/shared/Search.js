import React from "react";
import _ from "lodash"; // lodash 부르기

const Search = () => {
  const debounce = _.debounce(
    (value) => console.log("디바운스!:", value),
    1000
  );
  // const keyPress = React.useCallback(debounce, []);

  const throttle = _.throttle((value) => console.log("쓰로틀!:", value), 1000);
  const keyPress = React.useCallback(throttle, []);

  const onChange = (e) => {
    keyPress(e.target.value);
  };

  return (
    <div>
      <label>Search:</label>
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default Search;
