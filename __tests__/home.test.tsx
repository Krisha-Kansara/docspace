import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("DocSpace Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("displays documents returned from the API", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: "123",
          title: "My Test Document",
          content: "<p>Hello from DocSpace</p>",
          ownerId: "user-1",
          sharedWith: [],
          updatedAt: new Date().toISOString(),
        },
      ],
    });

    render(<Home />);

    expect(
      screen.getByText("Loading documents...")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText("My Test Document")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("Hello from DocSpace")
    ).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/documents?userId=user-1"
    );
  });
});