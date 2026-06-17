import { ChatProvider } from "@/components/providers/ChatProvider";
import { BaraholkaSite } from "@/components/site/BaraholkaSite";

export default function HomePage() {
  return (
    <ChatProvider>
      <BaraholkaSite />
    </ChatProvider>
  );
}
