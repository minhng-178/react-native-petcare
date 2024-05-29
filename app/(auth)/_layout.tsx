import Loader from "@/components/Loader";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthStack() {
  const { loading, auth } = useAuth();

  if (!loading && auth) {
    return <Redirect href={"/"} />;
  }

  return (
    <>
      <Loader isLoading={loading} />
      <Stack />
    </>
  );
}
