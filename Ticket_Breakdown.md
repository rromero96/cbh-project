# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1: Create a new column for custom agent ids in the Facilities table

A new column named "custom_agent_id" is added to the Facilities table. The data type of the new column is set to be compatible with the custom agent ids that Facilities will be providing.

Implementation details:
Connect to the database and create a migration script to add the new column.Choose an appropriate data type for the new column based on the format of the custom agent ids.
Time/effort estimate: 1 hour


## Ticket 2: Allow Facilities to add custom agent ids to their Agents

A new field named "custom_id" is added to the Agents table.Facilities can add custom agent ids to the Agents they work with through a form or an API. The custom id is stored in the "custom_id" field in the Agents table.

Implementation details:
Add a new field to the Agents table through a migration script.
Update the UI and API to allow Facilities to input custom agent ids.
Add a validation step to ensure that custom agent ids are unique and not null.
Time/effort estimate: 4 hours


## Ticket 3: Use custom agent ids on generated reports

When generating a report, use the custom agent id instead of the internal database id for each Agent. If a custom id is not available for an Agent, use the internal database id as a fallback.

Implementation details:
Update the generateReport function to check if a custom id is available for each Agent in the Shifts list. If a custom id is available, use it. If not, use the internal database id as a fallback.
Time/effort estimate: 2 hours

## Ticket 4: Update API to allow custom agent ids to be used as a search parameter

Allow Facilities to search for Shifts by custom agent id in addition to the internal database id. The search results should include Shifts where the custom agent id matches the search query.

Implementation details:
Update the getShiftsByFacility function to accept a custom agent id as a search parameter. Modify the SQL query to include the custom agent id in the WHERE clause.

Time/effort estimate: 3 hours

## Ticket 5: Add validation to ensure custom agent ids match a predefined format


Add a validation step to ensure that custom agent ids provided by Facilities match a predefined format. Reject custom agent ids that don't match the format.

Implementation details:
Define the format that custom agent ids should follow. Add a validation step to the form or API used by Facilities to ensure that custom agent ids match the predefined format.

Time/effort estimate: 1 hour