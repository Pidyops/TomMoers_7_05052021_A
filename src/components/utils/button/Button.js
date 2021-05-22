import React from 'react'
import PropTypes from 'prop-types'


const Button = ({ color, text, onClick}) => {
    return (
        <div>
            <button onClick={onClick} className="auth__btn" style={{ backgroundColor: color}} type='submit'>{text}</button>
        </div>
    )
}

Button.defaultProps = {
    color: 'teal'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func

}

export default Button
