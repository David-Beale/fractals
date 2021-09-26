import { Container } from "./ButtonsStyle";
import ShuffleButton from "./ShuffleButton/ShuffleButton";
import ColorButton from "./ColorButton/ColorButton";

export default function Buttons({ onRandomFractal, onRandomColor }) {
  return (
    <Container>
      <ShuffleButton onClick={onRandomFractal} />
      <ColorButton onClick={onRandomColor} />
    </Container>
  );
}
