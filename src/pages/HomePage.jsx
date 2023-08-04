import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrainerG } from "../store/slices/trainerName.slice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const trainer = useSelector((reducer) => reducer.trainer);

  const inputTrainer = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerG(inputTrainer.current.value.trim()));
    navigate("/pokedex");
  };

  return (
    <div className="container__home">
      <img
        className="pokedex__img"
        src="https://i.imgur.com/hDAsR6D.png"
        alt=""
      />
      <h1 className="container__home-title">Hi trainer!</h1>
      <p>To start with the app, give me your name trainer</p>
      <form onSubmit={handleSubmit}>
        <input
          className="inputNameTrainer"
          id="inputTrainer"
          ref={inputTrainer}
          type="text"
        />
        <button>Gotta catch'em all!</button>
      </form>
      <div className="container__home-img1">
        {" "}
        <img src="https://i.imgur.com/8zjD6W9.png" alt="" />
        <img
          className="container__home-img2"
          src="https://i.imgur.com/FI3WYRw.png"
          alt=""
        />
        <img
          className="container__home-img3"
          src="https://i.imgur.com/FOK4yeT.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default HomePage;
