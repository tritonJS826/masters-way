import {render, screen} from "@testing-library/react";
import {WayCollectionCard} from "src/component/wayCollectionCard/WayCollectionCard";
import {Language} from "src/globalStore/LanguageStore";

const WAY_COLLECTION_CARD = "wayCollectionCard";
const WAY_COLLECTION_CARD_TITLE = "WayCollectionCard Title";
const WAYS_AMOUNT = 9;

/**
 * Render WayCollectionCard
 */
const renderWayCard = () =>
  render(
    <WayCollectionCard
      isActive={false}
      collectionTitle={WAY_COLLECTION_CARD_TITLE}
      collectionWaysAmount={WAYS_AMOUNT}
      onClick={() => {}}
      dataCy={WAY_COLLECTION_CARD}
      language={Language.ENGLISH}
    />,
  );

describe("WayCollectionCard component", () => {
  it("should render wayCollectionCard correctly", () => {
    renderWayCard();
    const card = screen.getByTestId(WAY_COLLECTION_CARD);
    expect(card).toBeInTheDocument();
  });

  it("should display the correct content elements", () => {
    renderWayCard();
    const card = screen.getByTestId(WAY_COLLECTION_CARD);
    expect(card).toHaveTextContent(WAY_COLLECTION_CARD_TITLE);
    expect(card).toHaveTextContent(WAYS_AMOUNT.toString());
  });
});
