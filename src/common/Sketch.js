import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import p5 from 'p5';

function Sketch({sketch}) {
  const myRef = useRef(React.createRef());

  useEffect(() => {
    new p5(sketch, myRef.current);
  }, [sketch]);

  return (
    <div ref={myRef}/>
  );
}

Sketch.propTypes = {
  sketch: PropTypes.func.isRequired
};

export default Sketch;
