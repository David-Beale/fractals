import ShuffleButton from "./ShuffleButton/ShuffleButton";

export default function Buttons({ onRandomFractal }) {
  return (
    <>
      <ShuffleButton onClick={onRandomFractal} />
    </>
  );
}
