import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner,
  type ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import * as React from 'react';

export interface ButtonProps extends ChakraButtonProps {
  loading?: boolean;
  loadingText?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ loading, disabled, loadingText, children, ...rest }, ref) {
    return (
      <ChakraButton disabled={loading || disabled} ref={ref} {...rest}>
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    );
  },
);
