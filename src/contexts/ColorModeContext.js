// Context to provide a light/dark mode toggle across the app
import React from 'react';

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default ColorModeContext;
