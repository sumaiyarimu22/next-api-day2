const PlayerItem = ({ player }) => {
  return (
    <div>
      <span>{player.id}</span>
      <h3>{player.name}</h3>
      <p>{player.country}</p>
      <br />
    </div>
  );
};

export default PlayerItem;
