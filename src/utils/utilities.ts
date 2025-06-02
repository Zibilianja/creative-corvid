function GetInputId() {
  return 'input-' + (Math.random() + 1).toString(36).substring(5);
}

export { GetInputId };
