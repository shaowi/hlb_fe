import React from 'react';
import { ButtonGroup } from '@mui/material';
import ToolTipWrapper from './../forms_ui/ToolTipWrapper';
import ActionButton from './ActionButton';

export default function ActionButtonGroup(props) {
  const { buttons } = props;
  return (
    <ButtonGroup variant="text" size="small">
      {buttons.map(({ toolTipText, componentProps, icon }, index) => (
        <ToolTipWrapper key={index + toolTipText} title={toolTipText}>
          <ActionButton {...componentProps}>{icon}</ActionButton>
        </ToolTipWrapper>
      ))}
    </ButtonGroup>
  );
}
