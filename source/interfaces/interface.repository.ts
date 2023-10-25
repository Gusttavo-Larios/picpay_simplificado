export interface RepositoryInterface<T> {
  create(entity: Omit<T, "id">): T;
}
