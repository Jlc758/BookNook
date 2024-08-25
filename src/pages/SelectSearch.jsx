import { Chip, Group, Text } from "@mantine/core";
import {
  shorthandMapping,
  tropeMapping,
  genres,
} from "../context/searchCriteria";

const SelectionGroup = ({
  title,
  items,
  selectedItems,
  onItemSelect,
  multiple = true,
}) => (
  <div>
    <Text>{title}</Text>
    <Group>
      {items.map((item) => (
        <Chip
          key={item}
          checked={
            multiple ? selectedItems.includes(item) : selectedItems === item
          }
          onChange={() => onItemSelect(item)}
        >
          {item}
        </Chip>
      ))}
    </Group>
  </div>
);

export const GenreSelector = ({ selectedGenres, onGenreSelect }) => (
  <ChipGroup
    title="Genres"
    items={[{ genres }]}
    selectedItems={selectedGenres}
    onItemSelect={onGenreSelect}
  />
);

export const KeywordSelector = ({ selectedKeywords, onKeywordSelect }) => (
  <ChipGroup
    title="Keywords"
    items={["Bestseller", "Award-winning", "Classic", "New release", "Indie"]}
    selectedItems={selectedKeywords}
    onItemSelect={onKeywordSelect}
  />
);

export const PageCountSelector = ({ maxPageCount, onPageCountSelect }) => (
  <ChipGroup
    title="Max Page Count"
    items={["100", "300", "500", "1000", "any"]}
    selectedItems={maxPageCount}
    onItemSelect={onPageCountSelect}
    multiple={false}
  />
);

export default SelectSearch;
