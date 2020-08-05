index.tsx : renders the app
App.tsx: initializes the router

assets:
    - Contains every asset used in the app

components
    - Contains every component

    - Children:

       - pages:
            - Includes all pages in the flow

       - atoms:
            - No-logic components
            - Examples: input, label
            - Constraints:
                - Cannot contain another atoms nor higher hierarchy

       - molecules:
            - Contains multiple atoms + may contain business logic
            - Example: Input + Label + Error label
            - Constraints:
                - Cannot contain other molecules nor higher hierarchy

       - organisms:
            - Dispatch actions & business logic
            - Example: Form
            - Constraints:
                - Cannot contain other organisms

       - templates:
            - Layout and digramation
            - Example: two-columns, three-columns


models:
    - All interfaces and classes used by the app

store:
    - Redux definition

service:
    - Common business logic that can be reused

api:
    - Handles communication with external api

environment:
    - Defines the configuration based on PRODUCTION or TEST
    - some variables may be overriden by process.env

utils:
    - Helper functions
