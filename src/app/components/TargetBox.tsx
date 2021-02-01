import React from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { useDrop, DropTargetMonitor } from 'react-dnd'

// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference

const style: React.CSSProperties = {
  border: '2px dotted gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
  position: 'relative',
  left: '120px',
  right: '120px',
}

export interface TargetBoxProps {
  onDrop: (props: TargetBoxProps, monitor: DropTargetMonitor) => void
}

export const TargetBox: React.FC<TargetBoxProps> = (props) => {
  const { onDrop } = props
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      if (onDrop) {
        onDrop(props, monitor)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = canDrop && isOver
  return (
    <div ref={drop} style={style}>
      {isActive ? 'Release to drop' : 'Drag file here'}
    </div>
  )
}
