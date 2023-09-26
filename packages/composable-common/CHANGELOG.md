# @elasticpath/composable-common

## 0.2.0

### Minor Changes

- 85c20dc: CLI user can now execute the command `ep int algolia` to run the Algolia integration setup.

  - Checks if the active store has the Aloglia integration already
  - Creates and depolys the integration for the user for the active store
  - Prompts the user if they want to publish a catalog after the integration is configured as it's needed to start indexing
  - Waits for that new index to appear in Algolia and then applies additional confuration for facets and replicas

  This command is also used post `ep generate d2c` if the user selected the Algolia integration they are given a prompt to ask if they want to configure it now.

## 0.1.6

### Patch Changes

- c67286c: Bumped to latest version of moltin sdk

## 0.1.5

### Patch Changes

- 97c9a9d: Renamed mason packages and repository to composable and composable-cli to match the new naming convention.

## 0.1.4

### Patch Changes

- 4a3b5cb: fixed tests

  - was failing due to executing specs inside node_modules, so ignoring
  - fixed tests for epcc url resolve to match intended use case

## 0.1.3

### Patch Changes

- 0d49ff9: For non eu-west/us-east based EPCC sites the correct integration id is now being resolved from given region

## 0.1.2

### Patch Changes

- d81ac4c: Fixed multi region support

## 0.1.1

### Patch Changes

- 8c08752: Dependencies for urql/core and graphql where missing, they have now been added to mason-common

## 0.1.0

### Minor Changes

- 231a966: D2C Schematic now supports an Algolia powered Product List Page (PLP) including automatic configuration of the EPCC Integration Hub