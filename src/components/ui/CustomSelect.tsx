import {
  HStack,
  Portal,
  Select,
  createListCollection,
  useSelectContext,
  type SelectRootProps,
} from '@chakra-ui/react';
import * as React from 'react';

export interface SelectItem {
  label: string;
  value: string | number;
  [key: string]: any;
}

interface CustomSelectProps
  extends Omit<
    SelectRootProps,
    'children' | 'collection' | 'onChange' | 'value'
  > {
  label?: string;
  placeholder?: string;
  value?: string | number | null;
  onChange: (value?: string | number | null) => void;
  items: SelectItem[];
  groupBy?: (item: SelectItem) => string;
  stringifyItem?: (item: SelectItem) => string;
  renderLeft?: (item: SelectItem) => React.ReactNode;
  renderValue?: (item: SelectItem) => React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  placeholder = 'Seleccione una opción',
  value,
  onChange,
  items = [],
  groupBy,
  stringifyItem,
  renderLeft,
  renderValue,
  ...rest
}) => {
  const collection = createListCollection<SelectItem>({
    items,
    itemToValue: (item) => String(item.value),
    itemToString: stringifyItem ?? ((item) => item.label),
  });

  const SelectValue = () => {
    const { selectedItems } = useSelectContext();
    const selected = selectedItems[0] as SelectItem | undefined;

    return (
      <Select.ValueText placeholder={placeholder}>
        <HStack className="flex items-center gap-2">
          {selected
            ? renderValue
              ? renderValue(selected)
              : collection.stringifyItem(selected)
            : placeholder}
        </HStack>
      </Select.ValueText>
    );
  };

  const groupedItems = groupBy
    ? Object.entries(
        items.reduce<Record<string, SelectItem[]>>((acc, item) => {
          const key = groupBy(item);
          acc[key] = acc[key] || [];
          acc[key].push(item);
          return acc;
        }, {}),
      )
    : null;

  const selectedItem = collection.items.find(
    (item) => String(item.value) === String(value),
  );

  return (
    <Select.Root
      collection={collection}
      value={selectedItem ? [String(selectedItem.value)] : []}
      onValueChange={(details) => {
        const selected = details.items[0] as SelectItem | undefined;
        onChange(selected?.value);
      }}
      {...rest}
    >
      <Select.HiddenSelect />
      {label && <Select.Label>{label}</Select.Label>}
      <Select.Control mb={2}>
        <Select.Trigger>
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(null);
            }}
          />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {groupedItems
              ? groupedItems.map(([group, groupItems]) => (
                  <Select.ItemGroup key={group}>
                    <Select.ItemGroupLabel>{group}</Select.ItemGroupLabel>
                    {groupItems.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        <HStack className="flex items-center gap-2">
                          {renderLeft?.(item)}
                          {collection.stringifyItem(item)}
                        </HStack>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.ItemGroup>
                ))
              : items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    <HStack className="flex items-center gap-2">
                      {renderLeft?.(item)}
                      {collection.stringifyItem(item)}
                    </HStack>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
