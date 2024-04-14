import { logout } from "./logout";
import localStorageMock from "../../storage/localStorage.mock";

// The localStorage mock was shown by Oliver Dipple, in "Introduction to testing" [viewed on April 11-2024].
global.localStorage = localStorageMock;

describe("logout", () => {
  beforeEach(jest.clearAllMocks);

  it("deletes both the token and the profile from the localStorage", async () => {
    logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("profile");
  });
});
