"use client";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
const Logo = require("../public/Logo.png");

export default function Home() {
  const goToDashboard = () => {
    redirect("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Image
        src={Logo}
        width={200}
        height={200}
        alt="Poke-Pal-logo"
        className="rounded-lg "
      />
      <Input placeholder="Username" className="mt-6 mb-4 w-4/12" />
      <Input placeholder="Password" type="password" className="m-4 w-4/12" />

      <Button
        variant="outline"
        className="mt-8 mb-1 w-4/12"
        onClick={goToDashboard}
      >
        Log In
      </Button>

      <Button variant="link" className="w-4/12">
        Forgot Password?
      </Button>
    </main>
  );
}
