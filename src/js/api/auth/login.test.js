import { login } from "./login.js";
import { apiPath } from "../constants.js";
import { headers } from "../headers.js";
import localStorageMock from "../../storage/localStorage.mock.js";

// The localStorage mock was shown by Oliver Dipple, in "Introduction to testing" [viewed on April 11-2024].
global.localStorage = localStorageMock;

describe("login", () => {
  beforeEach(jest.clearAllMocks);

  it("should POST an email and password and receive and store a token from the server and store a user profile", async () => {
    const mockResponse = { name: "example", email: "example@noroff.no" };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const profile = await login("example@noroff.no", "password");

    expect(global.fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: "post",
      body: JSON.stringify({
        email: "example@noroff.no",
        password: "password",
      }),
      headers: headers("application/json"),
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "token",
      JSON.stringify(mockResponse.accessToken),
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "profile",
      JSON.stringify(profile),
    );
  });

  it("throws an error if the login-information is incorrect", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Login failed",
    });

    const email = "example@notnoroff.no";
    const password = "invalidPassword";

    await expect(login(email, password)).rejects.toThrow("Login failed");
  });
});
