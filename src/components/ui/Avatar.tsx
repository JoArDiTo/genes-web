import { Avatar as ChakraAvatar, Group } from '@chakra-ui/react';
import * as React from 'react';

type AvatarProps = {
  name?: string;
  src?: string;
  srcSet?: string;
  loading?: 'eager' | 'lazy';
  icon?: React.ReactNode;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: any;
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const { name, src, srcSet, loading, icon, fallback, children, ...rest } =
      props;

    const colorPalette = [
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'orange',
      'gray',
      'teal',
      'cyan',
      'pink',
      'accent',
    ];

    const pickPalette = (name?: string) => {
      if (!name || typeof name !== 'string') {
        console.error('pickPalette recibió un valor inválido:', name);
        return colorPalette[0]; // Valor por defecto
      }
      const index = name.charCodeAt(0) % colorPalette.length;
      return colorPalette[index];
    };

    return (
      <ChakraAvatar.Root ref={ref} {...rest} colorPalette={pickPalette(name)}>
        <AvatarFallback name={name} icon={icon}>
          {fallback}
        </AvatarFallback>
        <ChakraAvatar.Image src={src} srcSet={srcSet} loading={loading} />
        {children}
      </ChakraAvatar.Root>
    );
  },
);

type AvatarFallbackProps = {
  name?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: any;
};

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  function AvatarFallback(props, ref) {
    const { name, icon, children, ...rest } = props;
    return (
      <ChakraAvatar.Fallback ref={ref} {...rest}>
        {children}
        {name != null && children == null && <>{getInitials(name)}</>}
        {name == null && children == null && (
          <ChakraAvatar.Icon asChild={!!icon}>{icon}</ChakraAvatar.Icon>
        )}
      </ChakraAvatar.Fallback>
    );
  },
);

function getInitials(name: string): string {
  const names = name.trim().split(' ');
  const firstName = names[0] != null ? names[0] : '';
  const lastName = names.length > 1 ? names[names.length - 1] : '';
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

type AvatarGroupProps = {
  size?: string;
  variant?: string;
  borderless?: boolean;
  children?: React.ReactNode;
  [key: string]: any;
};

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(props, ref) {
    const { size, variant, borderless, ...rest } = props;
    return (
      <ChakraAvatar.PropsProvider value={{ size, variant, borderless }}>
        <Group gap="0" spaceX="-3" ref={ref} {...rest} />
      </ChakraAvatar.PropsProvider>
    );
  },
);
