import React from 'react';
import PropTypes from 'prop-types';

const CoolButton = ({
  func, name,
}) => (
  <div
    role="button"
    tabIndex="0"
    className="acontainer"
    onClick={() => { func(); }}
    onKeyDown={() => { func(); }}
  >
    <div className="acenter">
      <button type="button" className="abtn">
        <svg width="200px" height="50px" viewBox="0 0 200 50" className="border">
          <polyline points="199,1 199,49 1,49 1,1 199,1" className="bg-line" />
          <polyline points="199,1 199,69 1,49 1,1 199,1" className="hl-line" />
        </svg>
        <span>{name}</span>
      </button>
    </div>
  </div>
);

CoolButton.propTypes = {
  func: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default CoolButton;
