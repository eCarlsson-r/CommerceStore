"use client";
import { useState } from "react";

const accounts = [
  { username: "Carlos", pin: "1111" },
  { username: "Steven", pin: "2222" },
  { username: "Jessica", pin: "3333" },
  { username: "Davis", pin: "4444" },
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO : Login from server
    const account = accounts.find(
      (acc) => acc.username === username && acc.pin === password,
    );
    if (account) {
      setError("");
      console.log("Login successful for user:", username);
      // Redirect to catalog or another page if needed
    } else {
      setError("Invalid username or pin");
    }
  };
  return (
    <form className="flex flex-col w-[30%] relative bg-zinc-100 shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)] p-10 rounded-md animate-[mymove_1.5s_ease-in-out] mt-[100px] mx-auto my-0">
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
      />
      <label>Pin</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mb-4 w-full"
      />
      <br />
      <button
        type="submit"
        onClick={handleSubmit}
        className="text-lg text-white bg-yellow-950 cursor-pointer p-5 rounded-md"
      >
        Login
      </button>
      <div className="text-red-500 text-xl mt-4">{error}</div>
    </form>
  );
}
