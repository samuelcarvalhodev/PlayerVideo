'use client'
import React, { useState, useRef, useEffect } from 'react'
import styles from './page.module.css'
const videoURL = "http://localhost:3000/video-exemplo.mp4"

function usePlayerState($videoPlayer: any) {
  const [playerState, setPlayerState] = useState({
    playing: false,
    percentage: 0,
    playbackRate: 1
  })

  useEffect(() => {
    playerState.playing ? $videoPlayer.current?.play() : $videoPlayer.current?.pause();

  }, [$videoPlayer, playerState.playing])

  function toogleVideoPlay() {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing
    })

  }

  function handleTimeUpdate() {
    const currentPercentage = ($videoPlayer.current.currentTime / $videoPlayer.current.duration) * 100
    setPlayerState({
      ...playerState,
      percentage: currentPercentage
    })
  }

  function handleChangeVideoPercentage(event: any) {
    const currentPercentageValue = event.target.value;
    $videoPlayer.current.currentTime = $videoPlayer.current.duration / 100 * currentPercentageValue
    setPlayerState({
      ...playerState,
      percentage: currentPercentageValue
    })
  }

  function handlePlaybackRate(event: any) {
    const playbackRate = event.target.value
    setPlayerState({
      ...playerState,
      playbackRate: playbackRate
    })
    $videoPlayer.current.playbackRate = playbackRate
  }
  return { playerState, handlePlaybackRate, toogleVideoPlay, handleTimeUpdate, handleChangeVideoPercentage }
}


export default function Home() {
  const $videoPlayer = useRef(null)
  const { playerState, handlePlaybackRate, toogleVideoPlay, handleTimeUpdate, handleChangeVideoPercentage } = usePlayerState($videoPlayer);


  return (
    <div className={styles.main}>
      <div className={styles.video}>
        <video
          ref={$videoPlayer}
          className={styles.videoPlayer}
          src={videoURL}
          poster="http://localhost:3000/poster.png"
          onTimeUpdate={handleTimeUpdate}
        />
        <div className={styles.controls}>
          <button
            onClick={toogleVideoPlay}
            className={styles.buttonPlay}
          >
            {playerState.playing ? "Pause" : "Play"}
          </button>
          <input
            className={styles.rangeDuration}
            type="range"
            min='0'
            max='100'
            onChange={handleChangeVideoPercentage}
            value={playerState.percentage}
          />
          <select
            className={styles.speedReprodution}
            id='selectPlaybackRate'
            name='selectPlaybackRate'
            onChange={handlePlaybackRate}
            defaultValue={playerState.playbackRate}
          >
            {[0.25, 0.5, 0.75, 1, 2, 3].map(speed => (
              <option
                key={`speedChange_${speed}`}
                value={speed}
              >
                {speed}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
