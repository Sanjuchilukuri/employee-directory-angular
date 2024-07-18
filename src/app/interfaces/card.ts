import { employee } from './employee';
export interface Card {
  name: string;
  departmentName: string;
  employees: employee[];
}
