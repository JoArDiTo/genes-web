import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './Dialog';
import { Button } from './Button';
import { type ReactNode, type Ref, type HTMLAttributes } from 'react';

type ModalProps = {
  title?: ReactNode;
  children?: ReactNode;
  trigger?: ReactNode;
  onSave?: () => void;
  hiddenFooter?: boolean;
  contentRef?: Ref<HTMLDivElement>;
  loading?: boolean;
  loadingText?: string;
  cancelLabel?: string;
  saveLabel?: string;
  size?: string | number;
  sizeH?: string | number;
  disabledSave?: boolean;
  placement?: 'center' | 'top' | 'bottom';
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
} & HTMLAttributes<HTMLDivElement>;

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  trigger,
  onSave,
  hiddenFooter = false,
  contentRef,
  loading = false,
  loadingText = 'Guardando...',
  cancelLabel = 'Cancelar',
  saveLabel = 'Guardar',
  size = 'md',
  sizeH = '90vh',
  disabledSave = false,
  placement = 'center',
  open,
  onOpenChange,
  ...props
}) => {
  return (
    <DialogRoot
      open={open}
      onOpenChange={onOpenChange}
      placement={placement}
      {...props}
      role="dialog"
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        bg="white"
        ref={contentRef}
        w={size}
        maxW={size}
        maxH={sizeH}
        overflow="hidden"
        pb="8px"
      >
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>

        <DialogBody
          overflowY="auto"
          css={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#B3B3B3 transparent',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#B3B3B3',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#999',
            },
          }}
        >
          {children}
        </DialogBody>

        {!hiddenFooter && (
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" colorPalette="red">
                {cancelLabel}
              </Button>
            </DialogActionTrigger>
            <Button
              onClick={onSave}
              bg="red.500"
              color="white"
              _hover={{ bg: 'red.600' }}
              loading={loading}
              loadingText={loadingText}
              disabled={disabledSave || loading}
            >
              {saveLabel}
            </Button>
          </DialogFooter>
        )}

        <DialogCloseTrigger bg="transparent" />
      </DialogContent>
    </DialogRoot>
  );
};
