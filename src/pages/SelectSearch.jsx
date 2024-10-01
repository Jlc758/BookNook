import { useState, useMemo } from "react";
import {
  Chip,
  Group,
  Text,
  Button,
  Space,
  Paper,
  Container,
} from "@mantine/core";
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
import ResultsDisplay from "../components/ResultsDisplay";
import LoadingAnimation from "../components/LoadingAnimation";

const ChipGroup = ({
  title,
  items,
  selectedItems,
  onItemSelect,
  multiple = true,
  disabled = false,
}) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Text weight={500} size="lg" mb="xs">
        {title}
      </Text>
      <div
        style={{
          height: showAll ? "auto" : "200px",
          overflow: "hidden",
        }}
      >
        <Group spacing="xs">
          {items.map((item) => {
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
                disabled={disabled}
                size="sm"
              >
                {label}
              </Chip>
            );
          })}
        </Group>
      </div>
      {items.length > 0 && (
        <Button
          onClick={() => setShowAll(!showAll)}
          variant="subtle"
          size="sm"
          mt="sm"
          fullWidth
        >
          {showAll ? "Show Less" : "Show More"}
        </Button>
      )}
    </Paper>
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
  disabled: PropTypes.bool,
};

const SelectSearch = ({ apiKey, googleAPIKey }) => {
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
    setHideCriteria(true);
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
    <Container size="xl">
      <Paper
        shadow="sm"
        p="md"
        withBorder
        position="sticky"
        top={60}
        style={{ zIndex: 1, marginBottom: "1rem" }}
      >
        <Button
          onClick={handleHideCriteria}
          variant="subtle"
          fullWidth
          style={{
            backgroundColor: "var(--mantine-color-rose-1)",
            color: "var(--mantine-color-gray-7)",
          }}
        >
          {hideCriteria ? "Show Criteria" : "Hide Criteria"}
        </Button>
      </Paper>

      {!hideCriteria && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
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
            disabled={isMaxPageCountDisabled}
          />
        </div>
      )}

      <Button
        onClick={handleSearch}
        loading={isLoading}
        size="lg"
        fullWidth
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          backgroundColor: "var(--mantine-color-rose-1)",
          color: "var(--mantine-color-gray-7)",
          fontSize: "16px",
        }}
      >
        Search
      </Button>

      <SelectionQuery
        apiKey={apiKey}
        googleAPIKey={googleAPIKey}
        criteria={searchCriteria}
        setBooks={setBooks}
        setIsLoading={setIsLoading}
      />

      <Space h="xl" />

      {isLoading ? (
        <LoadingAnimation />
      ) : books.length > 0 ? (
        <div>
          <Text size="lg" weight={700} mb="md" style={{ paddingLeft: "10px" }}>
            Search Results:
          </Text>
          <ResultsDisplay books={books} />
        </div>
      ) : (
        <Text align="center" size="lg">
          No books found. Try selecting different criteria!
        </Text>
      )}
    </Container>
  );
};

SelectSearch.propTypes = {
  apiKey: PropTypes.string.isRequired,
  googleAPIKey: PropTypes.string.isRequired,
};

export default SelectSearch;
