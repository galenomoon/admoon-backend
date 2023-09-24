import SuperUserUseCase from "../useCases/superUserUseCase";

describe("SuperUser Use Case", () => {

  it.only("should register", async () => {
    // Arrange
    const sut = new SuperUserUseCase();
    const expected = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
    };

    // Act
    const result = await sut.register({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });

    // Assert
    expect(result).toEqual(expected);
  });

  it.todo("should login");
  it.todo("should get current user");
});
