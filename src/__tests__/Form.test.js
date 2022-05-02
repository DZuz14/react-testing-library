import React from 'react';
import Form from '../components/Form';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Form', () => {
  test('it renders the form', () => {
    render(<Form />);

    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('xyz@gmail.com')).toBeInTheDocument();
  });

  test('it accepts input properly', async () => {
    render(<Form />);

    const name = screen.getByPlaceholderText('Your name');
    await userEvent.type(name, 'Dana Scully');
    expect(name).toHaveValue('Dana Scully');

    const email = screen.getByPlaceholderText('xyz@gmail.com');
    await userEvent.type(email, 'd.scully@fbi.gov');
    expect(email).toHaveValue('d.scully@fbi.gov');
  });

  test('it passes the forms values on submit', async () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} />);

    const name = screen.getByPlaceholderText('Your name');
    await userEvent.type(name, 'Dana Scully');

    const email = screen.getByPlaceholderText('xyz@gmail.com');
    await userEvent.type(email, 'd.scully@fbi.gov');

    fireEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Dana Scully',
      email: 'd.scully@fbi.gov',
    });
  });
});
