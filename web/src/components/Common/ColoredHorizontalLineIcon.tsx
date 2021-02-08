import React, { SVGProps } from 'react'

export interface ColoredLineProps extends SVGProps<SVGLineElement> {
  width: number
  height: number
  stroke: string
  strokeWidth?: number
  strokeDasharray?: string
  className?: string
}

export function ColoredHorizontalLineIcon({
  width,
  height,
  stroke,
  strokeWidth = 1,
  strokeDasharray,
  className,
  ...restProps
}: ColoredLineProps) {
  return (
    <span className={className}>
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        <line
          x1={0}
          x2={width}
          y1={height / 2}
          y2={height / 2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          {...restProps}
        />
      </svg>
    </span>
  )
}
