import { Fragment, useCallback, useRef, useState } from "react";
import "./Typeahead.css";
const Typehead = (props) => {

    const [filtered, setFiltered] = useState();
    const inputRef = useRef(null);

    const [lists, setList] = useState([]);

    const fetchData = async() => {
      let url = 'https://jsonplaceholder.typicode.com/users';
      let fetchResult = await fetch(url);
      if(!fetchResult.ok){
        throw new Error("Data cant be read")
      }
      else{
        let result = await fetchResult.json();
        return result;
      }
  
    }
  
    // useEffect(()=> {
  
    //     fetchData().then((res)=> {
    //       let list = res.map((datum)=> datum.name);
    //       setList(list);
    //     })
    //     .catch((err)=> console.error(err))
    // }, [])

    const debounce = (func) => {
        let timer;
        return function(...args){
            let context = this;
            if(timer ) clearTimeout(timer);
            timer = setTimeout(()=>{
                timer = null;
                func.apply(context,args);
            }, 500)
        }
    }

    const handleChange = (value) => {
        let list;
        const val = inputRef.current && inputRef.current.value;
        fetchData().then((res)=> {
            debugger
             list = res.map((datum)=> datum.name);
             const filteredSuggesgtion = list.filter((suggestion)=> suggestion.toLowerCase().indexOf(val.toLowerCase())> -1);
             setFiltered(filteredSuggesgtion);
            setList(list);
          })
          .catch((err)=> console.error(err))

    }

    const optimisedCb = useCallback(debounce(handleChange), [])

    return (
        <Fragment>
            <div className="container">
                <input className="inputel" type="text" onChange={(e)=> optimisedCb({event:e, suggestion:props.suggestions})} ref={inputRef}></input>
                <ul className="list">{
                    filtered && filtered.map((singleItem)=> {
                        return <li>{singleItem}</li>
                    })
                }</ul>
            </div>
        </Fragment>
    )
}
export default Typehead;