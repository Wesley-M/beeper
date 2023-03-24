import {Box, Stack, styled} from "@mui/material";
import {InstrumentSelector} from "./InstrumentSelector";
import {SpeedSelector} from "./SpeedSelector";
import {CustomButton} from "../ui/CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import PublishToSongBoard from "../dialogs/usePublishToSongBoard";
import React from "react";
import {shareSongPattern} from "../dialogs/shareSongPattern";
import CheckIcon from "@mui/icons-material/Check";
import usePublishToSongBoard from "../dialogs/usePublishToSongBoard";
import {DesktopControlsContainer, MobileControlsContainer} from "./Controls.styles";

export const Controls = (props) => {
  const {
    userDefaultSpeed,
    setSpeed,
    cleanPattern,
    getPatternURL,
    incrementWidth,
    decrementWidth,
    synth,
    playState,
    handleInstrumentChange,
    toggleSequencerStatus
  } = props;

  const { promptToPublish } = usePublishToSongBoard(getPatternURL());

  return (
    <>
      <Box style={{display: "flex", flexDirection: "column", position: 'absolute', top: '35%', right: 50}}>
        <button className="circle-btn" onClick={() => incrementWidth()}>
          <span className="material-icons sequencer-width-opt">add_circle</span>
        </button>

        <button className="circle-btn" onClick={() => decrementWidth()}>
          <span className="material-icons sequencer-width-opt">
            remove_circle
          </span>
        </button>
      </Box>

      <DesktopControlsContainer>
        <button
          className="btn start-btn"
          style={{
            backgroundColor: playState === "started" ? "#f0264bCC" : "#11A4E2",
          }}
          onClick={() => toggleSequencerStatus()}
        >
          {playState === "started" ? (
            <span className="material-icons">stop</span>
          ) : (
            <span className="material-icons">play_arrow</span>
          )}
        </button>

        <InstrumentSelector
          onChange={handleInstrumentChange}
          synth={synth}
        />

        <SpeedSelector
          defSpeed={userDefaultSpeed}
          handleSpeedChange={setSpeed}
        />

        <CustomButton
          onClick={cleanPattern}
          Icon={DeleteIcon}
          text='Clean'
        />

        <CustomButton
          onClick={() => shareSongPattern(getPatternURL())}
          Icon={ShareIcon}
          text='Share'
        />

        <CustomButton
          onClick={promptToPublish}
          Icon={CheckIcon}
          text='Publish'
        />
      </DesktopControlsContainer>

      <MobileControlsContainer>
        <Stack direction="row">
          <button
            className="btn start-btn"
            style={{
              backgroundColor: playState === "started" ? "#f0264bCC" : "#11A4E2",
            }}
            onClick={() => toggleSequencerStatus()}
          >
            {playState === "started" ? (
              <span className="material-icons">stop</span>
            ) : (
              <span className="material-icons">play_arrow</span>
            )}
          </button>

          <CustomButton
            onClick={cleanPattern}
            Icon={DeleteIcon}
            text='Clean'
          />

          <CustomButton
            onClick={() => shareSongPattern(getPatternURL())}
            Icon={ShareIcon}
            text='Share'
          />

          <CustomButton
            onClick={promptToPublish}
            Icon={CheckIcon}
            text='Publish'
          />
        </Stack>

        <Stack
          direction="row"
          sx={{
            alignItems: 'space-around'
          }}
        >
          <InstrumentSelector
            onChange={handleInstrumentChange}
            synth={synth}
          />

          <SpeedSelector
            defSpeed={userDefaultSpeed}
            handleSpeedChange={setSpeed}
          />
        </Stack>
      </MobileControlsContainer>
    </>
  )
}