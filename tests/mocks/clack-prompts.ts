/**
 * Mock implementation of @clack/prompts for testing
 * Provides non-interactive responses for CLI tests
 */

// Mock responses for different test scenarios
interface MockResponses {
  [key: string]: any;
}

let currentMockResponses: MockResponses = {};

// Mock implementations
export const text = async (options: any): Promise<string> => {
  const key = options.message || 'text';
  return currentMockResponses[key] || options.initialValue || options.placeholder || 'test-value';
};

export const select = async (options: any): Promise<string> => {
  const key = options.message || 'select';
  const mockValue = currentMockResponses[key];
  
  if (mockValue) {
    return mockValue;
  }
  
  // Return first option by default
  if (options.options && options.options.length > 0) {
    return options.options[0].value;
  }
  
  return 'default-option';
};

export const multiselect = async (options: any): Promise<string[]> => {
  const key = options.message || 'multiselect';
  const mockValue = currentMockResponses[key];
  
  if (mockValue) {
    return Array.isArray(mockValue) ? mockValue : [mockValue];
  }
  
  // Return first option by default
  if (options.options && options.options.length > 0) {
    return [options.options[0].value];
  }
  
  return ['default-option'];
};

export const confirm = async (options: any): Promise<boolean> => {
  const key = options.message || 'confirm';
  const mockValue = currentMockResponses[key];
  
  if (typeof mockValue === 'boolean') {
    return mockValue;
  }
  
  return options.initialValue !== undefined ? options.initialValue : true;
};

export const spinner = () => ({
  start: (message?: string) => {},
  stop: (message?: string) => {},
  message: (message: string) => {}
});

export const intro = (message: string) => {
  console.log(message);
};

export const outro = (message: string) => {
  console.log(message);
};

export const cancel = (message: string) => {
  throw new Error(`Cancelled: ${message}`);
};

export const isCancel = (value: any): boolean => {
  return false; // Never cancel in tests unless explicitly set
};

// Utility functions for tests
export const setMockResponses = (responses: MockResponses) => {
  currentMockResponses = { ...responses };
};

export const resetMockResponses = () => {
  currentMockResponses = {};
};

export const addMockResponse = (key: string, value: any) => {
  currentMockResponses[key] = value;
};

// Export all as default for easier importing
export default {
  text,
  select,
  multiselect,
  confirm,
  spinner,
  intro,
  outro,
  cancel,
  isCancel,
  setMockResponses,
  resetMockResponses,
  addMockResponse
};