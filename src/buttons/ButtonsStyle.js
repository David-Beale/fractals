import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIconButton = styled(IconButton)`
  box-shadow: ${(props) =>
    props.enabled
      ? "inset -4px -4px 8px rgba(255, 255, 255, 0.6), inset 8px 8px 16px rgba(0, 0, 0, 0.2)"
      : "-6px -6px 10px rgba(255, 255, 255, 0.3), 6px 6px 10px rgba(0, 0, 0, 0.3)"};
  color: black !important;
  background-color: white !important;
  margin: 5px 15px !important;
`;
