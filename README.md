Armach - ActiveRules Mach.js
============================

A powerful framework for creating the next generation of peer-to-peer, social and interactive web sites.
With ActiveRules `Zero Code API` you simply define your business objects and the rules for how they interact and the API endpoints are auto-generated.

== Data Models
* Data objects are stored in JSON
* Objects have a defined JSON Schema
* All data can be validated against its schema
* Schema validation errors are handled in a consistent manner
* No validation should happen at the DB library level. (i.e. Mongoose validation)

== Modules
* Modules should only ever return validated JSON objects to ActiveRules
* ActiveRules is responsible returning the response based on the rules defined in the schemas

== Controllers
* Controllers are modules
* Controllers define their supported routes in JSON schema
* ActiveRules loads the endpoint schemas for each controller
* The controller provides a THIN layer of logic around the endpoint schema
* The schema has rich definitions that define complex characteristics of the endpoints
* The controller should do  as little as possible before passing the request off to a module for processing
* The module returns a schema defined object, the controller determines how to handle that response.
* The controller uses standardized processes to return the result.

== Errors
* Modules create error objects, ActiveRules handles the response
* Multiple modules may add various errors
* ActiveRules will log some errors and return others




