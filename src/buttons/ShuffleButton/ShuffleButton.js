import React from "react";
import { Tooltip } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { StyledIconButton } from "../ButtonsStyle";

export default function ShuffleButton({ onClick }) {
  return (
    <Tooltip title="Random fractal">
      <StyledIconButton onClick={onClick}>
        <AutorenewIcon fontSize="large" />
      </StyledIconButton>
    </Tooltip>
  );
}
