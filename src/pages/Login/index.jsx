import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { loginUser } from "@/services/api/users";
import LoginCard from "@/components/LoginCard";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    e.preventDefault();
    try {
      setLoading(true);
      const respone = await loginUser({ email, password });
      console.log("success:", respone);
      toast.success("Login success");
    } catch (err) {
      console.log(err);
      toast.error("Login fail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[linear-gradient(90deg,rgba(2,0,36,1)_0%,#5044e5_35%,rgba(0,212,255,1)_100%)]">
      <LoginCard
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleLogin}
      />
    </div>
  );
}
