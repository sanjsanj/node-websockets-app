const { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    const from = "Admin";
    const text = "Hi";
    const message = generateMessage(from, text);

    expect(message).toEqual(expect.objectContaining({ from, text }));
    expect(typeof message.createdAt).toEqual("number");
  });
});
