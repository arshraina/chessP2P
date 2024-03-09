import { Button } from "@/components/ui/button";

export default function Dash() {
  return (
    <div className="w-screen h-screen p-10">
      <Button ref={(onclick = () => console.log("Clicked"))}>
        create or join match
      </Button>
    </div>
  );
}
