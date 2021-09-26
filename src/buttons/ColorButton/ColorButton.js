import React from "react";
import { Tooltip } from "@material-ui/core";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import { StyledIconButton } from "../ButtonsStyle";

export default function ColorButton({ onClick }) {
  return (
    <Tooltip title="Random colours">
      <StyledIconButton onClick={onClick}>
        <ColorLensIcon fontSize="large" />
      </StyledIconButton>
    </Tooltip>
  );
}
