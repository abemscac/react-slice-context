export type IPlugin<State extends object> = {
  /**
   * Called when context state is initialized.
   */
  onStateInit?: (state: State) => void
  /**
   * Called whenever there's a change in the context state.
   * @param state The state after changes were made.
   */
  onChange?: (state: State) => void
}
