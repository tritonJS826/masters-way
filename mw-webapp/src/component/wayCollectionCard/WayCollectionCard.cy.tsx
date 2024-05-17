import {WayCollectionCard} from "src/component/wayCollectionCard/WayCollectionCard";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const WAY_COLLECTION_CARD_CY = "wayCollectionCard";
const title = "WayCollectionCard Title";
const waysAmount = 9;

describe("UserCard component", () => {
  beforeEach(() => {
    cy.mount(
      <WayCollectionCard
        isActive={false}
        collectionTitle={title}
        collectionWaysAmount={waysAmount}
        onClick={() => {}}
        dataCy={WAY_COLLECTION_CARD_CY}
      />,
    );
  });

  it("should render wayCollectionCard correctly", () => {
    cy.get(getDataCy(WAY_COLLECTION_CARD_CY)).should("exist");
  });

  it("should display the correct content elements", () => {
    cy.get(getDataCy(WAY_COLLECTION_CARD_CY)).contains(title);
    cy.get(getDataCy(WAY_COLLECTION_CARD_CY)).contains(waysAmount);
  });
});
