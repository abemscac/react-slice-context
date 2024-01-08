export type IPlugin<State extends object> = {
  /**
   * Called when the context state is initialized.
   * @param state Read-only state after initialization.
   */
  onStateInit?: (state: State) => void
  /**
   * Called whenever there's a change in the context state.
   * @param state Read-only state after changes were made.
   */
  onChange?: (state: State) => void
}
