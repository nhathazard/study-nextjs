import MainSilder from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

export default async function HomePage() {
  const roc = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8080/api/v1/track/top",
    method: "POST",
    body: {
      category: "Roc",
      limit: 10,
    },
  });

  const chill = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8080/api/v1/track/top",
    method: "POST",
    body: {
      category: "Chill",
      limit: 10,
    },
  });

  const rap = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8080/api/v1/track/top",
    method: "POST",
    body: {
      category: "Rap",
      limit: 10,
    },
  });

  return (
    <Container>
      <MainSilder title="Top Chill" data={chill?.data ?? []} />
    </Container>
  );
}
