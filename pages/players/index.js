import PlayerItem from "@/components/playerItem";
import { useEffect, useState } from "react";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [playerName, setPlayerName] = useState("");
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    const getPlayers = async () => {
      try {
        setError("");
        setIsLoading(true);

        const res = await fetch("/api/players");
        if (!res.ok) throw new Error("Failed to fatch");

        const data = await res.json();
        setPlayers(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getPlayers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //creating a player new object
    const playerObj = {
      id: Date.now(),
      name: playerName,
      country: countryName,
    };

    //sending post request
    const res = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });
    const data = await res.json();

    //check if res.ok is false
    if (!res.ok) {
      console.log("Faild to set data");
    }
    //check if res.ok is true
    if (res.ok) {
      console.log("Success", data);
    }

    //update new data to the players state
    setPlayers([...players, data]);
  };

  //delete data
  const handleDelete = async (id) => {
    const res = await fetch(`/api/players/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data.message);

    //update players state without this id
    setPlayers(players.filter((player) => player.id !== +id));
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Add a new player</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter a country name"
          value={countryName}
          onChange={(e) => setCountryName(e.target.value)}
        />
        <button type="submit">add player</button>
      </form>

      <h2>players</h2>
      {players?.map((player) => (
        <PlayerItem
          key={player.id}
          player={player}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Players;
