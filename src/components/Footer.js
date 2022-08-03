import React, { Component } from "react";
import {styled} from "@mui/material";
import Typography from "@mui/material/Typography";

const FooterContainer = styled('div')`
  text-align: center;
  background: #1e2123;
  height: 60px;
  margin-top: calc(5% + 60px);
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 2em;
`;

class Footer extends Component {
  render() {
    return (
        <FooterContainer>
          <Typography variant="title">
            Made with ❤ ️by Wesley Santos
          </Typography>
        </FooterContainer>
    );
  }
}

export default Footer;