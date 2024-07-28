import { styled } from "@mui/system";
import { Box, Card, CardContent } from "@mui/material";
import { pink } from "@mui/material/colors";

export const StyledCard = styled(Card)({
  // TODO
  backgroundColor: "#2F403D",
  margin: "20px",
  display: "inline-grid",
  justifyItems: "right",
  paddingTop: "10px",
  width: "300px",
  height: "auto",
});

export const StyledCardContent = styled(CardContent)({
  // TODO
  backgroundColor: pink[200],
  display: "flex",
  flexDirection: "column",
  width: "80%",
  borderTopLeftRadius: "50%",
  textAlign: "right",
  overflow: "hidden",
});

export const StyledImage = styled(Box)({
  paddingBottom: "10px",
});
