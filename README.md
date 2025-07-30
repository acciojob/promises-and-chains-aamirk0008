# Promise and Chains

Create a function that returns a promise which resolves with an object after 4 seconds. Chain this promise with two more promises: one that extracts a specific value from the object and another that returns a new object with the extracted value as a property. Use the final object to show an alert.

## Acceptance Criteria

1. Create a simple form with 2 inputs -
   - `age`: id of `age` with type `number`
   - `name`: id of `name` with type `text`
2. Add a `button` with the id of `btn` and type of `button`.
3. Validation should be:
   - inputs cannot be empty.
   - If they are empty, show an alert with the text `Please enter valid details`
4. On successful form submission, resolve a promise that resolves if the age of the person is above 18 after 4 seconds and shows an alert with the text `Welcome, <name>. You can vote.` and rejects if the age is below 18 and shows an alert that says `Oh sorry <name>. You aren't old enough.`
