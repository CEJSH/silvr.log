## Auto mocking

Nest also allows you to define a mock factory to apply to all of your missing dependencies. This is useful for cases where you have a large number of dependencies in a class and mocking all of them will take a long time and a lot of setup. To make use of this feature, the createTestingModule() will need to be chained up with the useMocker() method, passing a factory for your dependency mocks. This factory can take in an optional token, which is an instance token, any token which is valid for a Nest provider, and returns a mock implementation. The below is an example of creating a generic mocker using **jest-mock** and a specific mock for CatsService using jest.fn().

```ts
import { ModuleMocker, MockFunctionMetadata } from "jest-mock";

const moduleMocker = new ModuleMocker(global);

describe("CatsController", () => {
  let controller: CatsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
    })
      .useMocker((token) => {
        const results = ["test1", "test2"];
        if (token === CatsService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === "function") {
          const mockMetadata = moduleMocker.getMetadata(
            token
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get(CatsController);
  });
});
```

You can also retrieve these mocks out of the testing container as you normally would custom providers, moduleRef.get(CatsService).

> HINT
> A general mock factory, like createMock from @golevelup/ts-jest can also be passed directly.

> HINT
> REQUEST and INQUIRER providers cannot be auto-mocked because they're already pre-defined in the context. However, they can be overwritten using the custom provider syntax or by utilizing the .overrideProvider method.
