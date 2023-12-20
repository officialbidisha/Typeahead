import { Fragment, useEffect, useState, useCallback } from "react";
import "./Input.css";

const debounceFn = (fn, delay) => {
  let timer;
  return function (e) {
    debugger;
    let args = arguments;
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

const Test = (pros) => {
  const [list, setList] = useState([]);

  const getList = async (e) => {
    let value = e?.target?.value?.toLowerCase();
    let result = await fetch("https://restcountries.com/v3.1/all");
    let countries = await result.json();
    setList((prev) => {
      let objArray = [];
      countries.forEach((element) => {
        if (element.name.common.toLowerCase().startsWith(value) || !value) {
          objArray.push({
            name: element.name.common,
            official: element.name.official
          });
        }
      });
      setList(objArray);
    });
  };

  const callBackFn = useCallback(debounceFn(getList, 1000), []);
  useEffect(() => {
    getList();
  }, []);

  return (
    <Fragment>
      <input onChange={(e) => callBackFn(e)}></input>
      <ul className="border">
        {list?.map((ele) => {
          return (
            <li className="list" key={ele.name}>
              {ele.name}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default Test;
