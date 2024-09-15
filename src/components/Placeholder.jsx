import { GiSpellBook } from "react-icons/gi";

const Placeholder = ({ className }) => {
  return (
    <div
      className={className}
      style={{
        aspectRatio: "2 / 3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
      }}
    >
      <GiSpellBook style={{ width: "40%", height: "40%" }} color="#666" />
    </div>
  );
};

export default Placeholder;
