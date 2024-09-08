import { useState, useMemo } from "react";
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
import LoadingAnimation from "../components/LoadingAnimation";

const ChipGroup = ({
  title,
  items,
  selectedItems,
  onItemSelect,
  multiple = true,
  itemClassName,
  disabled = false,
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, 6);

  const handleShowAll = () => {
    setShowAll((prevState) => (prevState ? false : true));
  };

  return (
    <>
      <div className="chips">
        <Text className={classes.chipGroup}>{title}</Text>

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
                className={itemClassName}
                disabled={disabled}
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
  itemClassName: PropTypes.func,
  disabled: PropTypes.bool,
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
  const [maxPageCount, setMaxPageCount] = useState(null);
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

  const handleMaxPageCountSelect = (value) => {
    setMaxPageCount(value === "any" ? null : Number(value));
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

  const isMaxPageCountDisabled = useMemo(() => {
    return (
      selectedGenres.length === 0 &&
      !selectedRating &&
      selectedRep.length === 0 &&
      selectedRomanceTrope.length === 0 &&
      selectedTrueCrimeTrope.length === 0 &&
      selectedThrillerTrope.length === 0 &&
      selectedSciFiTrope.length === 0 &&
      selectedFantasyTrope.length === 0
    );
  }, [
    selectedGenres,
    selectedRating,
    selectedRep,
    selectedRomanceTrope,
    selectedTrueCrimeTrope,
    selectedThrillerTrope,
    selectedSciFiTrope,
    selectedFantasyTrope,
  ]);

  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleHideCriteria} className="button">
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
                itemClassName={classes.button}
              />
              <ChipGroup
                title="Rating"
                items={contentRatingFilters}
                selectedItems={selectedRating}
                onItemSelect={handleSingleSelect(setSelectedRating)}
                multiple={false}
                itemClassName={classes.button}
              />
              <ChipGroup
                title="Representation"
                items={representationFilters}
                selectedItems={selectedRep}
                onItemSelect={handleMultiSelect(setSelectedRep)}
                itemClassName={classes.button}
              />
              <ChipGroup
                title="Romance Tropes"
                items={romanceTropeOptions}
                selectedItems={selectedRomanceTrope}
                onItemSelect={handleMultiSelect(setSelectedRomanceTrope)}
                itemClassName={classes.button}
              />
              <ChipGroup
                title="True Crime Tropes"
                items={trueCrimeTropeOptions}
                selectedItems={selectedTrueCrimeTrope}
                onItemSelect={handleMultiSelect(setSelectedTrueCrimeTrope)}
                itemClassName={classes.button}
              />
              <ChipGroup
                title="Thriller Tropes"
                items={thrillerTropeOptions}
                selectedItems={selectedThrillerTrope}
                onItemSelect={handleMultiSelect(setSelectedThrillerTrope)}
                itemClassName={classes.button}
              />
              <ChipGroup
                title="Science Fiction Tropes"
                items={sciFiTropeOptions}
                selectedItems={selectedSciFiTrope}
                onItemSelect={handleMultiSelect(setSelectedSciFiTrope)}
                itemClassName={classes.button}
              />
              <ChipGroup
                title="Fantasy Tropes"
                items={fantasyTropeOptions}
                selectedItems={selectedFantasyTrope}
                onItemSelect={handleMultiSelect(setSelectedFantasyTrope)}
                itemClassName={classes.button}
              />
              <ChipGroup
                title="Max Page Count"
                items={[
                  { value: "100", label: "Under 100 pages" },
                  { value: "300", label: "100-300 pages" },
                  { value: "500", label: "300-500 pages" },
                  { value: "1000", label: "Over 500 pages" },
                  { value: "any", label: "Any" },
                ]}
                selectedItems={
                  maxPageCount === null ? "any" : maxPageCount.toString()
                }
                onItemSelect={handleMaxPageCountSelect}
                multiple={false}
                itemClassName={classes.button}
                disabled={isMaxPageCountDisabled}
              />
              <Button
                onClick={handleSearch}
                loading={isLoading}
                className="button"
              >
                Search
              </Button>
            </>
          )}
        </div>
        <SelectionQuery
          apiKey={apiKey}
          criteria={searchCriteria}
          setBooks={setBooks}
          setIsLoading={setIsLoading}
        />
        <Space h="xl" />
        {isLoading ? (
          <LoadingAnimation />
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
    </>
  );
};

SelectSearch.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default SelectSearch;
