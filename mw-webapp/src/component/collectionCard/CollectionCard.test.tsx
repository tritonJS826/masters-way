import {render, screen} from "@testing-library/react";
import {CollectionCard} from "src/component/collectionCard/CollectionCard";
import {Language} from "src/globalStore/LanguageStore";

const COLLECTION_CARD_CY = "wayCollectionCardCy";
const COLLECTION_CARD_TITLE = "CollectionCard Title";
const COLLECTIONS_AMOUNT = 9;

/**
 * Render CollectionCard
 */
const renderCollectionCard = () =>
  render(
    <CollectionCard
      isActive={false}
      collectionTitle={COLLECTION_CARD_TITLE}
      collectionsAmount={COLLECTIONS_AMOUNT}
      onClick={() => {}}
      dataCy={COLLECTION_CARD_CY}
      language={Language.ENGLISH}
      collectionAmountTitle="Ways:"
    />,
  );

describe("CollectionCard component", () => {
  it("should render collectionCard correctly", () => {
    renderCollectionCard();
    const card = screen.getByTestId(COLLECTION_CARD_CY);
    expect(card).toBeInTheDocument();
  });

  it("should display the correct content elements", () => {
    renderCollectionCard();
    const card = screen.getByTestId(COLLECTION_CARD_CY);
    expect(card).toHaveTextContent(COLLECTION_CARD_TITLE);
    expect(card).toHaveTextContent(COLLECTIONS_AMOUNT.toString());
  });
});
