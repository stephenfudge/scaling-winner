import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/loggedin");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="py-10">
      <div className="pt-3 flex flex-col justify-center px-6 lg:px-8 text-center">
        <h1>Login Below</h1>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md dark:bg-gray-900">
          <div className="py-8 px-6 shadow rounded-lg sm:px-10">
            <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
              {/* Name section required */}
              <div>
                <label htmlFor="name" className="block font-medium">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className="w-full border border-purple dark:border-lightpink px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-lightpurple focus:ring-1 focus:ring-lightpurple"
                  />
                </div>
              </div>
              {/* Email section required */}
              <div>
                <label htmlFor="password" className="block font-medium">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full border border-purple dark:border-lightpink px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-lightpurple focus:ring-1 focus:ring-lightpurple"
                  />
                </div>
              </div>

              <div>
                {error && <p>{error}</p>}
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm font-medium text-navy dark:text-lightpink hover:text-deep dark:hover:text-deep"
                >
                  Login
                </button>
                {/* <button type="submit">Login</button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
