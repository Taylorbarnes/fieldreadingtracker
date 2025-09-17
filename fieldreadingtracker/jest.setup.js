import "@testing-library/jest-dom"
import { jest } from "@jest/globals"
import { beforeEach } from "@jest/globals"

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock Notification API
global.Notification = {
  permission: "default",
  requestPermission: jest.fn(() => Promise.resolve("granted")),
}

// Mock window.Notification constructor
global.window.Notification = jest.fn()

// Reset mocks before each test
beforeEach(() => {
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
})
