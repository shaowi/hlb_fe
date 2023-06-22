import React from 'react';
import { Tooltip } from '@mui/material';

export default function ToolTipWrapper({ children, ...props }) {
  // Wrap TextField to forward the ref as expected by Tooltip
  const WrappedChildren = React.forwardRef(function WrappedChildren(
    props,
    ref
  ) {
    //  Spread the props to the underlying DOM element.
    return (
      <div {...props} ref={ref}>
        {children}
      </div>
    );
  });
  return (
    <Tooltip {...props}>
      <WrappedChildren />
    </Tooltip>
  );
}
