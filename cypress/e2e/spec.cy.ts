const ingredients = [
  {
    name: "Флюоресцентная булка R2-D3",
  },
  {
    name: "Соус Spicy-X",
  },
  {
    name: "Биокотлета из марсианской Магнолии",
  },
];

describe("service is available", () => {
  it("should be available on localhost:3000", () => {
    cy.visit("http://localhost:3000/");
  });
});

describe("burger constructor page", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "orderData"
    );

    window.localStorage.setItem("accessToken", "abc");
    window.localStorage.setItem("refreshToken", "abcd");

    cy.visit("http://localhost:3000/");

    cy.get('[data-testid="dustbin"]:nth-child(1)').as("bunTopArea");
    cy.get('[data-testid="dustbin"]:nth-child(3)').as("bunBottomArea");
    cy.get('[data-testid="dustbin2"]').as("ingredientsArea");
  });
  afterEach(() => {
    cy.clearLocalStorage();
  });

  it("ingredient info modal", () => {
    cy.get("[data-testid='burger-bun']:nth-child(2)").click();
    cy.get("[data-testid='modal']").as("modal");
    cy.get("@modal")
      .find(".text-center > p")
      .should("have.text", ingredients[0].name);
    cy.get("@modal").find("header > span").click();
    cy.get("@modal").should("not.exist");
  });

  it("create order", () => {
    cy.get("[data-testid='burger-bun']:nth-child(2)").trigger("dragstart");
    cy.get("@bunTopArea").trigger("drop");
    cy.get(`@bunTopArea`)
      .find(`.constructor-element__text`)
      .should("have.text", ingredients[0].name + " (верх)");
    cy.get(`@bunBottomArea`)
      .find(`.constructor-element__text`)
      .should("have.text", ingredients[0].name + " (низ)");

    cy.get('[data-testid="burger-sauce"]:nth-child(1)').trigger("dragstart");
    cy.get("@ingredientsArea").trigger("drop");
    cy.get(`@ingredientsArea`)
      .find(`div:nth-child(1) .constructor-element .constructor-element__text`)
      .should("have.text", ingredients[1].name);

    cy.get('[data-testid="burger-main"]:nth-child(1)').trigger("dragstart");
    cy.get("@ingredientsArea").trigger("drop");
    cy.get(`@ingredientsArea`)
      .find(`div:nth-child(2) .constructor-element .constructor-element__text`)
      .should("have.text", ingredients[2].name);

    cy.get('[data-testid="createNewOrderButton"]').click();

    cy.get("[data-testid='modal']").as("modal");
    cy.get("@modal").find("p:first").should("have.text", "040009");

    cy.get("@modal").find("header > span").click();
    cy.get("@modal").should("not.exist");
  });
});
