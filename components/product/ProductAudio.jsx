import React from "react";
import {
  BsMusicNoteBeamed,
  BsFillPlayFill,
  BsFillPauseFill,
  BsVolumeUpFill,
} from "react-icons/bs";

import useAudioPlayer from "@hooks/useAudioPlayer";

const ProductAudio = ({ audio }) => {
  const { curTime, duration, playing, setPlaying, setClickedTime } =
    useAudioPlayer(audio);

  const curPercentage = (curTime / duration) * 100 || 0;

  return (
    <div className="audio_player my-4 d-flex align-items-center gap-2">
      <audio id="audio">
        <source src={audio} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <span>{`écouter l'extrait :`}</span>
      <i className="audio_player-music">
        {" "}
        <BsMusicNoteBeamed size={18} />
      </i>
      <i>
        <BsFillPlayFill
          className="cursor-pointer"
          size={18}
          onClick={() => setPlaying(true)}
        />
      </i>
      <i>
        <BsFillPauseFill
          className="cursor-pointer"
          size={18}
          onClick={() => setPlaying(false)}
        />
      </i>
      <div className="audio_player-progress">
        <div
          className="percent-progress"
          style={{ width: `${curPercentage}%` }}
        ></div>
      </div>
      <i>
        <BsVolumeUpFill size={18} />
      </i>
    </div>
  );
};

export default ProductAudio;
