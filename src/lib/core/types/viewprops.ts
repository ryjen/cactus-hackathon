export interface ViewProps<State, Action> {
    state: State;
    dispatch: (action: Action) => void;
}