import { useRef, useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp, MdArrowUpward } from 'react-icons/md';

export function CardToggleButton(props) {
  return (
    <button
      title={props.isVisible ? `Hide ${props.cardName}` : `Show ${props.cardName}`}
      className="border-radius-100pct padding-none"
      style={{
        width: "2rem",
        height: "2rem"
      }}
      onClick={props.toggle}
    >
      {
        props.isVisible ?
          <MdArrowDropUp size="1.5rem" />
        :
          <MdArrowDropDown size="1.5rem" />
      }
    </button>
  );
}

export function CardToggleFloatingButton(props) {
  return (
    <button
      title={props.isVisible ? `Hide ${props.cardName}` : `Show ${props.cardName}`}
      className="border-radius-100pct padding-none"
      style={{
        width: "2rem",
        height: "2rem"
      }}
      onClick={props.toggle}
    >
      <MdArrowUpward size="1.5rem" />
    </button>
  );
}

export function Card(props) {
  const windowRef = useRef();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();

    if (!props.isFloating) return;

    const header = document.querySelector('header');
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = (e) => {
      e.preventDefault();
      document.onmousedown = null;
      document.onmouseup = null;
      document.onmousemove = null;
    }

    document.onmousemove = (e) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      const { left, top } = windowRef.current.getBoundingClientRect();
      if ((left - pos1) >= 0) {
        setX(left - pos1);
      }
      if ((top - pos2) - header.getBoundingClientRect().height >= 0) {
        setY(top - pos2);
      }
    }
  }

  return (
    <div
      ref={windowRef}
      id={props.id}
      className={`card width-full ${props.isFloating ? 'position-fixed width-max-480 height-max-640' : ''} ${props.className ? props.className : ''}`}
      style={{
        left: props.isFloating ? `${x}px` : null,
        top: props.isFloating ? `${y}px` : null
      }}
      onDoubleClick={(e) => props.isFloating ? props.toggleFloating(e) : undefined}
      onMouseDown={handleMouseDown}
    >
      {props.children}
    </div>
  );
}

export function CardTitle(props) {
  return (
    <div className={`title width-full ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
}

export function CardBody(props) {
  return (
    <div className={`body width-full ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
}
