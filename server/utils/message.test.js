const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    const from = "Admin";
    const text = "Hi";
    const message = generateMessage(from, text);

    expect(message).toEqual(expect.objectContaining({ from, text }));
    expect(typeof message.createdAt).toEqual("number");
  });
});

describe("generateLocationMessage", () => {
  it("should generate the correct location object", () => {
    const from = "Admin";
    const latitude = 50.1234;
    const longitude = -0.1234;
    const url = `https://www.google.com/maps/?q=${latitude},${longitude}`;
    const locationMessage = generateLocationMessage(from, latitude, longitude);

    expect(locationMessage).toEqual(expect.objectContaining({ from, url }));
    expect(typeof locationMessage.createdAt).toEqual("number");
  });
});
