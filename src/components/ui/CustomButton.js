import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";

export const CustomButton = ({ onClick, Icon, text }) => {
  return (
      <Button
          variant="contained"
          onClick={onClick}
          size="large"
          disableElevation
          sx={{
            marginTop: 0,
            textTransform: 'capitalize',
            backgroundColor: 'transparent',
            "&:hover": {
              backgroundColor: '#FFFFFF22'
            }
          }}
      >
        <Stack>
          <Box>
            <Icon/>
          </Box>
          <Box>
            {text}
          </Box>
        </Stack>
      </Button>
  );
}
