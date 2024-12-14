// Shared function and state manager
let activeSection = "";
let setActiveSection = null;


export const initializeState = (callback) => {
  setActiveSection = callback;
};

// Function to trigger when you want to change the state
export const handleAddPropertyClick = () => {
  if (setActiveSection) {
    setActiveSection("add-property");
  } else {
    console.warn("State callback not initialized");
  }
};

export const getActiveSection = () => activeSection;
