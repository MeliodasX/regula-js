export const applyOperation = (LHS, RHS, operation) => {
  switch (operation) {
    case "===":
      return equal(LHS, RHS);
    case "!==":
      return notEqual(LHS, RHS);
    case ">":
      return isGreaterThan(LHS, RHS);
    case "<":
      return isSmallerThan(LHS, RHS);
    case ">==":
      return isGreaterThanEqualTo(LHS, RHS);
    case "<==":
      return isSmallerThanEqualTo(LHS, RHS);
    case "includes":
      return includes(LHS, RHS);
    default:
      console.log("operator not supported", operation);
  }
};

const equal = (LHS, RHS) => {
  return LHS === RHS;
};

const notEqual = (LHS, RHS) => {
  return LHS !== RHS;
};

const isGreaterThan = (LHS, RHS) => {
  return LHS > RHS;
};

const isSmallerThan = (LHS, RHS) => {
  return LHS < RHS;
};

const isGreaterThanEqualTo = (LHS, RHS) => {
  return LHS >= RHS;
};

const isSmallerThanEqualTo = (LHS, RHS) => {
  return LHS <= RHS;
};

const includes = (LHS, RHS) => {
  return LHS.includes(RHS);
};

