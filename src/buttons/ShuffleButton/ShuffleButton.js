import React from "react";
import styled from "styled-components";
import { Tooltip, IconButton } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";

export const Container = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;
export const StyledIconButton = styled(IconButton)`
  box-shadow: ${(props) =>
    props.enabled
      ? "inset -4px -4px 8px rgba(255, 255, 255, 0.6), inset 8px 8px 16px rgba(0, 0, 0, 0.2)"
      : "-6px -6px 10px rgba(255, 255, 255, 0.7), 6px 6px 10px rgba(0, 0, 0, 0.3)"};
  color: black !important;
  background-color: white !important;
`;

export default function ShuffleButton({ onClick }) {
  return (
    <Container>
      <Tooltip title="Random fractal">
        <StyledIconButton onClick={onClick}>
          <AutorenewIcon fontSize="large" />
        </StyledIconButton>
      </Tooltip>
    </Container>
  );
}
