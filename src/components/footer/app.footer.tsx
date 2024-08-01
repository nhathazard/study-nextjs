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
            // src="http://localhost:8080/images/default/DomDom8DAudio-JackG5R-6897160-1722441694404.mp3"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/default/DomDom8DAudio-JackG5R-6897160-1722441694404.mp3`}
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
