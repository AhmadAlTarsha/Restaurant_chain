const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light" ? {} : {}),
  },
});

export default getDesignTokens;
