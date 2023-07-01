import React from 'react';
import { render, screen } from '@testing-library/react';

import { Error } from './Error';

describe('Error component', () => {
  it('should renders error text in red', () => {
    render(<Error text="Error text" />);
    const errorText = screen.getByText('Error text');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass('text-red-500');
  })
});
