import { LoginForm } from "@/components/forms/loginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-[#121212]">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block bg-[#1a1a1a] border-l border-[rgba(138,43,226,0.2)]">
        <Image
          src="/images/profile.jpg"
          alt="Login"
          fill
          priority
          className="object-cover w-full h-full brightness-[0.4] grayscale"
        />
      </div>
    </div>
  );
}
