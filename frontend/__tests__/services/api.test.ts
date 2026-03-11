import { getProfile, getProjects, getSuggestions, sendMessage } from "@/services/api";

jest.mock("axios", () => {
  const mockGet = jest.fn();
  const mockPost = jest.fn();
  return {
    default: {
      create: () => ({ get: mockGet, post: mockPost }),
    },
    create: () => ({ get: mockGet, post: mockPost }),
  };
});

const getMockGet = () => {
  const axios = require("axios");
  return axios.create().get as jest.Mock;
};

describe("api", () => {
  beforeEach(() => {
    getMockGet().mockClear();
  });

  it("getProfile should return data", async () => {
    getMockGet().mockResolvedValue({
      data: { about: {}, experience: [], projects: [] },
    });

    const result = await getProfile();

    expect(result).toEqual({ about: {}, experience: [], projects: [] });
  });

  it("getProfile should throw when request fails", async () => {
    getMockGet().mockRejectedValue(new Error("Network error"));

    await expect(getProfile()).rejects.toThrow("Failed to fetch profile");
  });

  it("getProjects should return data", async () => {
    getMockGet().mockResolvedValue({ data: [{ name: "Test Project" }] });

    const result = await getProjects();

    expect(result).toEqual([{ name: "Test Project" }]);
  });

  it("getSuggestions should return suggestions", async () => {
    getMockGet().mockResolvedValue({
      data: { suggestions: ["What are your skills?"] },
    });

    const result = await getSuggestions();

    expect(result).toEqual({ suggestions: ["What are your skills?"] });
  });

  it("getSuggestions should throw when request fails", async () => {
    getMockGet().mockRejectedValue(new Error("Network error"));
    await expect(getSuggestions()).rejects.toThrow("Failed to fetch suggestions");
  });

  it("sendMessage should return message", async () => {
    const mockPost = require("axios").create().post as jest.Mock;
    mockPost.mockResolvedValue({
      data: { message: "Jeff Zhang knows Python." },
    });

    const result = await sendMessage("What are your skills?");

    expect(result).toEqual({ message: "Jeff Zhang knows Python." });
  });

  it("sendMessage should throw when request fails", async () => {
    const mockPost = require("axios").create().post as jest.Mock;
    mockPost.mockRejectedValue(new Error("Network error"));
    await expect(sendMessage("hello")).rejects.toThrow("Failed to send message");
  });
});
