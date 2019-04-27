# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [1.3.0] 4/26/2019
### Added
* Added new battlecards (chewbacca and airplane mode)

### Changed
* Updated the help message to be on a card instead of a bunch of text.

### Fixed
* Removed a console log that was looking for a slug off an intent that was returning an error.

## [1.2.0] 3/11/2019
### Added
* Added the ability to set a custom prefix with the !prefix command.
* Added new battlecards.

### Changed
* More changes to the config.json file. Need a better way to separate the test environment from the production environment.

### Fixed
* The invite was using the DEMO bot key instead of the actual one.
* Wrapped message function in async to catch errors.

## [1.1.0] 2/10/2019
### Added
* Added AI functionality for greetings, responding to thanks, and basic swgoh information.
* Added missing functionality from the original bot
  - Nightsisters command added as well as ewoks card.
  - Added card for p3/p4 nightsisters
* Added ping command to list of available commands in help.
* Updated readiness command to send a link to the readiness guide.
* Added circleci configuration to help with deployments.
* Added linting and unit testing for better code cleanliness and consistency.


### Changed
* Added the clientID to the config.json file to make using the test server/live server interchangable.
* Separated code out from bot2.js to ai.js as well as separate services and data.


### Fixed
* Added a null check on the phase checks.

 ## [1.0.1] 11/15/2018
### Added
* Added a changelog to help keep up with all of the changes on the project.
* Extra items added to .gitignore file.
* Added new feature that allows users to input percentage when checking phase damage.

### Changed
* Set the project to ECMAScript 6 on IDEA IDEs.
* Code standard updates.

<!-- ### Removed -->
### Fixed
* Minor typos and refactoring.
* Updated contact information from `TheNo0b` to `Tipster22`.

<!-- ### Breaking  -->
<!-- ### Deprecated -->
