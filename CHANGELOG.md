# Version 0.0.2

**Released by**: Ori Roll **Release Date** 22 SEP 22

## Changes

- The lambda is more generic now and can apply to interceptors, notifications and other triggers
  - Added folders for different hook types
  - Added a mapper by hookType for the functions in the folders
  - Created data extraction functions for each
  - Created distinct perform functions for each with specific responses returned
  - Modified the error responses to work with interceptors

# Version 0.0.1

**Released by**: Ori Roll **Release Date** <!-- Jun 20 2022 -->

## Changes

- Branched out of previous lambda seed
- Added functionality :
  - configureLogger
  - authenticate - authorization function that uses JWT token
  - login - login with service user
  - apiCallPatients - call to BioT API
  - errorResponseCreator - for responses with errors