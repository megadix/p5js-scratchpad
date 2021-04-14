import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import p5 from 'p5';

function Sketch({title, sketch, children}) {
  const myRef = useRef(React.createRef());

  useEffect(() => {
    new p5(sketch, myRef.current);
  }, [sketch]);

  return (
    <div>
      <h3>{title}</h3>
      {children}
      <div ref={myRef} />
    </div>
  );
}

Sketch.propTypes = {
  title: PropTypes.string.isRequired,
  sketch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Sketch;
