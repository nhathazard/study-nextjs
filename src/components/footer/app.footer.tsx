"use client";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
export default function AppFooter() {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;
  return (
    <div>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0, background: "#ffffff" }}
      >
        <Container sx={{ display: "flex", gap: 10 }}>
          <AudioPlayer
            src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            volume={0.5}
            style={{ boxShadow: "unset" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 100,
            }}
          >
            <div
              style={{
                color: "black",
              }}
            >
              Hazard
            </div>
            <div style={{ color: "black" }}>Who am I ?</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
}
