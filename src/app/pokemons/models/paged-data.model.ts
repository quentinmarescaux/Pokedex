export interface PagedData<T> {
	data: T[];
	offset: number;
	limit: number;
}