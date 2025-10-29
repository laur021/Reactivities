import { makeAutoObservable } from "mobx";

export class UiStore {
  isLoading = false;
  amount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  isBusy() {
    this.isLoading = true;
  }

  isIdle() {
    this.isLoading = false;
  }
}
