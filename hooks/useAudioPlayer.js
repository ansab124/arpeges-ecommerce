import { useState, useEffect } from "react";

function useAudioPlayer(audio) {



  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  // const [clickedTime, setClickedTime] = useState();
  const [audioPlayer, setAudioPlayer] = useState(null)
  useEffect(() => {

    if (audio) {
      let audioPlayer = new Audio(audio);
      setAudioPlayer(audioPlayer)
      audioPlayer.onloadedmetadata = (e) => {
        setDuration(e.target.duration || 0)
        setCurTime(e.target.currentTime || 0)
      }

      audioPlayer.ontimeupdate = (e) => {
        setCurTime(e.target.currentTime)
      }

    }
  }, [audio])
  if (playing) {
    audioPlayer?.play()
  }
  else {
    audioPlayer?.pause()
  }

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    // setClickedTime
  }
}

export default useAudioPlayer;