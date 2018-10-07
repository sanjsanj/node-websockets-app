const { isRealString } = require("./validation");

describe("isRealString", () => {
  it("should reject non-string values", () => {
    expect(isRealString(42)).toEqual(false);
  });
  
  it("should reject string with only spaces", () => {
    expect(isRealString(" ")).toEqual(false);
  });
  
  it("should allow string with non-space character", () => {
    expect(isRealString("Some text")).toEqual(true);
  });
});
