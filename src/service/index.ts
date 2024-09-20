import { observable, computed, action } from "mobx";
import type { Repository } from "src/data/repository";
import type { NetworkResponseErrors } from "src/data/api";

export abstract class Service {
  abstract readonly repository: Repository;
}

export class ServiceViewModel extends Service {
  readonly repository!: Repository;

  @observable accessor state: ViewModelState = "pristine";
  @observable accessor errors: string[] = [];

  @computed get isPristine(): boolean {
    return this.state === "pristine";
  }

  @computed get isPending(): boolean {
    return this.state === "pending";
  }

  @computed get isSuccess(): boolean {
    return this.state === "success";
  }

  @computed get isError(): boolean {
    return this.state === "error";
  }

  @action.bound pristine(): void {
    this.state = "pristine";
    this.errors = [];
  }

  @action.bound pending(): void {
    this.state = "pending";
    this.errors = [];
  }

  @action.bound error(): void {
    this.state = "error";
  }

  @action.bound setErrors(errors: string[]): void {
    this.errors = errors;
  }

  @action.bound onError({ errors }: NetworkResponseErrors): void {
    this.setErrors(errors);
    this.error();
  }

  @action.bound onSuccess(): void {
    this.state = "success";
    this.errors = [];
  }
}
