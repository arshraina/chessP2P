import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { getUserDetails } from "@/store/userslice";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Dash() {
  const [isSuccessful, isErrored, isLoading, isLogged, user, message] =
    useSelector((state) => [
      state.user.isSuccessful,
      state.user.isErrored,
      state.user.isLoading,
      state.user.isLogged,
      state.user.user,
      state.user.message,
    ]);

  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    if (isErrored) {
      toast({ message, type: "error" });
    } else if (isSuccessful) {
      toast({ message, type: "success" });
    }
  }, [isErrored, isSuccessful]);

  return (
    <div className="p-10">
      <Button ref={(onclick = () => console.log("Clicked"))}>
        create or join match
      </Button>
    </div>
  );
}
