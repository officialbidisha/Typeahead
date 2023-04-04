import { Fragment, useCallback, useState } from "react";
const debounceFn = (fn, delay) => {
  let timer;
  return function () {
    let args = arguments;
    let ctx = this;
    console.log('Arguments', arguments)//
    clearTimeout(timer); // intitially every time the function is called, we clear timer and reset it
    timer = setTimeout(() => {
      fn.apply(ctx, args);
    }, delay);
  };
};

const Input = (props) => {
  const { url } = props;
  const [list, setList] = useState([]);
  const fetchMethod = async (event) => {
    debugger;
    let val = event.target.value.toLowerCase();
    try {
      let result = await fetch(url);
      let finalResult = await result.json();
      let temp = [];
      finalResult.forEach((element) => {
        if (element.name.toLowerCase().includes(val)) temp.push(element.name);
      });
      if (!list.includes(temp)) {
        setList(temp);
      }
    } catch (error) {
      console.error("----Error----", error);
    }
  };

  /**
   * We are simply memoising the function , that is, it will store the function in an object and will
   * use the same object, again and again , unless the depenedencies change.
   */
  const callBackFn = useCallback(debounceFn(fetchMethod, 1000), []);

  return (
    <Fragment>
      <input
        onChange={(e) => {
          callBackFn(e);
        }}
      ></input>
      <ul>
        {list.map((listItem) => {
          return <li>{listItem}</li>;
        })}
      </ul>
    </Fragment>
  );
};
export default Input;
