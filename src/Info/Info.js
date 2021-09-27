import { forwardRef, useState } from "react";
import { Dialog, Zoom } from "@material-ui/core";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import MouseIcon from "@material-ui/icons/Mouse";
import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px;
  font-size: 1.2rem;
  color: slategray;
  font-weight: 700;
`;
const Row = styled.div`
  display: flex;
  width: 290px;
  margin: 20px 0px;
`;
const IconContainer = styled.div`
  margin-right: 30px;
`;

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export default function Info() {
  const [open, setOpen] = useState(true);
  const onClose = () => setOpen(false);

  return (
    <Dialog
      onClick={onClose}
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
    >
      <InfoContainer>
        <Row>
          <IconContainer>
            <ZoomInIcon />
          </IconContainer>
          Scroll to zoom in/out
        </Row>
        <Row>
          <IconContainer>
            <MouseIcon />
          </IconContainer>
          Click and drag to explore
        </Row>
      </InfoContainer>
    </Dialog>
  );
}
