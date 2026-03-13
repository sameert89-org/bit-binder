**Liskov Substitution Principle**

>"You should be able to *substitute* child classes in place of parent classes without affecting functionality"

Example: An ostrich is a bird, but it cannot fly, if the bird interface has a `fly()` method and ostrich implements bird just to do nothing or throws in the fly function, you have violated LSP.

A better way of modelling this problem would be using the Flyer class, A pigeon implements both Flyer and Bird but the ostrich only implements Bird.

to support LSP we just used [[ISP}]]

## Example: Model Runner

Assume you have a model runner, a model runner has access to global model registry. It can sync data from model registry to update the model context.



A new requirement came from US govt. to deploy the AI models for military use, these processors must be air gapped