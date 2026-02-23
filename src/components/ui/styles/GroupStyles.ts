
import { styled } from "@mui/material/styles";

export const GroupHeader = styled("div")(({ theme }) => {
  const apple = theme.palette.apple;
  const omni = theme.palette.omnixys;

  return {
    position: "sticky",
    top: "-8px",
    zIndex: 1,

    padding: "8px 16px",

    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.5,
    textTransform: "uppercase",

    color: omni.primary,

    // backgroundColor:
    //   theme.palette.mode === "dark"
    //     ? omni.backgroundPaper
    //     : omni.backgroundDefault,
    // backdropFilter: "blur(8px)",

    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(28,28,30,0.85)"
        : "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",

    borderBottom: `1px solid ${apple.separator}`,
    transition: "background-color 150ms ease",
  };
});

export const GroupItems = styled("ul")({
  padding: 0,
  margin: 0,
  listStyle: "none",
});