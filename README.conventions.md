## Folder Structure

- `src` - main source code
- `src/controllers` - handles incoming http requests, process them, and returns appropriate
  HTTP responses, acts as intermediary between the client and the service layer
- `src/services` - business logic implementations, process the data received from the controller,
  communicates with the repository layer
- `src/repositories` - data access and persistence, communicates with the database or other data sources
- `src/middlewares` - handles validation logic
- `src/schemas` - handles payload schema validation and schema type
- `src/types` - for global types
- `src/lib` - third party dependency that can be decoupled from the app
- `src/utils` - for utility functions, helpers, and common code that can be reused throughout the application
- `src/interfaces` - for global interfaces
- `src/exceptions` - for global exceptions
- `src/constants` - for constant data
- `src/swagger` - for swagger related files like docs config
- `src/tests` - for anything tests related like unit and integration tests
  - `src/tests/unit` - for unit tests
  - `src/tests/integration` - for integration tests

---

## Conventional Commit Messages

#### Types

- `feat` - Commits, that adds a new feature
- `add` - Commits, that add capability e.g. `feature`, `test`, `dependency`
- `cut` - Commits, that remove a capability e.g. `feature`, `test`, `dependency`
- `fix` - Commits, that fixes a bug
- `perf` - Commits, are special `refactor` commits, that improve performance
- `refactor` - Commits, that rewrite/restructure code without changing its behavior
- `docs` - Commits, that affect documentation only
- `style` - Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)
- `test` - Commits, that add missing tests or correcting existing tests
- `chore` - Miscellaneous commits e.g. modifying `.gitignore`
- `start` - Begin doing something; e.g. create a feature flag.
- `stop` - End doing something; e.g. remove a feature flag.
- `build` - Commits, that affect build components like build tool, ci pipeline, dependencies, project version etc.
- `ops` - Commits, that affect operational components like infrastructure, deployment, backup etc.

#### Examples

```
feat: add email notifications on new direct messages
```

```
refactor: implement fibonacci number calculation as recursion
```

```
style: remove empty line
```

```
fix: fix wrong calculation of request body checksum
```
