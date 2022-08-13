import React from "react";

const Button = ({bgColor, textColor, text, onClick, padding, bottom, right}) => {
    return (
        <div>
            <button className = 'buttons'
            style = {{background: bgColor, color:textColor, padding:padding, right:right, bottom:bottom}}
            onClick = {onClick}>{text}</button>
        </div>
    )
}

export default Button