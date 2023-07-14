import React from 'react';
import { Tooltip } from '@mui/material';

/**
 * The ToolTipWrapper component is a wrapper that adds tooltip functionality to its children components.
 * @returns a component that wraps the children with a Tooltip component. The Tooltip component is passed the props
 * provided to the ToolTipWrapper component. The children are wrapped with a WrappedChildren component, which is a
 * forwardRef component that spreads the props to a div element and forwards the ref.
 */
export default function ToolTipWrapper(props) {
  const { children } = props;
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
