import { IconButton } from '@mui/material';

/**
 * The `ActionButton` component is a React component that renders an `IconButton` with a specified color and children.
 * @returns an IconButton component with the specified color and size props, and the children as its content.
 */
export default function ActionButton(props) {
  const { color = 'success', children } = props;
  return (
    <IconButton color={color} size="large" {...props}>
      {children}
    </IconButton>
  );
}
