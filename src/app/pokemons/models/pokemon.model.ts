import { DecimalPipe } from '@angular/common';

export interface Pokemon {
	id: number;
	name: string;
	description: string;
	height: number;
	weight: number;
	types: string[];
}