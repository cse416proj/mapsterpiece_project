import { render, screen } from '@testing-library/react';
import App from './App';

test('renders splash screen description', () => {
  render(<App />);
  const descriptionElement = screen.getByText(/A platform for map lovers/i);
  expect(descriptionElement).toBeInTheDocument();
});

// test('renders all the expected elements', () => {
//   render(<App />);
//   const guestBtn = screen.getByText(/continue as guest/i);
//   expect(guestBtn).toBeInTheDocument();

//   const createAccBtn = screen.getByText(/create account/i);
//   expect(createAccBtn).toBeInTheDocument();

//   const loginBtn = screen.getByText(/login/i);
//   expect(loginBtn).toBeInTheDocument();
// });
