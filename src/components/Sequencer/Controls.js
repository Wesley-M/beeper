import {Box, Stack, styled} from "@mui/material";
import {InstrumentSelector} from "../InstrumentSelector";
import {SpeedSelector} from "../SpeedSelector";
import {CustomButton} from "../CustomButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import SharePanelDialog from "../SharePanelDialog";
import React from "react";

const ControlsContainer = styled(Stack)(({theme}) => ({
  width: '100%',
  height: '20vh',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
  },
  position: 'absolute',
  top: 'calc(80vh + 0.25em)',
  backgroundColor: '#282828',
  paddingLeft: '1.5em'
}));

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
    sharePatternWithDialog,
    toggleSequencerStatus
  } = props;

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

      <ControlsContainer>
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
          onClick={() => sharePatternWithDialog(getPatternURL())}
          Icon={ShareIcon}
          text='Share'
        />

        <SharePanelDialog
          songURL={getPatternURL()}
        />
      </ControlsContainer>

      <Stack
        direction={{xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row'}}
        spacing={2}
        sx={{
          width: '95%',
          alignItems: 'center',
          marginTop: '1.5em',
          display: {xs: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none'}
        }}
      >
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
            onClick={() => sharePatternWithDialog(getPatternURL())}
            Icon={ShareIcon}
            text='Share'
          />

          <SharePanelDialog
            songURL={getPatternURL()}
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
      </Stack>
    </>
  )
}