# Atomic EHR

Atomic EHR is a framework to build FHIR systems.

It consists of few abstract components:

* registry  - manage FHIR canonicals, packages, etc.
* terminology - provides terminolgy services
* fhirpath - fhirpath plugable engine
* validation - validation plugable engine
* repository - storage for specific resource type
* api + server
* auth - pluggable auth

* audit - FHIR based audit
* telemetry - logs, metrics and traces
* subscription - pluggable subscriptions engines