import {
  AbsoluteCenter,
  Button as ChakraButton,
  IconButton as ChakraIconButton,
  Span,
  Spinner,
  type ButtonProps,
  type CloseButtonProps,
} from '@chakra-ui/react';
import * as React from 'react';
import { LuX } from 'react-icons/lu';

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

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  return (
    <ChakraIconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
      {props.children ?? <LuX />}
    </ChakraIconButton>
  );
});
