import { useState } from "react";
import { Chip, Group, Text, Button, Space } from "@mantine/core";
import {
  contentRatingFilters,
  fantasyTropeOptions,
  genres,
  representationFilters,
  romanceTropeOptions,
  sciFiTropeOptions,
  thrillerTropeOptions,
  trueCrimeTropeOptions,
} from "../context/searchCriteria";
import SelectionQuery from "../components/SelectionQuery";
import PropTypes from "prop-types";
import ShelfDisplay from "../components/ShelfDisplay";
import classes from "../css/ChipGroup.module.css";

const ChipGroup = ({
  title,
  items,
  selectedItems,
  onItemSelect,
  multiple = true,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, 6);

  const handleShowAll = () => {
    setShowAll((prevState) => (prevState ? false : true));
  };

  return (
    <>
      <div className="chips">
        <Text>{title}</Text>
        <Group className={classes.chipGroup}>
          {displayedItems.map((item) => {
            const value = item.value || item;
            const label = item.label || item;
            return (
              <Chip
                key={value}
                checked={
                  multiple
                    ? selectedItems.includes(value)
                    : selectedItems === value
                }
                onChange={() => onItemSelect(value)}
              >
                {label}
              </Chip>
            );
          })}
        </Group>
        <Button onClick={handleShowAll}>Show All</Button>
      </div>
    </>
  );
};

ChipGroup.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ])
  ).isRequired,
  selectedItems: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

const SelectSearch = ({ apiKey }) => {
  const [books, setBooks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedRep, setSelectedRep] = useState([]);
  const [selectedRomanceTrope, setSelectedRomanceTrope] = useState([]);
  const [selectedTrueCrimeTrope, setSelectedTrueCrimeTrope] = useState([]);
  const [selectedThrillerTrope, setSelectedThrillerTrope] = useState([]);
  const [selectedSciFiTrope, setSelectedSciFiTrope] = useState([]);
  const [selectedFantasyTrope, setSelectedFantasyTrope] = useState([]);
  const [maxPageCount, setMaxPageCount] = useState("any");
  const [isLoading, setIsLoading] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [hideCriteria, setHideCriteria] = useState(false);

  const handleMultiSelect = (setter) => (item) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSingleSelect = (setter) => (item) => {
    setter((prev) => (prev === item ? "" : item));
  };

  const handleHideCriteria = () => {
    setHideCriteria((prevState) => !prevState);
  };

  const handleSearch = () => {
    setIsLoading(true);
    setSearchCriteria({
      selectedGenres,
      selectedRating,
      selectedRep,
      selectedRomanceTrope,
      selectedTrueCrimeTrope,
      selectedThrillerTrope,
      selectedSciFiTrope,
      selectedFantasyTrope,
      maxPageCount,
    });
  };

  return (
    <>
      <div className="MainContent">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleHideCriteria}>
            {hideCriteria ? "Show Criteria" : "Hide Criteria"}
          </Button>
        </div>
        <div className={classes.allChips}>
          {!hideCriteria && (
            <>
              <ChipGroup
                title="Genres"
                items={genres}
                selectedItems={selectedGenres}
                onItemSelect={handleMultiSelect(setSelectedGenres)}
              />
              <ChipGroup
                title="Rating"
                items={contentRatingFilters}
                selectedItems={selectedRating}
                onItemSelect={handleSingleSelect(setSelectedRating)}
                multiple={false}
              />
              <ChipGroup
                title="Representation"
                items={representationFilters}
                selectedItems={selectedRep}
                onItemSelect={handleMultiSelect(setSelectedRep)}
              />
              <ChipGroup
                title="Romance Tropes"
                items={romanceTropeOptions}
                selectedItems={selectedRomanceTrope}
                onItemSelect={handleMultiSelect(setSelectedRomanceTrope)}
              />
              <ChipGroup
                title="True Crime Tropes"
                items={trueCrimeTropeOptions}
                selectedItems={selectedTrueCrimeTrope}
                onItemSelect={handleMultiSelect(setSelectedTrueCrimeTrope)}
              />
              <ChipGroup
                title="Thriller Tropes"
                items={thrillerTropeOptions}
                selectedItems={selectedThrillerTrope}
                onItemSelect={handleMultiSelect(setSelectedThrillerTrope)}
              />
              <ChipGroup
                title="Science Fiction Tropes"
                items={sciFiTropeOptions}
                selectedItems={selectedSciFiTrope}
                onItemSelect={handleMultiSelect(setSelectedSciFiTrope)}
              />
              <ChipGroup
                title="Fantasy Tropes"
                items={fantasyTropeOptions}
                selectedItems={selectedFantasyTrope}
                onItemSelect={handleMultiSelect(setSelectedFantasyTrope)}
              />
              <ChipGroup
                title="Max Page Count"
                items={["100", "300", "500", "1000", "any"]}
                selectedItems={maxPageCount}
                onItemSelect={handleSingleSelect(setMaxPageCount)}
                multiple={false}
              />
              <Button onClick={handleSearch} loading={isLoading}>
                Search
              </Button>
            </>
          )}

          <SelectionQuery
            apiKey={apiKey}
            criteria={searchCriteria}
            setBooks={setBooks}
            setIsLoading={setIsLoading}
          />
          <Space h="xl" />
          {isLoading ? (
            <Text align="center">Loading...</Text>
          ) : books.length > 0 ? (
            <div>
              <Text size="xl" weight={700}>
                Search Results:
              </Text>
              <Group>
                <ShelfDisplay books={books} />
              </Group>
            </div>
          ) : (
            <Text align="center">
              No books found. Try selecting different criteria!
            </Text>
          )}
        </div>
      </div>
    </>
  );
};

SelectSearch.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default SelectSearch;
