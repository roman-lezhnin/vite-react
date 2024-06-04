export abstract class Dependency {
  static dependencyId(): symbol {
    throw new Error(
      `You have to define static dependencyId() method in the ${this.name} class.`,
    );
  }
}
