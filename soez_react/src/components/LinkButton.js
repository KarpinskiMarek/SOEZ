import React, {useState} from "react";

const LinkButton = ({ to, buttonText }) => {
    
    const [isHoverd, setIsHoverd] = useState(false);
    
    return (
        <a style={{
            padding: '10px',
            color: 'black',
            fontWeight: 'bold',
            paddingLeft: '20px',
            paddingRight: '20px',
            border: 'solid black 2px',
            borderRadius: '10px',
            margin: '10px',
            textDecoration: 'none',
            backgroundColor: isHoverd ? "#48cae4": "#0077b6",
            display: 'inline-block'
        }}
        onMouseEnter={() => setIsHoverd(true)} onMouseLeave={() => setIsHoverd(false)} href={to} >
            {buttonText}
        </a>
    );
};

export default LinkButton;