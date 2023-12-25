import './containers.css' 
import React from 'react'

export function Center(props) {
    return <div className={`center ${props.className}`}>
        {props.children}
    </div>
}

 

export function Row(props) {
    return <div {...props} className="row">
        {props.children}
    </div>
}

export function RowEvenly(props) {
    return <div className="row-evenly">
        {props.children}
    </div>
}

export function RowNoJustify(props) {
    return <div className="row-no-justify">
        {props.children}
    </div>
}

function Container(props, ref) {
    return <div className='container' ref={ref}>{props.children}</div>;
  }
  
  export default React.forwardRef(Container);