export default function LogIn() {
  return (
    <div className="p-10">
      <Button ref={(onclick = () => console.log("Clicked"))}>Login</Button>
    </div>
  );
}
