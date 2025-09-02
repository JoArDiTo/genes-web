import * as React from 'react';
import {
  HStack,
  ButtonGroup,
  IconButton,
  Text,
  Stack,
  useBreakpointValue,
  createListCollection,
} from '@chakra-ui/react';
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from 'react-icons/lu';
import { SelectRoot, SelectTrigger, SelectContent, SelectItem } from './Select';

type PageSizeOption = {
  label: string;
  value: number;
};

type PaginationProps = {
  count: number;
  pageSize: number;
  currentPage: number;
  pageSizeOptions: PageSizeOption[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  count,
  pageSize,
  currentPage,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(count / pageSize);
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, count);
  const options = Array.isArray(pageSizeOptions) ? pageSizeOptions : [];
  const isSmUp = useBreakpointValue({ base: false, sm: true });

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  const safeOptions = Array.isArray(options)
    ? options
        .filter(
          (opt) =>
            typeof opt.label === 'string' && typeof opt.value === 'number',
        )
        .map((opt) => ({ label: opt.label, value: String(opt.value) }))
    : [];

  return (
    <Stack
      w="full"
      direction={{ base: 'column', sm: 'row' }}
      justify={{ base: 'center', sm: 'space-between' }}
      align="center"
      p="2"
    >
      {isSmUp && (
        <SelectRoot
          collection={createListCollection({ items: safeOptions })}
          size="xs"
          w="150px"
          defaultValue={[String(pageSize)]}
          onValueChange={(option) => {
            onPageSizeChange(Number(option.value[0]));
          }}
        >
          <SelectTrigger>
            {safeOptions.find((opt) => opt.value === String(pageSize))?.label ??
              'Seleccionar filas'}
          </SelectTrigger>
          <SelectContent bg="white" zIndex={1600}>
            {safeOptions.map((option) => (
              <SelectItem
                key={option.value}
                item={{ label: option.label, value: option.value }}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      )}
      <HStack mt="2" justify="end">
        <Text fontWeight="medium">
          {from} - {to} de {count}
        </Text>
        <ButtonGroup variant="ghost" size="sm">
          <IconButton
            size="xs"
            variant="outline"
            aria-label="Primera página"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            <LuChevronsLeft />
          </IconButton>
          <IconButton
            size="xs"
            variant="outline"
            aria-label="Página anterior"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <LuChevronLeft />
          </IconButton>
          <IconButton
            size="xs"
            variant="outline"
            aria-label="Página siguiente"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <LuChevronRight />
          </IconButton>
          <IconButton
            size="xs"
            variant="outline"
            aria-label="Última página"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <LuChevronsRight />
          </IconButton>
        </ButtonGroup>
      </HStack>
    </Stack>
  );
};
