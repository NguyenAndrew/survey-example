Feature: Hello World!

  Scenario: Calling the Express route
    Given an Express application called app
    When I call the default route on app
    Then I should see Hello World!
    And I should see a 200 status