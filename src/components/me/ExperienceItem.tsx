import { Box, Typography } from "@mui/material";

export interface ExperienceItemProps {
  side: "left" | "right";
  title: string;
  description: string;
  date: string;
  company?: string;
}

export function ExperienceItem({
  side,
  title,
  description,
  date,
  company,
}: ExperienceItemProps) {
  const isLeft = side === "left";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: 192, // h-48
      }}
    >
      {/* LEFT */}
      <Box sx={{ width: "33.333%" }}>
        {isLeft && (
          <>
            <Box
              sx={{
                bgcolor: "white",
                p: 1.5,
                fontWeight: 600,
                borderBottomLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              {title}
            </Box>

            <Typography
              sx={{
                p: 1.5,
                fontSize: "0.875rem",
                fontStyle: "italic",
              }}
            >
              {description}
            </Typography>

            <Typography
              sx={{
                p: 1.5,
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "rgb(248 113 113)", // red-400
              }}
            >
              {date}
            </Typography>

            {company && (
              <Box
                sx={{
                  p: 0.5,
                  borderRadius: 1,
                  bgcolor: "white",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  width: "fit-content",
                }}
              >
                {company}
              </Box>
            )}
          </>
        )}
      </Box>

      {/* CENTER */}
      <Box
        sx={{
          width: "16.666%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 4,
            height: "100%",
            bgcolor: "rgb(75 85 99)", // gray-600
            borderRadius: 999,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 20,
              height: 20,
              borderRadius: "50%",
              bgcolor: "white",
              left: -8,
              top: 0,
              ring: 4,
              boxShadow: "0 0 0 4px rgb(248 113 113)", // ring-red-400
            }}
          />
        </Box>
      </Box>

      {/* RIGHT */}
      <Box sx={{ width: "33.333%" }}>
        {!isLeft && (
          <>
            <Box
              sx={{
                bgcolor: "white",
                p: 1.5,
                fontWeight: 600,
                borderBottomLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              {title}
            </Box>

            <Typography
              sx={{
                p: 1.5,
                fontSize: "0.875rem",
                fontStyle: "italic",
              }}
            >
              {description}
            </Typography>

            <Typography
              sx={{
                p: 1.5,
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "rgb(248 113 113)",
              }}
            >
              {date}
            </Typography>

            {company && (
              <Box
                sx={{
                  p: 0.5,
                  borderRadius: 1,
                  bgcolor: "white",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  width: "fit-content",
                }}
              >
                {company}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
